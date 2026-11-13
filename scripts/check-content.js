import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KEEP_AS_IMAGE } from './remark-inline-diagrams.js';

const markdownFiles = (root) => fs.readdirSync(root, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
  .map((entry) => path.join(entry.parentPath, entry.name))
  .filter((file) => !file.includes(`${path.sep}reference${path.sep}sharpmush-help${path.sep}`));

const routeCandidates = (docsRoot, route) => {
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return [path.join(docsRoot, `${clean}.mdx`), path.join(docsRoot, `${clean}.md`), path.join(docsRoot, clean, 'index.mdx'), path.join(docsRoot, clean, 'index.md')];
};

const relativeLinkCandidates = (directory, target) => {
  const resolved = path.resolve(directory, safeDecode(target));
  return [resolved, `${resolved}.mdx`, `${resolved}.md`, path.join(resolved, 'index.mdx'), path.join(resolved, 'index.md')];
};

export function validateContent({ root = process.cwd(), requiredRoutes = ['guides/pennmush-migration', 'guides/operator-handbook', 'guides/deployment', 'guides/visual-layouts', 'technical/architecture', 'technical/connections', 'technical/plugin-system', 'reference/package-format'] } = {}) {
  const docsRoot = path.join(root, 'src/content/docs');
  const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  const failures = [];

  for (const route of requiredRoutes) {
    if (!config.includes(`slug: '${route}'`) && !config.includes(`slug: \"${route}\"`)) failures.push(`Navigation is missing ${route}`);
    if (!routeCandidates(docsRoot, route).some(fs.existsSync)) failures.push(`Page is missing ${route}`);
  }

  for (const file of markdownFiles(docsRoot)) {
    const text = fs.readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
    for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      const [, alt, target] = match;
      if (/assets\/guide\/[^/]+\.svg$/.test(target) && !KEEP_AS_IMAGE.has(path.basename(target)) && !text.split('\n').some((line) => line.trim() === match[0])) {
        failures.push(`${path.relative(root, file)} puts ${path.basename(target)} inside other text: a diagram needs a paragraph of its own to draw in the site's colours`);
      }
      if (!alt.trim() || /^(image|screenshot|git clone)$/i.test(alt.trim())) failures.push(`${path.relative(root, file)} has non-descriptive image text: ${alt || '(empty)'}`);
      if (!/^(https?:|data:)/.test(target)) {
        const assetPath = safeDecode(target.split(/[?#]/, 1)[0]);
        const asset = target.startsWith('/') ? path.join(root, 'public', assetPath) : path.resolve(path.dirname(file), assetPath);
        if (!fs.existsSync(asset)) failures.push(`${path.relative(root, file)} has missing image: ${target}`);
      }
    }
    for (const match of text.matchAll(/(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+['\"][^)]*['\"])?\)/g)) {
      const target = match[1].split('#', 1)[0];
      if (!target || /^(https?:|mailto:|#)/.test(target)) continue;
      if (target.startsWith('/')) {
        if (!routeCandidates(docsRoot, target).some(fs.existsSync)) failures.push(`${path.relative(root, file)} has missing route: ${target}`);
      } else if (!relativeLinkCandidates(path.dirname(file), target).some(fs.existsSync)) {
        failures.push(`${path.relative(root, file)} has missing link: ${target}`);
      }
    }
    for (const match of text.matchAll(/https?:\/\/github\.com\/SharpMUSH\/SharpMUSH\/(?:blob|tree)\/[^\s)"'>]*/gi)) {
      failures.push(`${path.relative(root, file)} sends readers to GitHub for documentation: ${match[0]} (bring the content onto this site)`);
    }
    for (const match of text.matchAll(/\bhref=["']([^"']+)["']/g)) {
      const target = match[1].split('#', 1)[0];
      if (target.startsWith('/') && !routeCandidates(docsRoot, target).some(fs.existsSync)) {
        failures.push(`${path.relative(root, file)} has missing component route: ${target}`);
      }
    }
  }

  const guideAssets = path.join(root, 'src/assets/guide');
  if (fs.existsSync(guideAssets)) {
    const sources = fs.readdirSync(path.join(root, 'src'), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.(mdx?|astro|ts|js|mjs|css)$/.test(entry.name))
      .map((entry) => fs.readFileSync(path.join(entry.parentPath, entry.name), 'utf8'))
      .join('\n');
    for (const name of fs.readdirSync(guideAssets)) {
      if (/\.(png|webp|jpe?g|gif|svg)$/i.test(name) && !sources.includes(name)) failures.push(`src/assets/guide/${name} is not used by any page`);
    }
    const tokenFile = path.join(root, 'src/styles/diagrams.css');
    const tokens = new Set(fs.existsSync(tokenFile) ? [...fs.readFileSync(tokenFile, 'utf8').matchAll(/(--dg-[a-z-]+):/g)].map((m) => m[1]) : []);
    for (const name of fs.readdirSync(guideAssets)) {
      if (!name.endsWith('.svg') || KEEP_AS_IMAGE.has(name)) continue;
      const where = `src/assets/guide/${name}`;
      const svg = fs.readFileSync(path.join(guideAssets, name), 'utf8')
        .replace(/<(title|desc|text|tspan)\b[^>]*>[\s\S]*?<\/\1>/g, '');
      for (const match of svg.matchAll(/\b(fill|stroke|stop-color|flood-color|color)\s*[:=]\s*["']?([^;"'}>]+)/gi)) {
        const value = match[2].trim();
        if (!/^(none|transparent|inherit|currentcolor|context-fill|context-stroke|var\(--dg-[a-z-]+\)|url\(#[^)]+\))(\s*!important)?$/i.test(value)) {
          failures.push(`${where} draws with ${match[1]} ${value}: use a --dg-* colour (see src/assets/guide/README.md)`);
        }
      }
      for (const match of svg.matchAll(/#[0-9a-f]{3,8}\b(?![\w-])|\b(?:rgba?|hsla?)\([^)]*\)/gi)) {
        if (!/^#[0-9a-f]+$/i.test(match[0]) || !svg.includes(`id="${match[0].slice(1)}"`)) failures.push(`${where} has a colour outside the --dg-* tokens: ${match[0]}`);
      }
      for (const match of svg.matchAll(/var\((--dg-[a-z-]+)\)/g)) {
        if (!tokens.has(match[1])) failures.push(`${where} uses ${match[1]}, which src/styles/diagrams.css does not define`);
      }
      for (const style of svg.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
        if (/@|\/\*/.test(style[1])) failures.push(`${where} has an at-rule or comment in its <style>, which the page would not scope to the diagram`);
      }
    }
  }

  for (const relative of ['src/content/docs/guides/local-install.mdx', 'src/content/docs/guides/plugins.mdx', 'src/content/docs/reference/features.mdx']) {
    const file = path.join(root, relative);
    if (fs.existsSync(file) && /(?:\.NET\s*10|net10\.0)/i.test(fs.readFileSync(file, 'utf8'))) failures.push(`${relative} refers to the stale .NET 10 SDK`);
  }
  return failures;
}

function safeDecode(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const failures = validateContent();
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('Content checks passed.');
  }
}

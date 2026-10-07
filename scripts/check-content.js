import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const markdownFiles = (root) => fs.readdirSync(root, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
  .map((entry) => path.join(entry.parentPath, entry.name))
  .filter((file) => !file.includes(`${path.sep}reference${path.sep}sharpmush-help${path.sep}`));

const routeCandidates = (docsRoot, route) => {
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return [path.join(docsRoot, `${clean}.mdx`), path.join(docsRoot, `${clean}.md`), path.join(docsRoot, clean, 'index.mdx')];
};

export function validateContent({ root = process.cwd(), requiredRoutes = ['guides/pennmush-migration', 'guides/operator-handbook', 'technical/architecture'] } = {}) {
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
      if (!alt.trim() || /^(image|screenshot|git clone)$/i.test(alt.trim())) failures.push(`${path.relative(root, file)} has non-descriptive image text: ${alt || '(empty)'}`);
      if (!/^(https?:|data:|\/)/.test(target) && !fs.existsSync(path.resolve(path.dirname(file), target))) failures.push(`${path.relative(root, file)} has missing image: ${target}`);
    }
    for (const match of text.matchAll(/(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+['\"][^)]*['\"])?\)/g)) {
      const target = match[1].split('#', 1)[0];
      if (!target || /^(https?:|mailto:|#)/.test(target)) continue;
      if (target.startsWith('/')) {
        if (!routeCandidates(docsRoot, target).some(fs.existsSync)) failures.push(`${path.relative(root, file)} has missing route: ${target}`);
      } else if (!fs.existsSync(path.resolve(path.dirname(file), safeDecode(target)))) {
        failures.push(`${path.relative(root, file)} has missing link: ${target}`);
      }
    }
  }

  for (const relative of ['src/content/docs/guides/local-install.mdx', 'src/content/docs/guides/plugins.mdx']) {
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

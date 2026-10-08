import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { validateContent } from './check-content.js';

function fixture(page = 'A valid page.') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sharpmush-docs-'));
  fs.mkdirSync(path.join(root, 'src/content/docs/guides'), { recursive: true });
  fs.writeFileSync(path.join(root, 'astro.config.mjs'), "slug: 'guides/test'\n");
  fs.writeFileSync(path.join(root, 'src/content/docs/guides/test.mdx'), page);
  return root;
}

test('accepts a navigated page with valid links and images', () => {
  const root = fixture('[Other](./other.mdx)\n![Setup claim form](./setup.png)');
  fs.writeFileSync(path.join(root, 'src/content/docs/guides/other.mdx'), 'Other');
  fs.writeFileSync(path.join(root, 'src/content/docs/guides/setup.png'), 'png');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), []);
});

test('accepts extensionless relative documentation links', () => {
  const root = fixture('[Other](./other)');
  fs.writeFileSync(path.join(root, 'src/content/docs/guides/other.mdx'), 'Other');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), []);
});

test('accepts root-relative images from the public directory', () => {
  const root = fixture('![Setup claim form](/images/setup.png)');
  fs.mkdirSync(path.join(root, 'public/images'), { recursive: true });
  fs.writeFileSync(path.join(root, 'public/images/setup.png'), 'png');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), []);
});

test('catches a page omitted from site navigation', () => {
  const root = fixture();
  assert.match(validateContent({ root, requiredRoutes: ['guides/missing'] }).join('\n'), /Navigation is missing/);
});

test('catches broken internal routes and image assets', () => {
  const root = fixture('[Missing](/guides/nope)\n![Setup form](./nope.png)');
  const failures = validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n');
  assert.match(failures, /missing route/);
  assert.match(failures, /missing image/);
});

test('accepts an image address with a query string or fragment', () => {
  const root = fixture('![Setup claim form](/images/setup.png?v=1) ![Setup claim form](/images/setup.png#top)');
  fs.mkdirSync(path.join(root, 'public/images'), { recursive: true });
  fs.writeFileSync(path.join(root, 'public/images/setup.png'), 'png');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), []);
});

test('catches a missing root-relative image asset', () => {
  const root = fixture('![Setup claim form](/images/nope.png)');
  assert.match(validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n'), /missing image/);
});

test('catches a broken LinkCard component route', () => {
  const root = fixture('<LinkCard title="Missing" href="/guides/nope" />');
  assert.match(validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n'), /missing component route/);
});

test('catches generic repeated screenshot text', () => {
  const root = fixture('![Git Clone](./shot.png)');
  fs.writeFileSync(path.join(root, 'src/content/docs/guides/shot.png'), 'png');
  assert.match(validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n'), /non-descriptive image text/);
});

test('catches stale SDK claims on maintained adoption pages', () => {
  const root = fixture();
  fs.writeFileSync(path.join(root, 'src/content/docs/guides/local-install.mdx'), '.NET 10 SDK');
  assert.match(validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n'), /stale \.NET 10 SDK/);
});

test('catches stale SDK claims on the feature overview', () => {
  const root = fixture();
  fs.mkdirSync(path.join(root, 'src/content/docs/reference'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src/content/docs/reference/features.mdx'), 'Compiled net10.0 assemblies');
  assert.match(validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n'), /stale \.NET 10 SDK/);
});

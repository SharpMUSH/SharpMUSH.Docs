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

test('catches links to documentation files in the SharpMUSH repository', () => {
  const root = fixture('[Runbook](https://github.com/SharpMUSH/SharpMUSH/blob/main/deploy/README.md)\n<LinkCard href="https://github.com/SharpMUSH/SharpMUSH/tree/main/examples/packages" />');
  const failures = validateContent({ root, requiredRoutes: ['guides/test'] }).join('\n');
  assert.match(failures, /deploy\/README\.md/);
  assert.match(failures, /examples\/packages/);
});

test('accepts links to the SharpMUSH repository itself, its issues and other repositories', () => {
  const root = fixture('[Source](https://github.com/SharpMUSH/SharpMUSH) [Issue](https://github.com/SharpMUSH/SharpMUSH/issues/743) [Template](https://github.com/SharpMUSH/SharpMUSH.Template)');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), []);
});

test('catches a guide image no page uses', () => {
  const root = fixture('![Setup claim form](../../../assets/guide/used.webp)');
  fs.mkdirSync(path.join(root, 'src/assets/guide'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src/assets/guide/used.webp'), 'webp');
  fs.writeFileSync(path.join(root, 'src/assets/guide/before.webp'), 'webp');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), ['src/assets/guide/before.webp is not used by any page']);
});

function diagramFixture(svg, page = '![How a request flows](../../../assets/guide/flow.svg)') {
  const root = fixture(page);
  fs.mkdirSync(path.join(root, 'src/assets/guide'), { recursive: true });
  fs.mkdirSync(path.join(root, 'src/styles'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src/styles/diagrams.css'), ':root { --dg-text: #000; --dg-blue-fill: #00f; }');
  fs.writeFileSync(path.join(root, 'src/assets/guide/flow.svg'), svg);
  return root;
}

test('accepts a diagram coloured with the tokens', () => {
  const root = diagramFixture('<svg><title id="t">Colours #fff</title><rect style="fill:var(--dg-blue-fill);stroke:currentColor"/><text>#d</text></svg>');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), []);
});

test('catches a diagram with its own colours', () => {
  const root = diagramFixture('<svg><style>.a{background:hsl(0,0%,90%)}</style><rect fill="#abc"/></svg>');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), [
    'src/assets/guide/flow.svg draws with fill #abc: use a --dg-* colour (see src/assets/guide/README.md)',
    'src/assets/guide/flow.svg has a colour outside the --dg-* tokens: hsl(0,0%,90%)',
    'src/assets/guide/flow.svg has a colour outside the --dg-* tokens: #abc',
  ]);
});

test('catches an undefined token and an unscoped style rule', () => {
  const root = diagramFixture('<svg><style>@media (min-width: 1px) { .a { fill: var(--dg-text) } }</style><rect style="fill:var(--dg-nope)"/></svg>');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), [
    'src/assets/guide/flow.svg uses --dg-nope, which src/styles/diagrams.css does not define',
    'src/assets/guide/flow.svg has an at-rule or comment in its <style>, which the page would not scope to the diagram',
  ]);
});

test('catches a diagram that shares its paragraph', () => {
  const root = diagramFixture('<svg/>', 'See ![How a request flows](../../../assets/guide/flow.svg) here.');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), [
    'src/content/docs/guides/test.mdx puts flow.svg inside other text: a diagram needs a paragraph of its own to draw in the site\'s colours',
  ]);
});

test('checks the colours on text elements but not their words', () => {
  const root = diagramFixture('<svg><text fill="white">#fff label</text><text style="fill:var(--dg-missing)">Two</text></svg>');
  assert.deepEqual(validateContent({ root, requiredRoutes: ['guides/test'] }), [
    'src/assets/guide/flow.svg draws with fill white: use a --dg-* colour (see src/assets/guide/README.md)',
    'src/assets/guide/flow.svg uses --dg-missing, which src/styles/diagrams.css does not define',
  ]);
});

test('catches a diagram on its own line inside a longer paragraph', () => {
  const root = diagramFixture('<svg/>', 'Introduction\n![How a request flows](../../../assets/guide/flow.svg)\nExplanation');
  assert.equal(validateContent({ root, requiredRoutes: ['guides/test'] }).length, 1);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { convertInternalLinks, helpLookups, topicAnchors, useLinkData } from './convert-docs.js';

test('links a help topic in plain text', () => {
  assert.equal(convertInternalLinks('See [@lock].'), 'See [@lock](/reference/sharpmush-help/sharpcmd/#lock).');
});

test('leaves brackets inside double-backtick code spans alone', () => {
  const line = '- ``RENDERMARKUP`IMAGE`` - Image (`![alt](url)`) rendering';
  assert.equal(convertInternalLinks(line), line);
});

test('an escaped backtick opens no code span', () => {
  assert.equal(
    convertInternalLinks('socket\\`connect fires; see [@lock] and `x`.'),
    'socket\\`connect fires; see [@lock](/reference/sharpmush-help/sharpcmd/#lock) and `x`.'
  );
});

test('leaves bracketed optional arguments in emphasis alone', () => {
  const line = '(*reason*, *name[*, *error]*)';
  assert.equal(convertInternalLinks(line), line);
});

test('links a topic to its own heading when an earlier heading on the page took its slug', () => {
  const pages = { 'layout-functions': '# theme()\n\nText.\n\n## Examples\n\n# @theme\n# @theme/light\n\nMore.\n\n# @theme/list\n' };
  useLinkData({ mappings: { 'THEME()': 'layout-functions', '@THEME': 'layout-functions', '@THEME/LIST': 'layout-functions' }, anchors: topicAnchors(pages) });
  try {
    assert.equal(
      convertInternalLinks('See [@THEME], [THEME()] and [@THEME/LIST].'),
      'See [@THEME](/reference/sharpmush-help/layout-functions/#theme-1), [THEME()](/reference/sharpmush-help/layout-functions/#theme) and [@THEME/LIST](/reference/sharpmush-help/layout-functions/#themelist).'
    );
  } finally {
    useLinkData({ mappings: {}, anchors: {} });
  }
});

test('an alias links to its topic, and an unknown topic with a slash stays text', () => {
  useLinkData({ mappings: { '@THEME/LIGHT': 'layout-functions' }, anchors: topicAnchors({ 'layout-functions': '# theme()\n# @theme\n# @theme/light\n' }) });
  try {
    assert.equal(
      convertInternalLinks('[@THEME/LIGHT] and [a/b]'),
      '[@THEME/LIGHT](/reference/sharpmush-help/layout-functions/#theme) and [a/b]'
    );
  } finally {
    useLinkData({ mappings: {}, anchors: {} });
  }
});

test('a help link goes to the page and section its lookup names, whatever the file is called', () => {
  const block = (article) => `<!-- help-article\n${JSON.stringify(article, null, 2)}\n-->\n`;
  const pages = {
    wiki: block({
      lookup: 'wiki',
      aliases: ['@WIKI'],
      sections: [{ heading: 'Editing wiki pages', lookup: 'wiki editing', aliases: ['@WIKI/CREATE'] }],
      redirects: { 'wiki authoring commands': 'wiki editing' },
    }) + '# Wiki\n\nText.\n\n## Examples\n\n## Editing wiki pages\n\nMore.\n',
  };
  useLinkData({ mappings: {}, anchors: topicAnchors(pages), lookups: helpLookups(pages) });
  try {
    assert.equal(
      convertInternalLinks('See [wiki editing], [@WIKI/CREATE], [wiki authoring commands] and [@wiki].'),
      'See [wiki editing](/reference/sharpmush-help/wiki/#editing-wiki-pages), ' +
        '[@WIKI/CREATE](/reference/sharpmush-help/wiki/#editing-wiki-pages), ' +
        '[wiki authoring commands](/reference/sharpmush-help/wiki/#editing-wiki-pages) and [@wiki](/reference/sharpmush-help/wiki/#wiki).'
    );
  } finally {
    useLinkData({ mappings: {}, anchors: {}, lookups: {} });
  }
});

test('leaves the help-article block alone', () => {
  const block = '<!-- help-article\n{\n  "aliases": [\n    "@WIKI"\n  ]\n}\n-->\n# Wiki\n';
  assert.equal(convertInternalLinks(block), block);
});

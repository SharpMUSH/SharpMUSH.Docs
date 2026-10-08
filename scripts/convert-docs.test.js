import assert from 'node:assert/strict';
import test from 'node:test';
import { convertInternalLinks, topicAnchors, useLinkData } from './convert-docs.js';

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

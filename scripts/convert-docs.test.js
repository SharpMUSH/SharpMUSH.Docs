import assert from 'node:assert/strict';
import test from 'node:test';
import { convertInternalLinks } from './convert-docs.js';

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

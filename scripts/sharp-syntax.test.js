import assert from 'node:assert/strict';
import test from 'node:test';
import { createHighlighter } from 'shiki';

test('the sharp language registration highlights SharpMUSH commands and functions', async () => {
  let loadSharpLanguage;

  try {
    ({ loadSharpLanguage } = await import('../src/syntax/sharp-language.js'));
  } catch {
    // The assertion below reports the missing site integration as the behavior failure.
  }

  assert.equal(typeof loadSharpLanguage, 'function', 'SharpMUSH syntax highlighting is not registered');

  const highlighter = await createHighlighter({
    themes: ['github-dark'],
    langs: [await loadSharpLanguage()],
  });

  try {
    const { tokens } = highlighter.codeToTokens('@create Widget\nthink name(%#)', {
      lang: 'sharp',
      theme: 'github-dark',
    });

    assert.equal(tokens[0][0].content, '@create');
    assert.notEqual(tokens[0][0].color, tokens[0][1].color);
    assert.equal(tokens[1][1].content, 'name');
    assert.notEqual(tokens[1][0].color, tokens[1][1].color);
  } finally {
    highlighter.dispose();
  }
});

import fs from 'node:fs/promises';

const grammarUrl = new URL(
  '../../SharpMUSH-submodule/SharpMUSH.LanguageServer/vscode-extension-example/syntaxes/mush.tmLanguage.json',
  import.meta.url,
);

export async function loadSharpLanguage() {
  const grammar = JSON.parse(await fs.readFile(grammarUrl, 'utf8'));

  return {
    ...grammar,
    name: 'sharp',
    aliases: ['mush', 'sharpmush'],
  };
}

---
title: "PennMUSH Compatibility"
description: "SharpMUSH documentation for PennMUSH Compatibility"
---

<!-- help-article
{
  "corpus": "help",
  "id": "pennmush-compatibility",
  "lookup": "pennmush compatibility",
  "aliases": [],
  "sections": []
}
-->
## PennMUSH Compatibility

SharpMUSH targets PennMUSH 1.8.8 softcode compatibility. Where it differs, the difference is one of
three things, and this profile keeps them apart:

  **A choice.** Deliberate, and not going to change. Listed with what PennMUSH does, what SharpMUSH
  does instead, why, and how to write code that works on both.<br>
  **Unresolved.** The difference is known and the decision has not been made. Do not write code that
  depends on either behaviour.<br>
  **A defect.** Tracked by an issue. It will change.

Every entry here can be checked from inside the game; the examples are lines you can type. Where an
example needs a second player, God or a server setting, the entry names the case in the parity harness
(`tools/parity/scenarios/`) that runs it on PennMUSH and SharpMUSH side by side.

  [COMPATIBILITY CONFIG](/reference/sharpmush-help/compatibility-config/#compatibility-config)    settings that change how your code evaluates<br>
  [COMPATIBILITY PARSER](/reference/sharpmush-help/compatibility-parser/#compatibility-parser)    evaluation, dispatch and error handling<br>
  [COMPATIBILITY COMMANDS](/reference/sharpmush-help/compatibility-commands/#compatibility-commands)  command tables, configuration and handlers<br>
  [COMPATIBILITY ARGUMENTS](/reference/sharpmush-help/compatibility-arguments/#compatibility-arguments) functions that take a different number of arguments<br>
  [COMPATIBILITY IDENTITY](/reference/sharpmush-help/compatibility-identity/#compatibility-identity)  dbrefs, objids, time precision and number precision<br>
  [COMPATIBILITY OUTPUT](/reference/sharpmush-help/compatibility-output/#compatibility-output)    rendering a string for something outside the game<br>
  [COMPATIBILITY ECONOMY](/reference/sharpmush-help/compatibility-economy/#compatibility-economy)   money, pennies and costs<br>
  [COMPATIBILITY NAMES](/reference/sharpmush-help/compatibility-names/#compatibility-names)     functions and commands that exist here and not there<br>
  [COMPATIBILITY MAIL](/reference/sharpmush-help/compatibility-mail/#compatibility-mail)      @mail forwarding, filters and folders<br>
  [COMPATIBILITY UNRESOLVED](/reference/sharpmush-help/compatibility-unresolved/#compatibility-unresolved) known differences with no decision yet<br>
  [COMPATIBILITY DEFECTS](/reference/sharpmush-help/compatibility-defects/#compatibility-defects)   known differences that are bugs, with their issue<br>
  [COMPATIBILITY MATCHED](/reference/sharpmush-help/compatibility-matched/#compatibility-matched)   differences that used to exist and no longer do

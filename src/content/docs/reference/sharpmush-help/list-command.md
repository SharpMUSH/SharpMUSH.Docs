---
title: "@list"
description: "SharpMUSH documentation for @list"
---

<!-- help-article
{
  "corpus": "help",
  "id": "list-command",
  "lookup": "@list",
  "aliases": [],
  "sections": [
    {"id": "forms", "heading": "Switches, arguments and case", "lookup": "@list forms", "aliases": ["@list/lowercase"]}
  ]
}
-->
## @list

`@list/<switch>`<br>
`@list[/lowercase] <switch>`

The @list command lists useful MUSH information.

Switches include:
- motd : Alias for @listmotd, shows current messages of the day.
- functions : Lists all built-in functions and @functions.
- commands : Lists all built-in commands and @commands.
- attribs : Lists all standard attributes.
- locks : Lists the built-in lock types.
- flags : Alias for @flag/list, shows all flags.
- powers : Alias for @powers/list, shows all powers.
- allocations : Information about memory allocations. Admin-only.

### Switches, arguments and case

Each of those may be given as a switch (`@list/commands`) or as an argument (`@list commands`); the two are equivalent, and a switch wins if you give both. As an argument, "commands", "functions", "powers", "locks" and "allocations" may be abbreviated to any prefix, while "motd", "attribs" and "flags" must be spelled in full. Anything else, or nothing at all, answers "I don't understand what you want to @list."

By default, information is shown in upper-case. Add the `/lowercase` switch to show output in lowercase instead.

"commands" and "functions" show built-in and local commands/functions by default. The `/builtin` or `/local` switches can be given to limit this; `/all` asks for both, which is the default.

::: seealso
- [LIST()](/reference/sharpmush-help/list-function/#list)
- [@config](/reference/sharpmush-help/config-command/#config)
- [CONFIG()](/reference/sharpmush-help/sharpfunc/#config)
- [FUNCTIONS()](/reference/sharpmush-help/sharpfunc/#functions)
- [@stats](/reference/sharpmush-help/sharpcmd/#stats)
- [@command](/reference/sharpmush-help/command/#command)
- [@function](/reference/sharpmush-help/function-command/#function)
- [@flag](/reference/sharpmush-help/flag-command/#flag)
- [@power](/reference/sharpmush-help/power-command/#power)
- [@attribute](/reference/sharpmush-help/attribute-command/#attribute)
- [@motd](/reference/sharpmush-help/motd-command/#motd)
- [locktypes](/reference/sharpmush-help/locktypes/#lock-types)
:::

---
title: "@sockset"
description: "SharpMUSH documentation for @sockset"
---

<!-- help-article
{
  "corpus": "help",
  "id": "sockset-command",
  "lookup": "@sockset",
  "aliases": ["SOCKSET"],
  "sections": [
    {"id": "display-options", "heading": "Display options", "lookup": "@sockset display options"},
    {"id": "connection-options", "heading": "Connection options", "lookup": "@sockset connection options"}
  ]
}
-->
## @sockset

`SOCKSET [<option>=<value>]`<br>
`@sockset [<descriptor>][=<option>, <value>[, ..., <optionN>, <valueN>]]`

SOCKSET is a socket command which sets or queries socket-specific options. These options are usually set automatically, or negotiated by the MUSH and your client, but this command lets you override those settings.

With no args, SOCKSET shows the current value of the socket options. With an `<option>=<value>` pair, it attempts to set the given option.

@sockset is a similar in-game command, but can specify which descriptor to change options for, and can set multiple options at once. Only Wizards can change the options for other players' descriptors. `<descriptor>` defaults to your least-idle descriptor, when used by a player; for non-players, it has no default.

- [@sockset display options](/reference/sharpmush-help/sockset-command/#display-options): colour, links, pictures, terminal, character set and screen size
- [@sockset connection options](/reference/sharpmush-help/sockset-command/#connection-options): prefixes, prompts, Pueblo and telnet

### Display options

- colorstyle: See [COLORSTYLE](/reference/sharpmush-help/sharpcmd/#colorstyle)
- hyperlinks, commandlinks: See [HYPERLINKS](/reference/sharpmush-help/sharpcmd/#hyperlinks)
- graphics: See [GRAPHICS](/reference/sharpmush-help/graphics/#graphics)
- alttext: on, off or auto. How a picture your client does not draw is written: on writes its description, off its address. Auto writes the description for a screen reader and the address for everyone else
- animation: See [ANIMATION](/reference/sharpmush-help/sharpcmd/#animation)
- terminal: See [TERMINAL](/reference/sharpmush-help/sharpcmd/#terminal)
- charset: See [CHARSET](/reference/sharpmush-help/charset/#charset)
- screenreader: on, off or auto. Same as SCREENREADER; see [screenreader client](/reference/sharpmush-help/screenreader/#in-a-mu-client)
- width: Set your width(), same as SCREENWIDTH
- height: Set your height(), same as SCREENHEIGHT
- terminaltype: Your terminal type, used by terminfo()
- stripaccents: Send this connection plain ASCII, each other character replaced as [CHARSET](/reference/sharpmush-help/charset/#charset) describes.

### Connection options

- outputprefix: Same as OUTPUTPREFIX
- outputsuffix: Same as OUTPUTSUFFIX
- prompt_newlines: Set whether a newline is shown after prompts from @prompt, same as PROMPT_NEWLINES
- pueblo: Any value turns Pueblo mode on, and an empty value turns it off. See [pueblo](/reference/sharpmush-help/pueblo/#pueblo)
- telnet: Yes or no. When it is no, a prompt from @prompt ends with a newline instead of a telnet GA

Changing pueblo or telnet may stop your client from reading or showing output correctly; only change them if you know what you're doing.

::: seealso
- [socket commands](/reference/sharpmush-help/socket-commands/#socket-commands)
- [TERMINFO()](/reference/sharpmush-help/terminfo-function/#terminfo)
- [pueblo](/reference/sharpmush-help/pueblo/#pueblo)
- [COLORSTYLE](/reference/sharpmush-help/sharpcmd/#colorstyle)
- [HYPERLINKS](/reference/sharpmush-help/sharpcmd/#hyperlinks)
- [GRAPHICS](/reference/sharpmush-help/graphics/#graphics)
- [TERMINAL](/reference/sharpmush-help/sharpcmd/#terminal)
- [CHARSET](/reference/sharpmush-help/charset/#charset)
- [@prompt](/reference/sharpmush-help/sharpcmd/#prompt)
:::

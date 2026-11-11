---
title: "terminfo()"
description: "SharpMUSH documentation for terminfo()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "terminfo-function",
  "lookup": "terminfo()",
  "aliases": [],
  "sections": [
    {"id": "capabilities", "heading": "Capabilities", "lookup": "terminfo capabilities"},
    {"id": "display", "heading": "Display capabilities", "lookup": "terminfo display"},
    {"id": "visibility", "heading": "Who sees what", "lookup": "terminfo visibility"},
    {"id": "example", "heading": "Example", "lookup": "terminfo example"}
  ]
}
-->
## terminfo()
`terminfo(<player|descriptor>)`

Returns a list with at least one element: the type of client used by the player, or "unknown" if the client being used doesn't support being asked to identify itself using RFC 1091.

- [terminfo capabilities](/reference/sharpmush-help/terminfo-function/#capabilities): the client's protocols and connection
- [terminfo display](/reference/sharpmush-help/terminfo-function/#display-capabilities): what the client can draw, and the color style
- [terminfo visibility](/reference/sharpmush-help/terminfo-function/#who-sees-what): what you see about other players, and screen readers
- [terminfo example](/reference/sharpmush-help/terminfo-function/#example): the portal with Screen reader mode on

### Capabilities

The other elements describe what the client can do. These are about its protocols and connection; the rest are in [terminfo display](/reference/sharpmush-help/terminfo-function/#display-capabilities).

| Element | Present when |
| --- | --- |
| `pueblo` | the client is in Pueblo mode |
| `mxp` | the client is in MXP mode |
| `screenreader` | a screen reader reads this connection: MTTS says so, or the player turned on Screen reader mode in the web portal's Terminal settings, on Play |
| `telnet` | the client understands the telnet protocol |
| `gmcp` | GMCP was agreed over telnet; see [oob()](/reference/sharpmush-help/oob-function/#oob) |
| `ssl` | the client is using an SSL/TLS connection |
| `websocket` | the client is connected through a WebSocket |
| `portal` | the connection is the web portal's background session |

### Display capabilities

These elements describe what the client can draw:

| Element | Present when |
| --- | --- |
| `prompt_newlines` | see [PROMPT_NEWLINES](/reference/sharpmush-help/sharpcmd/#promptnewlines) |
| `stripaccents` | the client is sent 7-bit ASCII, with no accented characters |
| `hyperlinks` | web links are sent as clickable OSC 8 links; see [HYPERLINKS](/reference/sharpmush-help/sharpcmd/#hyperlinks) |
| `commandlinks` | command links are sent as clickable MSLP links; see [HYPERLINKS](/reference/sharpmush-help/sharpcmd/#hyperlinks) |
| one of `kitty`, `iterm2`, `sixel` or `blocks` | pictures are drawn that way; see [GRAPHICS](/reference/sharpmush-help/graphics/#graphics) |
| `animation` | moving pictures play; see [ANIMATION](/reference/sharpmush-help/sharpcmd/#animation) |

One of the color styles shown in [COLORSTYLE](/reference/sharpmush-help/sharpcmd/#colorstyle) will also be included.

### Who sees what

You must have see_all, or use terminfo() on yourself, to see all information or use a `<descriptor>`. Mortals using terminfo() on another player will always receive "unknown" for the client name, and will not get telnet/gmcp/ssl/prompt_newlines in the output list.

Anyone may see pueblo, mxp, screenreader, stripaccents and the color style. Softcode can use screenreader to leave out what only draws, such as a logo made of characters. A screen reader on telnet is sent no color, links or pictures, so its color style is plain; the web portal draws them itself, so it keeps its own.

### Example

In the web portal with Screen reader mode on:

```sharp
> think terminfo(me)
SHARPMUSH-PORTAL screenreader websocket commandlinks truecolor
```

::: seealso
- [PUEBLO()](/reference/sharpmush-help/sharppueb/#pueblo)
- [WIDTH()](/reference/sharpmush-help/sharpfunc/#width)
- [SSL()](/reference/sharpmush-help/sharpfunc/#ssl)
- [@SOCKSET](/reference/sharpmush-help/sockset-command/#sockset)
- [OOB()](/reference/sharpmush-help/oob-function/#oob)
:::

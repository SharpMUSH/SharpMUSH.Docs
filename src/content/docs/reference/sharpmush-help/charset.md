---
title: "charset"
description: "SharpMUSH documentation for charset"
---

<!-- help-article
{
  "corpus": "help",
  "id": "charset",
  "lookup": "charset",
  "aliases": [],
  "sections": [
    {"id": "stand-ins", "heading": "Stand-in characters", "lookup": "charset stand-ins"}
  ]
}
-->
## charset

`SOCKSET charset=<utf-8|latin-1|ascii|auto>`<br>
`@SOCKSET [me|<descriptor>]=charset,<utf-8|latin-1|ascii|auto>`

SharpMUSH writes to your connection in UTF-8 when your client agrees to it during telnet negotiation, says it can in the terminal type it reports, or is a terminal SharpMUSH knows (see [TERMINAL](/reference/sharpmush-help/sharpcmd/#terminal)). A client that agrees to Latin-1 is written in Latin-1, and one that says neither is sent plain ASCII.

'SOCKSET charset' names the character set yourself, for a client SharpMUSH guesses wrong. 'auto' goes back to what your client negotiated or reported. 'SOCKSET stripaccents=yes' sends ASCII whatever this is set to.

Example:
```sharp
> SOCKSET charset=ascii
Charset set to 'ascii'
```

- [charset stand-ins](/reference/sharpmush-help/charset/#stand-in-characters): what a client not sent UTF-8 gets in place of each character

### Stand-in characters

A client that is not sent UTF-8 gets each character it cannot show as the nearest one it can, so output still reads:

- a middle dot or a bullet as `*`
- a dash as `-`
- curly quotes as straight ones
- an accented letter as the plain letter, such as `e` for an e with an acute accent
- a line or corner of a box as `-`, `=`, `|` or `+` (see [LAYOUT BORDERS ASCII](/reference/sharpmush-help/layout-borders/#ascii-clients))
- any other character as `?`, twice for a wide one

Each of these takes as many columns as the character it replaces, so columns stay lined up. A Latin-1 client keeps the characters Latin-1 has, such as the middle dot and accented letters.

A game can choose its own stand-ins, which come before the ones above; see [@ASCII](/reference/sharpmush-help/ascii-command/#ascii).

::: seealso
- [@SOCKSET](/reference/sharpmush-help/sockset-command/#sockset)
- [TERMINFO()](/reference/sharpmush-help/terminfo-function/#terminfo)
- [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders)
- [STRIPACCENTS()](/reference/sharpmush-help/sharpfunc/#stripaccents)
- [@ASCII](/reference/sharpmush-help/ascii-command/#ascii)
:::

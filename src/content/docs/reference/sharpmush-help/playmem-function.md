---
title: "playmem()"
description: "SharpMUSH documentation for playmem()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "playmem-function",
  "lookup": "playmem()",
  "aliases": [
    "playmem"
  ],
  "sections": []
}
-->
## playmem()

`playmem([<player>])`

The TinyMUX form of [playermem()](/reference/sharpmush-help/sharpfunc/#playermem): *&lt;player&gt;* is optional and defaults to you. A player you cannot examine gives `#-1 PERMISSION DENIED`. SharpMUSH does not count memory per object, so the answer is 0.

This function comes from TinyMUX.

::: seealso
- [PLAYERMEM()](/reference/sharpmush-help/sharpfunc/#playermem)
- [OBJMEM()](/reference/sharpmush-help/sharpfunc/#objmem)
:::

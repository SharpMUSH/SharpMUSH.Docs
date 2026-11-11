---
title: "translate()"
description: "SharpMUSH documentation for translate()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "translate-function",
  "lookup": "translate()",
  "aliases": [
    "translate"
  ],
  "sections": []
}
-->
## translate()

`translate(<string>, <type>)`

With a *&lt;type&gt;* of `1` or `p`, returns *&lt;string&gt;* written as the softcode that gives it back, colour included, as [decompose()](/reference/sharpmush-help/sharpfunc/#decompose) does. With any other *&lt;type&gt;*, such as `0` or `s`, returns the plain text: colour is removed, each line break and tab becomes a space, and each carriage return is removed.

This function comes from TinyMUX, where type 1 writes `%c` colour codes. SharpMUSH reads `%c` codes only when it imports a database, so it writes colour with [ansi()](/reference/sharpmush-help/ansi-function/#ansi) instead.

```sharp
> think translate(ansi(r,red)%rline, 0)
red line
```

::: seealso
- [DECOMPOSE()](/reference/sharpmush-help/sharpfunc/#decompose)
- [STRIPANSI()](/reference/sharpmush-help/sharpfunc/#stripansi)
:::

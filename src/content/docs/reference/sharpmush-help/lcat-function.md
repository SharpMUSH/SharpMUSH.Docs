---
title: "lcat()"
description: "SharpMUSH documentation for lcat()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "lcat-function",
  "lookup": "lcat()",
  "aliases": [
    "lcat"
  ],
  "sections": []
}
-->
## lcat()

`lcat(<list>[, <delimiter>[, <osep>]])`

Joins the words of *&lt;list&gt;* into one string. *&lt;delimiter&gt;* separates the words, a space by default. *&lt;osep&gt;* goes between them, and is nothing unless you give one. An *&lt;osep&gt;* of `@@` is nothing too.

This function comes from TinyMUX.

```sharp
> think lcat(a b c)
abc
> think lcat(a|b|c, |, +)
a+b+c
```

::: seealso
- [CAT()](/reference/sharpmush-help/sharpfunc/#cat)
- [STRCAT()](/reference/sharpmush-help/sharpfunc/#cat)
- [GRAPHEMES()](/reference/sharpmush-help/sharpfunc/#graphemes)
:::

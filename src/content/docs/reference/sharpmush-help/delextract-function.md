---
title: "delextract()"
description: "SharpMUSH documentation for delextract()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "delextract-function",
  "lookup": "delextract()",
  "aliases": [
    "delextract"
  ],
  "sections": []
}
-->
## delextract()

`delextract(<list>, <first>, <count>[, <delimiter>])`

Returns *&lt;list&gt;* without the *&lt;count&gt;* words that start at position *&lt;first&gt;*, counting from 1. A *&lt;first&gt;* below 1 counts as 1, and a *&lt;count&gt;* below 1 gives the list back unchanged. *&lt;delimiter&gt;* separates the words, a space by default, and joins the ones left.

This function comes from TinyMUX.

```sharp
> think delextract(a b c d e, 2, 2)
a d e
```

::: seealso
- [EXTRACT()](/reference/sharpmush-help/sharpfunc/#extract)
- [LDELETE()](/reference/sharpmush-help/sharpfunc/#ldelete)
- [REMOVE()](/reference/sharpmush-help/sharpfunc/#remove)
:::

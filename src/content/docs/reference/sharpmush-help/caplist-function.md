---
title: "caplist()"
description: "SharpMUSH documentation for caplist()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "caplist-function",
  "lookup": "caplist()",
  "aliases": [
    "caplist"
  ],
  "sections": []
}
-->
## caplist()

`caplist(<list>[, <delimiter>[, <osep>]])`

Capitalizes the first letter of each word in *&lt;list&gt;*, as in a title. These short words go to lower case instead, unless they are the first or last word: a, an, the, and, or, but, for, nor, of, in, on, at, to, by, is, as, if, it, so, vs, via.

*&lt;delimiter&gt;* separates the words, a space by default. *&lt;osep&gt;* joins them, *&lt;delimiter&gt;* by default. An *&lt;osep&gt;* of `@@` joins them with nothing.

This function comes from TinyMUX.

```sharp
> think caplist(a tale OF two cities)
A Tale of Two Cities
```

::: seealso
- [CAPSTR()](/reference/sharpmush-help/sharpfunc/#capstr)
- [LCSTR()](/reference/sharpmush-help/sharpfunc/#lcstr)
- [UCSTR()](/reference/sharpmush-help/sharpfunc/#ucstr)
:::

---
title: "randpos()"
description: "SharpMUSH documentation for randpos()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "randpos-function",
  "lookup": "randpos()",
  "aliases": [
    "randpos"
  ],
  "sections": []
}
-->
## randpos()

`randpos(<match>, <string>)`

Returns the position, counting from 1, of every place `<match>` starts in `<string>`, in a random order. It finds the same positions as [totpos()](/reference/sharpmush-help/totpos-function/#totpos): matches may overlap, and case matters. It returns nothing when there is none.

randpos() comes from RhostMUSH.

```sharp
> think randpos(i,this is weird)
6 3 11
> think randpos(z,this is weird)

```

Output: the three places `i` is, in any order; then nothing.

::: seealso
- [totpos()](/reference/sharpmush-help/totpos-function/#totpos)
- [numpos()](/reference/sharpmush-help/numpos-function/#numpos)
- [shuffle()](/reference/sharpmush-help/sharpfunc/#shuffle)
:::

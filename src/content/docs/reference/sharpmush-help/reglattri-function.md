---
title: "reglattri()"
description: "SharpMUSH documentation for reglattri()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "reglattri-function",
  "lookup": "reglattri()",
  "aliases": [
    "REGNATTRI()",
    "reglattri",
    "regnattri"
  ],
  "sections": []
}
-->
## reglattri()

`reglattri(<object>, <regexp>)`<br>
`regnattri(<object>, <regexp>)`

reglattri() lists the attributes on *&lt;object&gt;* whose names match the regular expression *&lt;regexp&gt;*, ignoring case; regnattri() counts them. They take TinyMUX's two arguments where [reglattr()](/reference/sharpmush-help/lattr-function/#lattr) and [regnattr()](/reference/sharpmush-help/sharpfunc/#nattr) take one `<object>/<regexp>`. You see only the attributes you could read with [lattr()](/reference/sharpmush-help/lattr-function/#lattr).

These functions come from TinyMUX.

```sharp
> think reglattri(me, ^cmd)
CMD_GO CMD_LOOK
```

::: seealso
- [REGLATTR()](/reference/sharpmush-help/lattr-function/#lattr)
- [REGNATTR()](/reference/sharpmush-help/sharpfunc/#nattr)
- [LATTR()](/reference/sharpmush-help/lattr-function/#lattr)
- [regexp](/reference/sharpmush-help/regexp/#regular-expressions)
:::

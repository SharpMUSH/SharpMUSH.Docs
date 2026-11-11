---
title: "wrapcolumns()"
description: "SharpMUSH documentation for wrapcolumns()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "wrapcolumns-function",
  "lookup": "wrapcolumns()",
  "aliases": [
    "wrapcolumns"
  ],
  "sections": []
}
-->
## wrapcolumns()

`wrapcolumns(<text>, <width>, <columns>[, <justify>[, <lborder>[, <mborder>[, <rborder>[, <order>]]]]])`

Word-wraps *&lt;text&gt;* into lines of at most *&lt;width&gt;* characters and sets them out in *&lt;columns&gt;* columns. A line breaks at the last space that fits; a word longer than *&lt;width&gt;* is cut. A line break in *&lt;text&gt;* starts a new line.

- *&lt;justify&gt;* is `L` (the default), `R` or `C`: how each cell is padded to *&lt;width&gt;*.
- *&lt;lborder&gt;*, *&lt;mborder&gt;* and *&lt;rborder&gt;* go before the first column, between columns and after the last.
- *&lt;order&gt;* is 0 (the default) to fill each column top to bottom before the next, or 1 to fill each row left to right.

This function comes from TinyMUX.

```sharp
> think wrapcolumns(one two three four five six, 5, 2, L, <, |, >)
<one  |four >
<two  |five >
<three|six  >
```

::: seealso
- [COLUMNS()](/reference/sharpmush-help/columns-function/#columns)
- [WRAP()](/reference/sharpmush-help/wrap-function/#wrap)
- [TABLE()](/reference/sharpmush-help/sharpfunc/#table)
:::

---
title: "limath()"
description: "SharpMUSH documentation for limath()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "limath-function",
  "lookup": "limath()",
  "aliases": [
    "limath"
  ],
  "sections": []
}
-->
## limath()

`limath(<operation>, <list>[, <delimiter>])`

The integer form of [lmath()](/reference/sharpmush-help/sharpfunc/#lmath): applies *&lt;operation&gt;* to every integer in *&lt;list&gt;*. Any item that is not an integer gives `#-1 ARGUMENTS MUST BE INTEGERS`, and an empty list gives 0. The arithmetic is 64-bit and wraps around when it overflows.

*&lt;operation&gt;* is one of:

- `add` or `sum`: the sum.
- `sub`: the first value minus the rest.
- `mul`: the product.
- `div`: the first value divided by each of the rest, dropping any fraction.
- `mod`: the remainder of the first value by each of the rest, with the sign of the divisor, as [mod()](/reference/sharpmush-help/sharpfunc/#mod) gives it.
- `min` and `max`: the smallest and largest value.
- `median`: the middle value; for an even count, the average of the two middle values, rounded down.

A zero divisor gives `#-1 DIVISION BY ZERO`, and any other operation `#-1 UNKNOWN OPERATION`.

This function comes from TinyMUX.

```sharp
> think limath(div, 100 3)
33
> think limath(median, 1 3 5 7)
4
```

::: seealso
- [LMATH()](/reference/sharpmush-help/sharpfunc/#lmath)
- [DIV()](/reference/sharpmush-help/sharpfunc/#div)
- [MOD()](/reference/sharpmush-help/sharpfunc/#mod)
- [MEDIAN()](/reference/sharpmush-help/sharpfunc/#median)
:::

---
title: "subeval()"
description: "SharpMUSH documentation for subeval()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "subeval-function",
  "lookup": "subeval()",
  "aliases": [
    "subeval"
  ],
  "sections": []
}
-->
## subeval()

`subeval(<string>)`

Evaluates the `%` substitutions and `\` escapes in *&lt;string&gt;* and nothing else. Function calls, braces, and everything between brackets stay as written, `%l` gives nothing, and spaces are not compressed. Use it with [get()](/reference/sharpmush-help/sharpfunc/#get) or [v()](/reference/sharpmush-help/sharpfunc/#v) to control when the text in an attribute is evaluated.

This function comes from TinyMUX.

```sharp
> &TEXT me=%n says [add(1,2)]
> think subeval(v(TEXT))
One says [add(1,2)]
```

Output: `%n` became the name of the player who typed the command, and the function call stayed as text.

::: seealso
- [S()](/reference/sharpmush-help/sharpfunc/#s)
- [OBJEVAL()](/reference/sharpmush-help/sharpfunc/#objeval)
- [V()](/reference/sharpmush-help/sharpfunc/#v)
:::

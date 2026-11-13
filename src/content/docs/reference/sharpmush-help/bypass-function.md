---
title: "bypass()"
description: "SharpMUSH documentation for bypass()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "bypass-function",
  "lookup": "bypass()",
  "aliases": [
    "bypass"
  ],
  "sections": []
}
-->
## bypass()

`bypass([<on>])`

Does nothing and returns nothing. In RhostMUSH it lets a global function that replaces a built-in one call the built-in. Here, [fn()](/reference/sharpmush-help/fn-function/#fn) always calls the built-in.

bypass() comes from RhostMUSH.

```sharp
> think [bypass(1)]done
done
```

Output: bypass() adds nothing.

::: seealso
- [fn()](/reference/sharpmush-help/fn-function/#fn)
- [@function](/reference/sharpmush-help/function-command/#function)
:::

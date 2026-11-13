---
title: "toggle()"
description: "SharpMUSH documentation for toggle()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "toggle-function",
  "lookup": "toggle()",
  "aliases": [
    "toggle"
  ],
  "sections": []
}
-->
## toggle()

`toggle(<object>, [!]<toggle> [[!]<toggle> ...])`

toggle() sets or clears toggles on `<object>` as `@toggle` does, without its messages, and returns nothing (see [toggles](/reference/sharpmush-help/toggles/#toggles)). A name that is no toggle is reported to you.

toggle() comes from RhostMUSH.

```sharp
> @create Box
> think toggle(Box,MONITOR)[hastoggle(Box,MONITOR)]
1
```

::: seealso
- [@toggle](/reference/sharpmush-help/toggle-command/#toggle)
- [set()](/reference/sharpmush-help/sharpfunc/#set)
:::

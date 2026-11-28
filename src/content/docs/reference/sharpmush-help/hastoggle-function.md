---
title: "hastoggle()"
description: "SharpMUSH documentation for hastoggle()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "hastoggle-function",
  "lookup": "hastoggle()",
  "aliases": [
    "hastoggle"
  ],
  "sections": []
}
-->
## hastoggle()

`hastoggle(<object>, <toggle>)`

hastoggle() returns 1 if `<object>` has `<toggle>` and you may see it, and 0 otherwise, including for a name that is no toggle (see [toggles](/reference/sharpmush-help/toggles/#toggles)).

hastoggle() comes from RhostMUSH.

```sharp
> @create Box
> @toggle Box=MONITOR
> think hastoggle(Box,MONITOR) [hastoggle(Box,KEEPALIVE)]
1 0
```

<nav class="help-see-also help-see-also-names" aria-label="See also">
<span class="help-see-also-label">See Also</span>

- [ltoggles()](/reference/sharpmush-help/ltoggles-function/#ltoggles)
- [hasflag()](/reference/sharpmush-help/sharpfunc/#hasflag)

</nav>


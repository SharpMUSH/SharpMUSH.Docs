---
title: "strlenraw()"
description: "SharpMUSH documentation for strlenraw()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "strlenraw-function",
  "lookup": "strlenraw()",
  "aliases": [
    "strlenraw"
  ],
  "sections": []
}
-->
## strlenraw()

`strlenraw(<string>)`

strlenraw() returns the length of `<string>` with its colour written out as ANSI escape codes, counted in bytes of UTF-8. Text with no colour gives the same as strlen() for plain ASCII.

strlenraw() comes from RhostMUSH.

```sharp
> think strlenraw(abc)
3
> think gt(strlenraw(ansi(r,abc)),3)
1
```

<nav class="help-see-also help-see-also-names" aria-label="See also">
<span class="help-see-also-label">See Also</span>

- [strlen()](/reference/sharpmush-help/sharpfunc/#strlen)
- [ansi()](/reference/sharpmush-help/ansi-function/#ansi)

</nav>


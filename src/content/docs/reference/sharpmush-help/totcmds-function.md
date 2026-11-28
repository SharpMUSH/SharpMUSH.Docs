---
title: "totcmds()"
description: "SharpMUSH documentation for totcmds()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "totcmds-function",
  "lookup": "totcmds()",
  "aliases": [
    "totcmds"
  ],
  "sections": []
}
-->
## totcmds()

`totcmds(<player>)`

totcmds() returns how many commands `<player>` has typed: the total kept in their TOTCMDS attribute from the sessions that have ended, plus each connection's count so far. A session's count is added to TOTCMDS when it ends, by QUIT or LOGOUT.

A caller who may not see hidden players gets the count without the player's hidden connections. A name that matches no player gives `-1`.

totcmds() comes from RhostMUSH.

```sharp
> think totcmds(me)
1532
```

<nav class="help-see-also help-see-also-names" aria-label="See also">
<span class="help-see-also-label">See Also</span>

- [cmds()](/reference/sharpmush-help/sharpfunc/#cmds)

</nav>


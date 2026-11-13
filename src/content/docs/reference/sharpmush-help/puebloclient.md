---
title: "PUEBLOCLIENT"
description: "SharpMUSH documentation for PUEBLOCLIENT"
---

<!-- help-article
{
  "corpus": "help",
  "id": "puebloclient",
  "lookup": "PUEBLOCLIENT",
  "aliases": [],
  "sections": []
}
-->
## PUEBLOCLIENT

`PUEBLOCLIENT <version>`

A Pueblo client sends this line when it sees the game say it speaks Pueblo. It turns Pueblo output on for that connection, as `SOCKSET PUEBLO=<line>` does, and the client switches to HTML.

The game says it speaks Pueblo only while the `pueblo` option is on, and the client's line is usually read before it reaches the game. While the option is off, PUEBLOCLIENT does nothing.

```sharp
> PUEBLOCLIENT 2.50 md5="0123456789abcdef0123456789abcdef"
```

::: seealso
- [pueblo](/reference/sharpmush-help/pueblo/#pueblo)
- [SOCKSET](/reference/sharpmush-help/sockset-command/#sockset)
- [Socket Commands](/reference/sharpmush-help/socket-commands/#socket-commands)
:::

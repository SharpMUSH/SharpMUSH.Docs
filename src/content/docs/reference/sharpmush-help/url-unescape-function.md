---
title: "url_unescape()"
description: "SharpMUSH documentation for url_unescape()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "url-unescape-function",
  "lookup": "url_unescape()",
  "aliases": [
    "url_unescape"
  ],
  "sections": []
}
-->
## url_unescape()

`url_unescape(<string>)`

Decodes a percent-encoded *&lt;string&gt;*: each `%XX` becomes the byte it names, read as UTF-8, and each `+` becomes a space, as in a submitted web form. [urldecode()](/reference/sharpmush-help/sharpfunc/#urldecode) decodes `%XX` the same way but keeps `+` as it is.

This function comes from TinyMUX.

```sharp
> think url_unescape(hello+world%21)
hello world!
```

::: seealso
- [URLDECODE()](/reference/sharpmush-help/sharpfunc/#urldecode)
- [URLENCODE()](/reference/sharpmush-help/sharpfunc/#urlencode)
:::

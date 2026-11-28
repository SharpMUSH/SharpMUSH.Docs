---
title: "wsjson()"
description: "SharpMUSH documentation for wsjson()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "wsjson-function",
  "lookup": "wsjson()",
  "aliases": [],
  "sections": [
    {"id": "delivery", "heading": "What each reader gets", "lookup": "wsjson() delivery"},
    {"id": "example", "heading": "Example", "lookup": "wsjson() example"}
  ]
}
-->
## wsjson()

`wsjson(<json>[, <default>])`

  Embeds `<json>` in the text for a WebSocket connection, and `<default>` for every other reader. Nothing is sent by the function itself: whatever emits the value delivers it, and the value stores and re-evaluates like any other string. Use [json()](/reference/sharpmush-help/json-function/#json) to build `<json>`.

  You must be a wizard or have the Send_OOB power (Pueblo_Send is its older name).

- [wsjson() delivery]: what a WebSocket connection, a telnet client and a listener each get
- [wsjson() example]: a status line with data for the portal

### What each reader gets

  A WebSocket connection, such as the web portal, is sent the JSON as a message of its own, `{"type":"json","data":<json>}`, after the line it was written in, and does not see `<default>`. `<json>` that does not parse arrives as a JSON string.

  Every other reader sees `<default>` where the function was written: telnet clients, listening objects, puppets, `think` and string functions. With no `<default>` they see nothing there.

  A line that is left with no text for a reader is not sent to that reader at all.

### Example

```sharp
@pemit me=Health: [wsjson(json(object,hp,json(number,7)),7 of 10)]
```

  Output for a telnet client: `Health: 7 of 10`. The web portal shows `Health: ` and is sent `{"type":"json","data":{"hp":7}}`.

<nav class="help-see-also help-see-also-names" aria-label="See also">
<span class="help-see-also-label">See Also</span>

- [OOB()](/reference/sharpmush-help/oob-function/#oob)
- [WSHTML()](/reference/sharpmush-help/wshtml-function/#wshtml)
- [WEBSOCKETS](/reference/sharpmush-help/websockets/#websockets)
- [JSON FUNCTIONS](/reference/sharpmush-help/sharpfunc/#json-functions)

</nav>


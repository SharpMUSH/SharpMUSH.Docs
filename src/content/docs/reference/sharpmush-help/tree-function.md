---
title: "tree()"
description: "SharpMUSH documentation for tree()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "tree-function",
  "lookup": "tree()",
  "aliases": [],
  "sections": [
    {
      "id": "options",
      "heading": "Options",
      "lookup": "tree() options"
    },
    {
      "id": "examples",
      "heading": "Examples",
      "lookup": "tree() examples"
    },
    {
      "id": "guide-examples",
      "heading": "Guide examples",
      "lookup": "tree() guide examples"
    }
  ]
}
-->
## tree()

`tree(<options>, <item1>[, ... , <itemN>])`

Items with the items under them, joined by guide lines. The top-level items sit at the left edge; each level below is drawn after a guide. An item is any text or layout, or a [NODE()](/reference/sharpmush-help/layout-functions/#node) with items of its own. An item too long for its line wraps under itself. In the web portal it is a nested list with the guides drawn as lines.

- [tree() options]: borders, theme, width, guide style and guide pieces
- [tree() examples]: channels, and a board with rounded guides
- [tree() guide examples]: ASCII guides, and guide pieces of your own

::: seealso
- [NODE()](/reference/sharpmush-help/layout-functions/#node)
- [LTREE()](/reference/sharpmush-help/layout-functions/#ltree)
- [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

### Options

Options (the first argument, which may be empty):
- `"border":"<style>"` and the border pieces - see [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders). They set the border of every box and rule inside that names none.
- `"theme":"<theme>"` - colours for the layout and everything inside it; see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes).
- `"width":<n>` - see [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions).
- `"guide":"<style>"` - `line` (the default), `rounded`, `heavy`, `double`, `ascii` or `none`. A client without Unicode is sent every guide but `none` as `|-` and `` `- ``, as the examples show.
- `branch`, `last`, `pipe` and `blank` - replace one piece of the guide: before an item with more after it, before the last item, before the lines of a level that carries on, and before the lines of one that has ended. Each is padded to the width of `branch`.

### Examples

```sharp
> think tree({{"width":40}},node(Channels,node(Public,+chat,+ooc),node(Staff,+admin)))
Channels
|- Public
|  |- +chat
|  `- +ooc
`- Staff
   `- +admin
```

```sharp
> think tree({{"width":40,"guide":"rounded"}},node(BBS,node(1. Announcements,Welcome!,Server move),node(2. Scenes,Tonight at 8)))
BBS
|- 1. Announcements
|  |- Welcome!
|  `- Server move
`- 2. Scenes
   `- Tonight at 8
```

### Guide examples

```sharp
> think tree({{"width":30,"guide":"ascii"}},node(Mail,Inbox,Sent))
Mail
|- Inbox
`- Sent
> think tree({{"width":30,"branch":"+> ","last":"*> "}},node(Mail,Inbox,Sent))
Mail
+> Inbox
*> Sent
```

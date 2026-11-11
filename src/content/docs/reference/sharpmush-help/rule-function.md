---
title: "rule()"
description: "SharpMUSH documentation for rule()"
---

<!-- help-article
{
  "corpus": "help",
  "id": "rule-function",
  "lookup": "rule()",
  "aliases": [],
  "sections": [
    {
      "id": "options",
      "heading": "Options",
      "lookup": "rule() options"
    },
    {
      "id": "examples",
      "heading": "Examples",
      "lookup": "rule() examples"
    }
  ]
}
-->
## rule()

`rule([<title>[, <width>[, <options>]]])`

A line across the width, with *&lt;title&gt;* set into it. On a line of its own inside a [BOX()](/reference/sharpmush-help/box-function/#box), it divides the box, its ends meeting the box's sides.

- [rule() options]: borders, theme, title placement and more titles
- [rule() examples]: titled lines, and a title on each side

::: seealso
- [BOX()](/reference/sharpmush-help/box-function/#box)
- [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

### Options

Options (the last argument, which may be empty):
- `"border":"<style>"` and the border pieces - see [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders). Inside a box, a rule with none of these takes the box's border.
- `"theme":"<theme>"` - colours for the layout and everything inside it; see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes).
- `"title":"left"`, `"title":"center"` or `"title":"right"` - where the title sits. Centred by default.
- `"titles":[...]` - more titles. Each is its text, set in the middle, or an object with `"text"`, `"side"` (`"left"`, `"center"` or `"right"`) and `"priority"` (1 to 1000). Titles on one side sit in the order given. When the line is too narrow for them all, the title with the highest priority is left out first. A title without one takes its side's: 1 on the left, 2 on the right, 3 in the middle.

### Examples

```sharp
> think rule(Factions,40)
==============< Factions >==============
> think rule(Left,30,{{"title":"left"}})
=< Left >=====================
```

A name on the left and a scene on the right. On a narrow screen the scene is left out first, since a right title's priority is 2 and a left one's 1:

```sharp
> think rule(Wren,40,{{"title":"left","titles":\[{"text":"Scene 5","side":"right"}]}})
=< Wren >===================< Scene 5 >=
```

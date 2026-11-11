---
title: "Layout Functions"
description: "SharpMUSH documentation for Layout Functions"
---

<!-- help-article
{
  "corpus": "help",
  "id": "layout-functions",
  "lookup": "layout functions",
  "aliases": [],
  "sections": [
    {
      "id": "list",
      "heading": "The functions",
      "lookup": "layout function list"
    },
    {
      "id": "nesting",
      "heading": "Text and nesting",
      "lookup": "layout nesting"
    },
    {
      "id": "width",
      "heading": "Width",
      "lookup": "layout width"
    },
    {
      "id": "readers",
      "heading": "Readers",
      "lookup": "layout readers"
    },
    {
      "id": "options",
      "heading": "Options",
      "lookup": "layout options"
    },
    {
      "id": "option-values",
      "heading": "Option values",
      "lookup": "layout option values"
    },
    {
      "id": "option-errors",
      "heading": "Option errors",
      "lookup": "layout option errors"
    },
    {
      "id": "examples",
      "heading": "Examples",
      "lookup": "layout examples"
    },
    {
      "id": "side-by-side-examples",
      "heading": "Side by side examples",
      "lookup": "layout side by side examples"
    }
  ]
}
-->
## Layout Functions

Boxes, titled rules, columns, labelled fields, trees and pictures, described once. A telnet client gets box art, the same kind [ALIGN()](/reference/sharpmush-help/align/#align), [CENTER()](/reference/sharpmush-help/center-function/#center) and [REPEAT()](/reference/sharpmush-help/sharpfunc/#repeat) draw. The web portal draws the same layout as page structure: a bordered card, columns that wrap on a narrow screen, a definition list, a nested list, a real picture.

The l-prefixed forms take their items as one list instead of an argument each, for code that only knows how many there are when it runs, such as a row per player from one [ITER()](/reference/sharpmush-help/iter-function/#iter).

- [layout function list](/reference/sharpmush-help/layout/#the-functions): every layout function and what it draws
- [layout nesting](/reference/sharpmush-help/layout/#text-and-nesting): layouts as text, and layouts inside layouts
- [layout width](/reference/sharpmush-help/layout/#width): the width a layout is drawn at
- [layout readers](/reference/sharpmush-help/layout/#readers): ASCII clients and screen readers
- [layout options](/reference/sharpmush-help/layout/#options): writing a layout's options as JSON
- [layout option values](/reference/sharpmush-help/layout/#option-values): what each kind of option takes
- [layout option errors](/reference/sharpmush-help/layout/#option-errors): how every function answers bad options
- [layout examples](/reference/sharpmush-help/layout/#examples): a finger sheet and a stat sheet
- [layout side by side examples](/reference/sharpmush-help/layout/#side-by-side-examples): a who list, and a picture beside a sheet

### The functions

| Function | Draws |
|---|---|
| [BOX()](/reference/sharpmush-help/box-function/#box) | a frame with a title in its top edge |
| [RULE()](/reference/sharpmush-help/rule-function/#rule) | a line across, with a title in it |
| [FLEX()](/reference/sharpmush-help/flex-function/#flex), [LFLEX()](/reference/sharpmush-help/layout-functions/#lflex) and [ITEM()](/reference/sharpmush-help/layout-functions/#item) | things side by side |
| [FIELDS()](/reference/sharpmush-help/fields-function/#fields) and [LFIELDS()](/reference/sharpmush-help/layout-functions/#lfields) | labels and values, the values lined up |
| [TREE()](/reference/sharpmush-help/tree-function/#tree), [LTREE()](/reference/sharpmush-help/layout-functions/#ltree), [NODE()](/reference/sharpmush-help/layout-functions/#node) and [LNODE()](/reference/sharpmush-help/layout-functions/#lnode) | items under their parents |
| [FIGURE()](/reference/sharpmush-help/figure-function/#figure) | a picture, with text art for a terminal |
| [GAUGE()](/reference/sharpmush-help/gauge-function/#gauge) | a bar filled to a value |
| [BULLETS()](/reference/sharpmush-help/bullets-function/#bullets) | a bulleted or numbered list |
| [GRID()](/reference/sharpmush-help/layout-functions/#grid) | short items in as many columns as fit |
| [DATATABLE()](/reference/sharpmush-help/datatable-function/#datatable), [LDATATABLE()](/reference/sharpmush-help/layout-functions/#ldatatable) and [DATACOLUMNS()](/reference/sharpmush-help/datacolumns-function/#datacolumns) | a table that gives way on a narrow screen, given by rows or by columns |
| [SCHEMARENDER()](/reference/sharpmush-help/schema-functions/#schemarender) | a portal view or form, from the same document and data |
| [GRADIENT()](/reference/sharpmush-help/gradient-function/#gradient) | text shaded through colours |
| [BADGE()](/reference/sharpmush-help/layout-functions/#badge) | a coloured status tag |
| [TONE()](/reference/sharpmush-help/tone-function/#tone) | text in a theme colour, which each reader sees in their own theme |
| [NOTICE()](/reference/sharpmush-help/notice-function/#notice) | a message led by the badge of the system it comes from |
| [THEMES()](/reference/sharpmush-help/layout-functions/#themes), [THEME()](/reference/sharpmush-help/layout-functions/#theme) and [SWATCH()](/reference/sharpmush-help/swatch-function/#swatch) | colour themes for layouts; see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes) |

### Text and nesting

The result is text, so `strlen()`, `mid()`, `edit()` and listen patterns all work on the box art. A layout cut or edited by another function is shown as the text it now is, in the portal too.

Layouts nest. A `flex()`, `fields()` or `tree()` on a line of its own inside a `box()` body becomes columns, fields or a tree inside the box, and a `rule()` becomes a divider meeting the box's sides.

::: seealso
- [BOX()](/reference/sharpmush-help/box-function/#box)
- [RULE()](/reference/sharpmush-help/rule-function/#rule)
- [FLEX()](/reference/sharpmush-help/flex-function/#flex)
- [FIELDS()](/reference/sharpmush-help/fields-function/#fields)
- [TREE()](/reference/sharpmush-help/tree-function/#tree)
- [FIGURE()](/reference/sharpmush-help/figure-function/#figure)
- [GAUGE()](/reference/sharpmush-help/gauge-function/#gauge)
- [BULLETS()](/reference/sharpmush-help/bullets-function/#bullets)
- [GRID()](/reference/sharpmush-help/layout-functions/#grid)
- [DATATABLE()](/reference/sharpmush-help/datatable-function/#datatable)
- [DATACOLUMNS()](/reference/sharpmush-help/datacolumns-function/#datacolumns)
- [GRADIENT()](/reference/sharpmush-help/gradient-function/#gradient)
- [BADGE()](/reference/sharpmush-help/layout-functions/#badge)
- [NOTICE()](/reference/sharpmush-help/notice-function/#notice)
- [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders)
- [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes)
- [ALIGN()](/reference/sharpmush-help/align/#align)
:::

### Width

Every layout function takes a width. Leave it empty, or write `auto`, and the layout is drawn at the width of the connection that ran the command (78 if it never said). Each telnet reader is then sent it again at the width their own client reported. A number fixes the width for everyone.

### Readers

A client that cannot show Unicode is sent ASCII borders; see [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders). A client that says it is a screen reader is sent the content alone, in reading order: no borders, fields as `Label: value` lines, tree levels as indentation.

### Options

The layout functions take their options as one JSON object: `{"border":"double","pad":2}`. Write it in one of two ways:

- straight into the argument, inside a second pair of braces, because the outer pair only keeps its commas together: `box(Hello,,30,{{"border":"double","pad":2}})`
- built with [JSON()](/reference/sharpmush-help/json-function/#json): `box(Hello,,30,json(object,border,"double",pad,2))`

Written straight into an argument, a JSON list needs `\[` in place of its opening bracket, since `[` starts a function call: `{{"title":\["( "," )"]}}`. The same goes for a `[` inside a string. `]` can stay as it is.

### Option values

| Option | Takes |
|---|---|
| a number option | a JSON number |
| an on-or-off option (`"vertical"`, `"across"`, `"mirror"`) | `true` or `false` |
| `"stripe"` | `true`, `false` or a string |
| `"theme"` | a string or an object; see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes) |
| every other option | a string |

A string keeps its colour, so `"top":"[ansi(hb,=)]"` draws a blue edge; a double quote inside one is written `\\"`. A string may hold `%r` and `%t` as they are: `{{"delim":"%r"}}` is a newline.

Options apply in the order written, except a preset (`"border"`, `"guide"`), which applies first so the pieces written beside it change it whatever their order.

### Option errors

Every function answers bad options the same way:

| Error | When |
|---|---|
| `#-1 LAYOUT OPTIONS MUST BE A JSON OBJECT` | the text does not begin with `{` |
| `#-1 LAYOUT OPTIONS: <what> AT CHARACTER <n>` | the object breaks off; says what was expected there |
| `#-1 UNKNOWN LAYOUT OPTION <KEY>` | a key the function does not take |
| `#-1 DUPLICATE LAYOUT OPTION <KEY>` | a key given twice |
| `#-1 LAYOUT OPTION <KEY>: ARGUMENT OUT OF RANGE` | a number outside its range |
| `#-1 LAYOUT OPTION <KEY>: INVALID ARGUMENT` | any other value it cannot read |

### Examples

### A finger sheet

```sharp
> think box(fields({{"cols":2}},Sex,Male,Species,Human,Job,Dark Warrior,Online,1h)%r[rule(Quote)]%rHooooo?,Mannaz Byron,60)
+=====================< Mannaz Byron >=====================+
| Sex:     Male                 Job:    Dark Warrior       |
| Species: Human                Online: 1h                 |
+=========================< Quote >========================+
| Hooooo?                                                  |
+==========================================================+
```

### A stat sheet

```sharp
> think box(fields({{"leader":".","cols":2}},Strength,3,Dexterity,4,Stamina,3,Charisma,2,Manipulation,1,Appearance,3),Attributes,56)
+====================< Attributes >====================+
| Strength.: 3                Charisma....: 2          |
| Dexterity: 4                Manipulation: 1          |
| Stamina..: 3                Appearance..: 3          |
+======================================================+
```

### Side by side examples

### A who list

```sharp
> think box(flex({{"gap":1}},item(Mannaz%rRaya%rTomas,12),item(0s%r5m%r2h,5),item(Hooooo?%rWriting a scene%rAFK)),Who's Online,50)
+================< Who's Online >================+
| Mannaz       0s    Hooooo?                     |
| Raya         5m    Writing a scene             |
| Tomas        2h    AFK                         |
+================================================+
```

### A picture beside a sheet

```sharp
> think box(figure(https://example.com/mannaz.png,Mannaz,/|_/|%r=^.^=%r%b> <,left,fields(,Sex,Male,Species,Human,Job,Dark Warrior)),Mannaz Byron,44)
+=============< Mannaz Byron >=============+
| /|_/|  Sex:     Male                     |
| =^.^=  Species: Human                    |
|  > <   Job:     Dark Warrior             |
+==========================================+
```

In the portal the picture shows in place of the cat, with the fields beside it.

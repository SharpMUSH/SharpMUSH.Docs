---
title: "themes()"
description: "SharpMUSH documentation for themes()"
---

## themes()

`themes()`

The names of the themes the game offers, for the `"theme"` layout option, [@THEME](/reference/sharpmush-help/theme-command/#theme) and the `layout_theme` game option: the built-in ones staff have not disabled, then those staff added (see [@THEME/LIST](/reference/sharpmush-help/theme-command/#the-games-themes)).

The built-in ones are `sharpmush`, the portal's teal on black, which a game is drawn in unless its `layout_theme` says otherwise; the web portal's themes, under the names the portal gives them: `phosphor daylight magical-girl shojo idol slice-of-life shonen sports mechmachine isekai yokai comic-book rubber-hose eighties-cartoon cyberpunk synthwave space-opera starship-console real-robot super-robot`, and one dark and one light for each kind of colour blindness: `protan-dark protan-light deutan-dark deutan-light tritan-dark tritan-light mono-dark mono-light`; `terminal`, which uses the sixteen standard colours each client draws in its own palette; one for each genre a game can name in its MSSP settings, each with its own border, title ornaments, bullet and gauge as well as colours (see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes)): `fantasy historical horror modern mystery romance science-fiction spiritual`; and well-known colour schemes: `catppuccin-mocha catppuccin-latte dracula gruvbox-dark nord solarized-dark solarized-light tokyo-night`.

### Example
```sharp
> think first(themes())
sharpmush
```

::: seealso
- [THEME()](/reference/sharpmush-help/layout-functions/#theme)
- [SWATCH()](/reference/sharpmush-help/swatch-function/#swatch)
- [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes)
- [@THEME/LIST](/reference/sharpmush-help/theme-command/#the-games-themes)
:::

## theme()

`theme(<theme>)`

Writes *&lt;theme&gt;* out in full as JSON: its name, whether it is for a dark or light background, and each colour with the standard colour a sixteen-colour client is sent. *&lt;theme&gt;* is anything the `"theme"` option takes; see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes). A theme made from a seed colour can be made once and kept:

```sharp
think set(me,MYTHEME:[theme({{"seed":"#d08770","harmony":"split"}})])
think box(Hello,,30,json(object,theme,v(MYTHEME)))
```

`&MYTHEME me=...` would keep the `[theme(...)]` call as written instead of the theme it makes. [SET()](/reference/sharpmush-help/sharpfunc/#set) tells you the attribute was set, as `@set` does.

The result is read back as it is, so it can be edited and passed on.

### Example
```sharp
> think json_query(theme(nord),get,colors,primary,rgb)
"#81a1c1"
```

::: seealso
- [THEMES()](/reference/sharpmush-help/layout-functions/#themes)
- [SWATCH()](/reference/sharpmush-help/swatch-function/#swatch)
- [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes)
:::

## lflex()

`lflex(<options>, <items>[, <delimiter>])`

[FLEX()](/reference/sharpmush-help/flex-function/#flex) with its items given as one list, split on *&lt;delimiter&gt;* (a space when none is given), so a row can be as long as a list another function made. Each item is text, a layout or an [ITEM()](/reference/sharpmush-help/layout-functions/#item), as in flex(). It takes [flex() options]. An empty list draws nothing.

The text of a layout is its box art, so a list of layouts needs a delimiter its art never holds: `^` rather than `|` or a space.

### Example
```sharp
> think lflex({{"sep":" | ","width":40}},iter(Strength Agility Wits,item(##,10),,^),^)
Strength   | Agility    | Wits
```

::: seealso
- [FLEX()](/reference/sharpmush-help/flex-function/#flex)
- [ITEM()](/reference/sharpmush-help/layout-functions/#item)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## item()

`item(<content>[, <width>[, <min>[, <grow>]]])`

One item of a [FLEX()](/reference/sharpmush-help/flex-function/#flex). *&lt;width&gt;* is `auto`, a number of cells (`35`) or a percentage (`40%`), optionally after [ALIGN()](/reference/sharpmush-help/align/#align)'s `<`, `-` or `>` to place the text left, centred or right. *&lt;min&gt;* is the fewest cells the item can be drawn in before the items stack. *&lt;grow&gt;* is its share of any spare width, against the other items'; an item with a fixed width takes none unless it is given one.

Used on its own, item() draws its content as a single column.

### Example
```sharp
> think item(Right,>20)
               Right
```

::: seealso
- [FLEX()](/reference/sharpmush-help/flex-function/#flex)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## lfields()

`lfields(<options>, <labels>, <values>[, <delimiter>])`

[FIELDS()](/reference/sharpmush-help/fields-function/#fields) with the labels in one list and the values in another, the way [LALIGN()](/reference/sharpmush-help/align/#align) takes [ALIGN()](/reference/sharpmush-help/align/#align)'s columns as a list. The first label goes with the first value, and so on. Use it when the fields are only known when the code runs, such as a sheet built from a list of attributes.

*&lt;delimiter&gt;* splits both lists; a space by default. Labels such as `Full Name` need another one. The two lists must have as many items as each other, or it returns `#-1 NUMBER OF WORDS MUST BE EQUAL`. Two empty lists draw nothing.

*&lt;options&gt;* are [fields() options].

### Examples
```sharp
> think lfields({{"width":40}},Sex Species,Male Human)
Sex:     Male
Species: Human
> think lfields({{"width":40}},Sex|Species|Origin,Male|Human|Super Robot Wars AG,|)
Sex:     Male
Species: Human
Origin:  Super Robot Wars AG
> think lfields({{"width":40}},Sex Species,Male)
#-1 NUMBER OF WORDS MUST BE EQUAL
```

::: seealso
- [FIELDS()](/reference/sharpmush-help/fields-function/#fields)
- [LALIGN()](/reference/sharpmush-help/align/#align)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## ltree()

`ltree(<options>, <items>[, <delimiter>])`

[TREE()](/reference/sharpmush-help/tree-function/#tree) with its top-level items given as one list, split on *&lt;delimiter&gt;* (a space when none is given). Each item is text, a layout or a [NODE()](/reference/sharpmush-help/layout-functions/#node) or [LNODE()](/reference/sharpmush-help/layout-functions/#lnode), as in tree(). It takes [tree() options]. An empty list draws nothing.

A tree's guide lines hold `|` and spaces, so a list of nodes needs another delimiter, such as `^`.

### Example
```sharp
> think ltree({{"width":40}},iter(Public Staff,lnode(##,switch(##,Public,+chat +ooc,+admin)),,^),^)
Public
|- +chat
`- +ooc
Staff
`- +admin
```

::: seealso
- [TREE()](/reference/sharpmush-help/tree-function/#tree)
- [LNODE()](/reference/sharpmush-help/layout-functions/#lnode)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## node()

`node(<content>[, <child1>[, ... , <childN>]])`

One item of a [TREE()](/reference/sharpmush-help/tree-function/#tree) and the items under it. Each child is text, a layout, or another node(). Used on its own, node() draws a tree with *&lt;content&gt;* at the top.

### Example
```sharp
> think node(Mail,Inbox,Sent)
Mail
|- Inbox
`- Sent
```

::: seealso
- [TREE()](/reference/sharpmush-help/tree-function/#tree)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## lnode()

`lnode(<content>, <children>[, <delimiter>])`

[NODE()](/reference/sharpmush-help/layout-functions/#node) with its children given as one list, split on *&lt;delimiter&gt;* (a space when none is given). Each child is text, a layout or another node. Used on its own, lnode() draws a tree with *&lt;content&gt;* at the top; an empty list draws *&lt;content&gt;* alone.

### Example
```sharp
> think lnode(Mail,Inbox Sent Drafts)
Mail
|- Inbox
|- Sent
`- Drafts
```

::: seealso
- [NODE()](/reference/sharpmush-help/layout-functions/#node)
- [LTREE()](/reference/sharpmush-help/layout-functions/#ltree)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## grid()

`grid(<list>[, <delimiter>[, <options>]])`

Short items, such as names, in as many columns as fit the width. *&lt;delimiter&gt;* splits *&lt;list&gt;*; a space when none is given. Each column is as wide as its longest item. The items run down each column, the way `ls` lists files, or across each row with `across`. In the web portal the columns follow the width of the page.

Options (the last argument, which may be empty):
- `"border":"<style>"` and the border pieces - see [LAYOUT BORDERS](/reference/sharpmush-help/layout-borders/#layout-borders). They set the border of every box and rule inside that names none.
- `"theme":"<theme>"` - colours for the layout and everything inside it; see [LAYOUT THEMES](/reference/sharpmush-help/layout-themes/#layout-themes).
- `"width":<n>` - see [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions).
- `"gap":<n>` - spaces between the columns. Two by default.
- `"across":true` - fill each row before the next.

### Examples
```sharp
> think grid(Mannaz Raya Tomas Ilse Quill Ottoline Bram,,{{"width":32}})
Mannaz    Ilse      Bram
Raya      Quill
Tomas     Ottoline
> think grid(Mannaz Raya Tomas Ilse Quill Ottoline Bram,,{{"width":32,"across":true}})
Mannaz    Raya      Tomas
Ilse      Quill     Ottoline
Bram
```

::: seealso
- [BULLETS()](/reference/sharpmush-help/bullets-function/#bullets)
- [DATATABLE()](/reference/sharpmush-help/datatable-function/#datatable)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## ldatatable()

`ldatatable(<options>, <headings>, <rows>[, <delimiter>])`

[DATATABLE()](/reference/sharpmush-help/datatable-function/#datatable) with its rows given as one list, so one [ITER()](/reference/sharpmush-help/iter-function/#iter) can make a row for each record. It has two delimiters:
- *&lt;delimiter&gt;* splits *&lt;rows&gt;* into rows. A space when none is given.
- The `delim` option splits the headings and each row's cells. `|` by default; see [datatable() delimiters].

It takes [datatable() options] and gives way on a narrow screen the same way. An empty list draws the headings alone.

### Examples
```sharp
> think ldatatable({{"width":30}},Name|>Score,iter(Ann:10 Bob:7,[before(##,:)]|[after(##,:)]))
Name  Score
-----------
Ann      10
Bob       7
```

Cells that hold spaces need another delimiter between the rows:

```sharp
> think ldatatable({{"width":30}},Name|Doing,Mannaz|Hooooo?%rRaya|Writing a scene,%r)
Name    Doing
-----------------------
Mannaz  Hooooo?
Raya    Writing a scene
```

::: seealso
- [DATATABLE()](/reference/sharpmush-help/datatable-function/#datatable)
- [DATACOLUMNS()](/reference/sharpmush-help/datacolumns-function/#datacolumns)
- [ITER()](/reference/sharpmush-help/iter-function/#iter)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

## badge()

`badge(<text>[, <kind>])`

*&lt;text&gt;* in brackets, coloured for its kind: `ok` (green), `warn` (yellow), `error` (red), `info` (cyan, the default) or `muted` (grey). For a status beside a name or in a table cell. When the game sets `layout_theme`, the kinds take that theme's success, warning, error, info and muted colours instead.

### Example
```sharp
> think Mannaz [badge(Online,ok)] Raya [badge(Away,muted)]
Mannaz [Online] Raya [Away]
```

::: seealso
- [ANSI()](/reference/sharpmush-help/ansi-function/#ansi)
- [NOTICE()](/reference/sharpmush-help/notice-function/#notice)
- [LAYOUT FUNCTIONS](/reference/sharpmush-help/layout/#layout-functions)
:::

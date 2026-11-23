---
title: "Markdown"
description: "SharpMUSH documentation for Markdown"
---

<!-- help-article
{
  "corpus": "help",
  "id": "markdown",
  "lookup": "markdown",
  "aliases": ["markdown syntax"],
  "sections": [
    {"id": "text", "heading": "Text and code spans", "lookup": "markdown text"},
    {"id": "escaping", "heading": "Escaping", "lookup": "markdown escaping"},
    {"id": "links", "heading": "Links", "lookup": "markdown links"},
    {"id": "blocks", "heading": "Blocks", "lookup": "markdown blocks"},
    {"id": "softcode", "heading": "Markdown in softcode", "lookup": "markdown softcode"}
  ]
}
-->
## Markdown

Help topics, the topics packages add to +help, wiki pages and [rendermarkdown()](/reference/sharpmush-help/render-markdown/#rendermarkdown) are written in Markdown: CommonMark, with tables. The terminal and the web portal read it alike, and the Docs site shows the same help.

- [markdown text](/reference/sharpmush-help/markdown/#text-and-code-spans): bold, italic, struck text and code spans
- [markdown escaping](/reference/sharpmush-help/markdown/#escaping): backticks, bars and brackets Markdown would read
- [markdown links](/reference/sharpmush-help/markdown/#links): help topic links, web links and wiki links
- [markdown blocks](/reference/sharpmush-help/markdown/#blocks): headings, lists, tables, quotes and code blocks
- [markdown softcode](/reference/sharpmush-help/markdown/#markdown-in-softcode): Markdown inside a function's argument or an attribute

### Text and code spans

- `**bold**` and `*italic*`; `~~struck~~` strikes text through.
- A code span, text between backticks, is shown exactly as written. Nothing in it is read as Markdown, so it is the place for commands, functions and attribute names.
- A code span ends at the next backtick, so one that holds a backtick, such as the attribute path ``LOG`RADIO``, needs two backticks on each side. Put a space inside them when the text starts or ends with a backtick.

```text
Set `` LOG`RADIO `` on the logger.
```

Output: Set LOG\`RADIO on the logger, the attribute path shown as one code span.

### Escaping

A backslash before a punctuation character shows that character as itself: `\*`, `` \` ``, `\[`, `\|`. A backtick in prose, such as in the event name player\`connect, is written `` \` ``.

Inside a code span a backslash is shown as written, with one exception: in a table, a bar ends the cell even inside a code span, so a code span there writes a bar as `\|`.

```text
| Pattern | Matches |
|---------|---------|
| `a\|b`  | a or b  |
```

Output: a table whose first cell reads a|b.

### Links

- `[<topic>]` links to that help topic, as `[@feed]` does: a reader whose client follows links can select it to read the topic. In help, every bracketed name must be a topic; write `\[` or a code span for a bracket that is not a link.
- `[<text>](<address>)` links to a web page, and `<https://example.com>` shows the address as its own link.
- `[[<page>]]` links to a wiki page (see [wiki editing](/reference/sharpmush-help/wiki-editing/#wiki-editing)).

### Blocks

- `#`, `##` and `###` start headings.
- `-` starts a list item and `1.` a numbered one.
- A table is rows of cells between `|` bars, with a `|---|` row under the headings.
- `>` starts a quote, and `---` on a line of its own draws a rule.
- Three backticks on lines of their own fence a code block; `sharp` after the opening fence colours softcode. See [rendermarkdown syntax highlighting in code blocks](/reference/sharpmush-help/render-markdown/#syntax-highlighting-in-code-blocks).
- `::: seealso`, `::: center` and `:::: flex` blocks are in [rendermarkdown containers](/reference/sharpmush-help/render-markdown/#containers-and-layout).

[rendermarkdown supported markdown features](/reference/sharpmush-help/render-markdown/#supported-markdown-features) says how each block looks in the terminal.

### Markdown in softcode

Markdown in a function's argument, or in a package's HELP attribute, is evaluated before it is read. Brackets, parentheses and commas need escaping as anywhere else in an argument (see [rendermarkdown mush special character escaping](/reference/sharpmush-help/render-markdown/#mush-special-character-escaping)), and evaluation takes one backslash, so `\\|` reaches Markdown as `\|`.

```sharp
> think rendermarkdown(| Pattern | Matches |%r|---|---|%r| `a\\|b` | a or b |)
Pattern | Matches
-----------------
a|b     | a or b
```

Output: a table whose first cell is the code a|b.

::: seealso
- [rendermarkdown()](/reference/sharpmush-help/render-markdown/#rendermarkdown)
- [rendermarkdowncustom()](/reference/sharpmush-help/render-markdown-custom/#rendermarkdowncustom)
- [wiki editing](/reference/sharpmush-help/wiki-editing/#wiki-editing)
- [help](/reference/sharpmush-help/sharptop/#help)
:::

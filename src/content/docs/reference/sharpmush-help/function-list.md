---
title: "Function List"
description: "SharpMUSH documentation for Function List"
---

<!-- help-article
{
  "corpus": "help",
  "id": "function-list",
  "lookup": "Function List",
  "aliases": ["Function Types"],
  "sections": [
    {"id": "objects", "heading": "Functions for objects and communication", "lookup": "function list objects"},
    {"id": "data", "heading": "Functions for data, text and output", "lookup": "function list data"}
  ]
}
-->
## Function List
Functions are grouped by what they work on. Each topic below covers one group, with some of its functions in brackets.

`@list/functions` lists every function on the game, and `@function` only the global functions the game added with @function.

- [function list objects](/reference/sharpmush-help/function-list/#functions-for-objects-and-communication): attributes, objects, connections, channels, mail and feeds
- [function list data](/reference/sharpmush-help/function-list/#functions-for-data-text-and-output): numbers, lists, strings, time, JSON, SQL, HTML and layout

### Functions for objects and communication

- [Attribute functions](/reference/sharpmush-help/sharpfunc/#attribute-functions): attribute-related manipulations (GET, UFUN)
- [channel functions](/reference/sharpmush-help/channel-functions/#channel-functions): get information about channels (CTITLE, CWHO)
- [Communication functions](/reference/sharpmush-help/sharpfunc/#communication-functions): send messages to objects (PEMIT, OEMIT)
- [Connection functions](/reference/sharpmush-help/sharpfunc/#connection-functions): get information about a player's connection (CONN)
- [Dbref functions](/reference/sharpmush-help/sharpfunc/#dbref-functions): return dbref info related to objects (LOC, LEXITS)
- [Feed functions](/reference/sharpmush-help/feed-functions/#feed-functions): read the feeds a game's systems run (FEEDMSG, FEEDWHO)
- [Information functions](/reference/sharpmush-help/sharpfunc/#information-functions): find out something about objects (FLAGS, MONEY)
- [Mail Functions](/reference/sharpmush-help/sharpmail/#mail-functions): manipulate @mail (MAIL, FOLDERSTATS)
- [Page functions](/reference/sharpmush-help/page-functions/#page-functions): read your own page log (PAGERECALL, PAGECONVERSATIONS)
- [Wiki functions](/reference/sharpmush-help/sharpfunc/#wiki-functions): read the shared wiki (WIKI, WIKILIST)

From plugins: [discordlink()](/reference/sharpmush-help/discord-functions/#discordlink), [scene functions](/reference/sharpmush-help/scene-functions/#scene-functions), [scene type functions](/reference/sharpmush-help/scene-type-functions/#scene-type-and-detail-functions), [scene write functions](/reference/sharpmush-help/scene-write-functions/#scene-write-functions), [world functions](/reference/sharpmush-help/world-functions/#world-functions)

### Functions for data, text and output

- [Bitwise functions](/reference/sharpmush-help/sharpfunc/#bitwise-functions): manipulation of individual bits of numbers (SHL, BOR)
- [Boolean functions](/reference/sharpmush-help/sharpfunc/#boolean-functions): produce 0 or 1 (false or true) answers (OR, AND)
- [HTML FUNCTIONS](/reference/sharpmush-help/sharppueb/#html-functions): output HTML tags for Pueblo and WebSocket clients
- [JSON FUNCTIONS](/reference/sharpmush-help/sharpfunc/#json-functions): create and manipulate JSON objects (JSON, JSON_MAP)
- [Layout functions](/reference/sharpmush-help/layout/#layout-functions): boxes, tables, columns and trees the portal draws as layout (BOX, DATATABLE)
- [List functions](/reference/sharpmush-help/sharpfunc/#list-functions): manipulate lists (REVWORDS, FIRST)
- [Math functions](/reference/sharpmush-help/sharpfunc/#math-functions): number manipulation, generic or integers only (ADD, DIV)
- [MEDIA FUNCTIONS](/reference/sharpmush-help/sharppueb/#media-functions): sounds, pictures and panes, written once for every client (SOUND, IMAGE)
- [Regular expression functions](/reference/sharpmush-help/sharpfunc/#regular-expression-functions): Regular expressions (REGMATCH, REGEDIT)
- [SQL functions](/reference/sharpmush-help/sharpfunc/#sql-functions): access SQL databases (SQL, SQLESCAPE)
- [String functions](/reference/sharpmush-help/sharpfunc/#string-functions): string manipulation (ESCAPE, FLIP)
- [Time functions](/reference/sharpmush-help/sharpfunc/#time-functions): formatting and display of time (TIME, CONVSECS)
- [Utility functions](/reference/sharpmush-help/sharpfunc/#utility-functions): general utilities (ISINT, COMP)
- [Vector functions](/reference/sharpmush-help/sharpfunc/#vector-functions): arithmetic on lists of numbers as vectors (VADD, VMAG)

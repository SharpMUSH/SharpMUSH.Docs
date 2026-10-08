---
title: "MUSHcode"
description: "SharpMUSH documentation for MUSHcode"
---

<!-- help-article
{
  "corpus": "help",
  "id": "mushcode",
  "lookup": "mushcode",
  "aliases": [
    "SOFTCODE"
  ](/reference/sharpmush-help/sharpconf/#softcode),
  "sections": [
    {
      "id": "learning-resources",
      "heading": "Learning resources",
      "lookup": "mushcode learning resources"
    }
  ](/reference/sharpmush-help/sharpconf/#id-learning-resources-heading-learning-resources-lookup-mushcode-learning-resources),
  "redirects": {
    "MUSHCODE2": "mushcode learning resources"
  }
}
-->
## MUSHcode

MUSHcode is the programming language available within the MUSH itself with which you can create user-defined commands and macros. It is sometimes called "softcode" to distinguish it from "hardcode", which is the language that the source code for the MUSH server is written in. SharpMUSH's server is written in C#; PennMUSH's server is written in C.

At its most basic, writing MUSHcode is just stringing together a series of commands that you would otherwise just type in one at a time. You can store MUSHcode in attributes on any type of object you own or control (including yourself!). The series of commands can be triggered by using a user-defined command or by using `@trigger`.

### Learning resources

If you would like to learn more about MUSHcoding and how to create `$-commands` for yourself, the following help files may be useful. You may also find it useful to download a copy of Amberyl's MUSH manual and follow the examples described there. However, the manual is quite old now, and some parts may no longer be relevant or entirely accurate. 
  
### Related help topics
- [attributes](/reference/sharpmush-help/attributes/#attributes)
- [%]
- [NON-STANDARD ATTRIBUTES](/reference/sharpmush-help/sharptop/#non-standard-attributes)
- [%#]
- [%!]
- [$-commands]
- [database](/reference/sharpmush-help/database/#database)
- [evaluation order](/reference/sharpmush-help/evaluation-order/#evaluation-order)
- [TYPES OF OBJECTS](/reference/sharpmush-help/sharptop/#types-of-objects)
- [WILDCARDS](/reference/sharpmush-help/sharptop/#wildcards)
- [STRINGS](/reference/sharpmush-help/sharptop/#strings)
- [LISTS](/reference/sharpmush-help/sharptop/#lists)
- [action lists](/reference/sharpmush-help/action-lists/#action-lists)

---
title: "@config parameters"
description: "SharpMUSH documentation for @config parameters"
---

<!-- help-article
{
  "corpus": "help",
  "id": "config-parameters-command",
  "lookup": "@config parameters",
  "aliases": [],
  "sections": [
    {"id": "values", "heading": "Option values", "lookup": "@config parameters values"}
  ]
}
-->
## @config parameters

Many of the mush's run-time options can be set from the game by wizards, using `@config/set <option>=<new value>`. Those that can be set with visible changes are listed below, grouped by category. See `help @config <category>` for details on each.

Categories: [@config alias](/reference/sharpmush-help/config-alias-command/#config-alias), [@config attribs](/reference/sharpmush-help/sharpconf/#config-attribs), [@config chat](/reference/sharpmush-help/sharpconf/#config-chat), [@config cmds](/reference/sharpmush-help/sharpconf/#config-cmds), [@config cosmetic](/reference/sharpmush-help/config-cosmetic-command/#config-cosmetic), [@config costs](/reference/sharpmush-help/sharpconf/#config-costs), [@config db](/reference/sharpmush-help/sharpconf/#config-db), [@config debug](/reference/sharpmush-help/config-debug-command/#config-debug), [@config dump](/reference/sharpmush-help/sharpconf/#config-dump), [@config file](/reference/sharpmush-help/config-file-command/#config-file), [@config flags](/reference/sharpmush-help/sharpconf/#config-flags), [@config funcs](/reference/sharpmush-help/sharpconf/#config-funcs), [@config limits](/reference/sharpmush-help/config-limits-command/#config-limits), [@config log](/reference/sharpmush-help/sharpconf/#config-log), [@config net](/reference/sharpmush-help/config-net-command/#config-net), [@config onboarding](/reference/sharpmush-help/config-onboarding-command/#config-onboarding), [@config textfile](/reference/sharpmush-help/config-textfile-command/#config-textfile), [@config tiny](/reference/sharpmush-help/config-tiny-command/#config-tiny), [@config wiki](/reference/sharpmush-help/config-wiki-command/#config-wiki).

The categories and groups are the same as those `@config` lists.

- [@config parameters values](/reference/sharpmush-help/config-parameters-command/#option-values): the value types options take, and list-valued options

### Option values

Values must be of the listed type for each option. They include: *&lt;number&gt;*, *&lt;dbref&gt;*, *&lt;boolean&gt;* (Yes/No), *&lt;time&gt;*, or *&lt;string&gt;*.

Options which take a *&lt;time&gt;* accept a plain number of seconds, such as `5400`; forms like `1h30m` are refused.

*&lt;dbref&gt;* options can be given with or without the leading '#', so '1' and '#1' are the same.

A few options map names to lists of words, such as `command_aliases`, `command_restrictions`, `sitelock_rules` and `mssp`. `@config <category>` and `@config <option>` show one entry per line, the name followed by its words.

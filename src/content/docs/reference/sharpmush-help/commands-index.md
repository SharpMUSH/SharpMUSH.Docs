---
title: "Commands Overview"
description: "SharpMUSH documentation for Commands Overview"
---

<!-- help-article
{
  "corpus": "help",
  "id": "commands-index",
  "lookup": "Commands",
  "aliases": [],
  "sections": [
    {"id": "at-commands", "heading": "@-commands", "lookup": "commands with @"},
    {"id": "login", "heading": "At the login screen and on a connection", "lookup": "commands at login"},
    {"id": "game", "heading": "Commands the game runs", "lookup": "commands the game runs"}
  ]
}
-->
## Commands

Help is available for the following MUSH commands:

|             |             |             |             |             |
|-------------|-------------|-------------|-------------|-------------|
| [ahelp](/reference/sharpmush-help/sharpcmd/#ahelp)     | [anews](/reference/sharpmush-help/sharpcmd/#ahelp)     | [brief](/reference/sharpmush-help/sharpcmd/#brief)     | [buy](/reference/sharpmush-help/sharpcmd/#buy-1)       | [desert](/reference/sharpmush-help/sharpcmd/#desert)    |
| [dismiss](/reference/sharpmush-help/sharpcmd/#dismiss)   | [DOING](/reference/sharpmush-help/who/#who)     | [drop](/reference/sharpmush-help/sharpcmd/#drop)      | [empty](/reference/sharpmush-help/sharpcmd/#empty)     | [enter](/reference/sharpmush-help/sharpcmd/#enter)     |
| [events](/reference/sharpmush-help/events/#events)    | [examine](/reference/sharpmush-help/sharpcmd/#examine)   | [follow](/reference/sharpmush-help/sharpcmd/#follow-1)    | [get](/reference/sharpmush-help/sharpcmd/#get)       | [give](/reference/sharpmush-help/sharpcmd/#give-1)      |
| [go]        | [help](/reference/sharpmush-help/sharptop/#help)      | [home](/reference/sharpmush-help/sharptop/#homes)      | [inventory](/reference/sharpmush-help/sharpcmd/#inventory) | [leave](/reference/sharpmush-help/sharpcmd/#leave-1)     |
| [LOGOUT](/reference/sharpmush-help/sharpcmd/#logout)    | [look](/reference/sharpmush-help/look/#look)      | [lpage](/reference/sharpmush-help/lpage-command/#lpage)     | [move](/reference/sharpmush-help/sharpcmd/#go)      | [mrpage](/reference/sharpmush-help/mrpage-command/#mrpage)    |
| [news](/reference/sharpmush-help/sharpcmd/#news)      | [page](/reference/sharpmush-help/page/#page)      | [pose](/reference/sharpmush-help/pose/)      | [QUIT](/reference/sharpmush-help/sharpcmd/#quit)      | [read](/reference/sharpmush-help/look/#look)      |
| [say](/reference/sharpmush-help/sharpcmd/#-4)       | [score](/reference/sharpmush-help/sharpcmd/#score)     | [teach](/reference/sharpmush-help/sharpcmd/#teach)     | [think](/reference/sharpmush-help/sharpcmd/#think)     | [unfollow](/reference/sharpmush-help/sharpcmd/#unfollow-1)  |
| [use](/reference/sharpmush-help/sharpcmd/#use)       | [walk](/reference/sharpmush-help/sharpcmd/#walk)      | [whisper](/reference/sharpmush-help/sharpcmd/#whisper)   | [WHO](/reference/sharpmush-help/who/#who)       | [with](/reference/sharpmush-help/sharpcmd/#with)      |
| ["]         | [:]         | [;]         | [+]         | [&]         |
| [~]         | [}]         |             |             |             |

The `]` prefix runs a command without evaluating its arguments; see [literal command](/reference/sharpmush-help/literal-command/).

- [commands with @](/reference/sharpmush-help/commands-index/#commands-1): the @-commands, which have permanent effects
- [commands at login](/reference/sharpmush-help/commands-index/#at-the-login-screen-and-on-a-connection): login-screen, account, connection and MUX channel commands
- [commands the game runs](/reference/sharpmush-help/commands-index/#commands-the-game-runs): HUH_COMMAND, WARN_ON_MISSING and unimplemented commands

From plugins: [ooc](/reference/sharpmush-help/ooc-command/#ooc)

### @-commands

In addition to these, there are several types of '@' commands. @-commands are usually commands which have permanent effects on the MUSH (such as creating a new object). Here are the help topics on @-commands:

- [@-ATTRIBUTES](/reference/sharpmush-help/sharpcmd/#attributes)
- [@-BUILDING](/reference/sharpmush-help/sharpcmd/#building)
- [@-GENERAL](/reference/sharpmush-help/sharpcmd/#general)
- [@-WIZARD](/reference/sharpmush-help/sharpcmd/#wizard)

From plugins: [@world](/reference/sharpmush-help/world-command/#world)

### At the login screen and on a connection

At the login screen, [connect](/reference/sharpmush-help/sharpcmd/#connect) reaches a character. On a game with web-portal accounts, [register](/reference/sharpmush-help/sharpcmd/#register) and [login](/reference/sharpmush-help/sharpcmd/#login) reach your account, [create](/reference/sharpmush-help/sharpcmd/#create-1) and [play](/reference/sharpmush-help/sharpcmd/#play) create and connect its characters, and [claim](/reference/sharpmush-help/sharpcmd/#claim) adds a character you already have. See [accounts](/reference/sharpmush-help/accounts/#accounts).

Commands that act on your connection rather than your character are listed in [socket commands](/reference/sharpmush-help/socket-commands/#socket-commands). Players used to MUX can also use its channel commands; see [MUX Comsys](/reference/sharpmush-help/sharpchat/#mux-comsys).

### Commands the game runs

The game runs two commands itself, and either can be @hooked: [HUH_COMMAND](/reference/sharpmush-help/sharpcmd/#huhcommand) for a line no command matches, and [WARN_ON_MISSING](/reference/sharpmush-help/sharpcmd/#warnonmissing) for a line that starts with a function. [UNIMPLEMENTED_COMMAND](/reference/sharpmush-help/sharpcmd/#unimplementedcommand) says a command has not been implemented.

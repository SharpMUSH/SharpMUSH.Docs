---
title: "Event List"
description: "SharpMUSH documentation for Event List"
---

<!-- help-article
{
  "corpus": "help",
  "id": "event-list",
  "lookup": "Event List",
  "aliases": [],
  "sections": [
    {"id": "server", "heading": "Server events", "lookup": "event list server"},
    {"id": "players", "heading": "Player and communication events", "lookup": "event list players"},
    {"id": "arguments", "heading": "Arguments", "lookup": "event list arguments"},
    {"id": "sharpmush-only", "heading": "SharpMUSH-only events", "lookup": "event list sharpmush only"}
  ]
}
-->
## Event List

Event names are of the format *&lt;type&gt;\`&lt;event&gt;*. The 'type' is used simply to group similar events together for help.

An event marked **Stoppable** runs its attributes in turn and lets one stop the rest with [stopevent()](/reference/sharpmush-help/stopevent-function/#stopevent) (see [events](/reference/sharpmush-help/events/#events)).

Event syntax in the help is of the form:<br>
*&lt;eventgroup&gt;\`&lt;eventname&gt;* (*&lt;first&gt;*, *&lt;second&gt;*, ...)

These are the events a SharpMUSH game raises. To see the help for a type, type `help event <type>`.

- [event list server](/reference/sharpmush-help/event-list/#server-events): events of the server and its database
- [event list players](/reference/sharpmush-help/event-list/#player-and-communication-events): events of players, connections and talk
- [event list arguments](/reference/sharpmush-help/event-list/#arguments): how a handler reads the arguments
- [event list sharpmush only](/reference/sharpmush-help/event-list/#sharpmush-only-events): the events PennMUSH does not have

### Server events

- [event dump](/reference/sharpmush-help/sharpevents/#dump-events) - dump\`5min, dump\`1min, dump\`complete, dump\`error
- [event db](/reference/sharpmush-help/sharpevents/#database-events) - db\`dbck, db\`purge, db\`wcheck
- [event log](/reference/sharpmush-help/sharpevents/#log-events) - log\`err, log\`cmd, log\`wiz, log\`conn, log\`trace, log\`check, log\`huh
- [event object](/reference/sharpmush-help/sharpevents/#object-events) - object\`create, object\`destroy, object\`move, object\`rename, object\`flag
- [event sql](/reference/sharpmush-help/sharpevents/#sql-events) - sql\`connect, sql\`connectfail, sql\`disconnect
- [event signal](/reference/sharpmush-help/sharpevents/#signal-events) - signal\`usr1, signal\`usr2
- [event backup](/reference/sharpmush-help/sharpevents/#backup-events) - backup\`complete, backup\`error

### Player and communication events

- [event player](/reference/sharpmush-help/player-events/#player-events) - player\`create, player\`connect, player\`disconnect, player\`inactivity, player\`channels, player\`warn, player\`link, player\`unlink
- [event socket](/reference/sharpmush-help/socket-events/#socket-events) - socket\`connect, socket\`disconnect, socket\`loginfail, socket\`createfail, socket\`gmcp, socket\`timezone
- [event http] - http\`blocked, http\`fail, http\`command
- [event room](/reference/sharpmush-help/sharpevents/#room-events) - room\`contents
- [event channel](/reference/sharpmush-help/sharpevents/#channel-events) - channel\`message, channel\`who
- [event page](/reference/sharpmush-help/sharpevents/#page-events) - page\`message
- [event mail](/reference/sharpmush-help/sharpevents/#mail-events) - mail\`received
- [event scene](/reference/sharpmush-help/sharpevents/#scene-events) - scene\`status
- [event gallery](/reference/sharpmush-help/sharpevents/#gallery-events) - gallery\`add, gallery\`report

### Arguments

The handler gets each argument by position, the first as %0, and by the name shown, as `%<name>` (see [named arguments](/reference/sharpmush-help/named-arguments/#named-arguments)). `&OBJECT\`MOVE #9=...` can read the destination as %1 or as `%&lt;destination&gt;`. A name of the form *received/sent/commands* names the parts of a value made of numbers joined by `/`: `%&lt;received&gt;`, `%&lt;sent&gt;` and `%&lt;commands&gt;` are each one number, and the position holds the whole value, as in PennMUSH.

### SharpMUSH-only events

The room, channel, page, mail, scene, backup and gallery events, player\`channels, player\`warn, player\`link, player\`unlink, socket\`gmcp and socket\`timezone are SharpMUSH's own; PennMUSH has no equivalent. The room, channel and page events exist so a handler can send a web client structured updates (the bundled room-contents and comm-feed packages), and each names exactly who the update concerns, so a handler never has to work out again who could see what. player\`warn is how a warning from the web portal reaches the game, socket\`gmcp hands softcode what a client sends over GMCP, socket\`timezone the time zone a client reports, the gallery events tell the game about the web portal's profile pictures, and scene\`status lets a package act when a scene starts or ends.

An argument of a SharpMUSH event that holds text a player wrote, such as a channel line or a page, keeps its colour: `%<message>` in a page\`message handler is the page as the recipients saw it. Use stripansi() for the plain text. PennMUSH's events pass plain text, as PennMUSH does.

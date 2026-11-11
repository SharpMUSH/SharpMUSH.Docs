---
title: "Player Events"
description: "SharpMUSH documentation for Player Events"
---

<!-- help-article
{
  "corpus": "help",
  "id": "player-events",
  "lookup": "Player Events",
  "aliases": ["Event Player"],
  "sections": [
    {"id": "channels-accounts", "heading": "Channels, warnings and accounts", "lookup": "player events channels and accounts"}
  ]
}
-->
## Player Events

- **player\`create** (*objid*, *name*, *how*, *descriptor*, *email*)
- Triggered when a player is created. *&lt;how&gt;* is one of "pcreate" or "create". If the player was `@pcreated`, %# is whoever did the `@pcreate`. If the player was made with `create` at the connect screen, %# is #1, *&lt;how&gt;* is "create" and *&lt;descriptor&gt;* is the connection that made it. *&lt;email&gt;* is empty: an account's email belongs to the account, not to the character.

- **player\`connect** (*objid*, *connections*, *descriptor*)
- Similar to `@aconnect`, but for events, and so you can use descriptor.

- **player\`disconnect** (*objid*, *connections*, *hidden*, *cause*, *ip*, *descriptor*, *connected*, *idle*, *received/sent/commands*)
- Similar to `@adisconnect`, but for event system, and with more information available.

- **player\`inactivity**
- Triggered when idle players are disconnected. Only run if at least one player gets idlebooted (Or auto-hidden), not at every inactivity check. The check runs every minute: a player idle longer than idle_timeout is disconnected, unless they may idle (the Idle power, wizards and royalty); one who may idle and is UNFINDABLE is hidden instead, if they may hide. A web portal tab is never idlebooted. With idle_timeout 0, the default, nobody is.

### Channels, warnings and accounts

- **player\`channels** (*objid*, *cause*, *channel*)
- Triggered for a connected player when their channel list may have changed. *&lt;cause&gt;* is one of connect, resume, join, leave, status (a change to their own channel flags, such as a gag or a title), rename or delete; *&lt;channel&gt;* is the channel concerned (its new name after a rename), and empty on connect and resume. resume is a web connection that came back to its session, still logged in (a page reload, or a dropped connection), and is sent the list again. Not triggered for a player who is not connected: they are sent their whole list when they connect.

- **player\`warn** (*objid*, *reason*, *account*)
- Stoppable. Triggered when staff warn a character from the web portal's moderation page. %# is the staff member's character, *&lt;objid&gt;* the warned character, *&lt;reason&gt;* what staff wrote, and *&lt;account&gt;* the staff member's account name. SharpMUSH keeps no warning itself beyond the audit log entry: the handler decides what a warning does, such as sending mail, opening a job or keeping a count. Nothing happens when the handler has no PLAYER\`WARN attribute.

- **player\`link** (*objid*, *account*)
- Triggered when a character is linked to an account, however it happened: @account/link, @account/claim or claim at the connect screen, the web portal, or a package. *&lt;account&gt;* is the account's id, as account() returns it. A character moved from one account to another triggers player\`unlink for the old account, then player\`link for the new one. %# is #1.

- **player\`unlink** (*objid*, *account*)
- Triggered when a character is taken off an account, by @account/unlink, the web portal, or a move to another account. *&lt;account&gt;* is the id of the account it left. The character itself is kept. %# is #1.

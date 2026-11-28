---
title: "SharpMUSH Features"
description: "SharpMUSH documentation for SharpMUSH Features"
---

<!-- help-article
{
  "corpus": "help",
  "id": "sharpmush-features",
  "lookup": "sharpmush features",
  "aliases": ["features"],
  "sections": [
    {
      "id": "features-portal",
      "heading": "The web portal and accounts",
      "lookup": "sharpmush features portal",
      "aliases": ["sharpmush features accounts"]
    },
    {
      "id": "features-roles",
      "heading": "Roles and permissions",
      "lookup": "sharpmush features roles"
    },
    {
      "id": "features-community",
      "heading": "Wiki, feeds, pages and dice",
      "lookup": "sharpmush features community",
      "aliases": ["sharpmush features wiki"]
    },
    {
      "id": "features-plugins",
      "heading": "Plugins, Discord and scenes",
      "lookup": "sharpmush features plugins"
    },
    {
      "id": "features-packages",
      "heading": "Softcode packages",
      "lookup": "sharpmush features packages"
    },
    {
      "id": "features-softcode",
      "heading": "Softcode",
      "lookup": "sharpmush features softcode"
    },
    {
      "id": "features-functions",
      "heading": "Functions",
      "lookup": "sharpmush features functions"
    },
    {
      "id": "features-commands",
      "heading": "Commands and switches",
      "lookup": "sharpmush features commands"
    },
    {
      "id": "features-clients",
      "heading": "Clients, pictures and sound",
      "lookup": "sharpmush features clients"
    },
    {
      "id": "features-dialects",
      "heading": "TinyMUX, RhostMUSH and imports",
      "lookup": "sharpmush features dialects"
    },
    {
      "id": "features-administration",
      "heading": "Running the game",
      "lookup": "sharpmush features administration"
    }
  ]
}
-->
## SharpMUSH Features

SharpMUSH runs PennMUSH softcode and has everything below, which PennMUSH does not. Each line names the help topic that explains it. For where SharpMUSH and PennMUSH behave differently, see [pennmush compatibility](/reference/sharpmush-help/pennmush-compatibility/#pennmush-compatibility).

- [sharpmush features portal](/reference/sharpmush-help/sharpmush-features/#the-web-portal-and-accounts): the web portal and player accounts
- [sharpmush features roles](/reference/sharpmush-help/sharpmush-features/#roles-and-permissions): roles and permissions
- [sharpmush features community](/reference/sharpmush-help/sharpmush-features/#wiki-feeds-pages-and-dice): the wiki, feeds, the page log and dice
- [sharpmush features plugins](/reference/sharpmush-help/sharpmush-features/#plugins-discord-and-scenes): plugins, the Discord bridge and scenes
- [sharpmush features packages](/reference/sharpmush-help/sharpmush-features/#softcode-packages): installable softcode packages
- [sharpmush features softcode](/reference/sharpmush-help/sharpmush-features/#softcode): what the language adds
- [sharpmush features functions](/reference/sharpmush-help/sharpmush-features/#functions): function families PennMUSH lacks
- [sharpmush features commands](/reference/sharpmush-help/sharpmush-features/#commands-and-switches): new commands and new switches
- [sharpmush features clients](/reference/sharpmush-help/sharpmush-features/#clients-pictures-and-sound): pictures, sound, GMCP and screen readers
- [sharpmush features dialects](/reference/sharpmush-help/sharpmush-features/#tinymux-rhostmush-and-imports): TinyMUX and RhostMUSH code and databases
- [sharpmush features administration](/reference/sharpmush-help/sharpmush-features/#running-the-game): backups, storage and diagnostics

### The web portal and accounts

The game serves a web portal from the same server: a Play page with a terminal, mail, character profiles, a [gallery](/reference/sharpmush-help/gallery/#gallery) of pictures for each character, scenes, the wiki, a world map, a softcode editor and staff pages. A new game is set up there, at `/setup`.

- An [accounts](/reference/sharpmush-help/accounts/#accounts) login holds many characters. At the login screen, [register](/reference/sharpmush-help/sharpcmd/#register) and [login](/reference/sharpmush-help/sharpcmd/#login) reach the account, and [create](/reference/sharpmush-help/sharpcmd/#create-1) and [play](/reference/sharpmush-help/sharpcmd/#play) make and connect its characters. Wizards manage accounts with [@account](/reference/sharpmush-help/account-command/#account).
- Players can also sign in through an outside provider, such as Discord, when staff turn it on.
- [@push](/reference/sharpmush-help/push-command/#push) sends a notification to a player's phone or browser.
- The [command palette](/reference/sharpmush-help/palette/#palette-entries) (Ctrl+K) runs game commands from [palette entries](/reference/sharpmush-help/palette/#palette-entries), ordered by the player's [@context](/reference/sharpmush-help/context-command/#context).
- [@config cosmetic portal](/reference/sharpmush-help/config-cosmetic-command/#the-web-portal) sets how the portal looks, and [layout themes](/reference/sharpmush-help/layout-themes/#layout-themes) colour both the portal and the terminal.
- [@reality portal visibility](/reference/sharpmush-help/reality/#portal-visibility) keeps reality layers apart in the portal too.

### Roles and permissions

- WIZARD and ROYALTY are [roles](/reference/sharpmush-help/roles/#roles), and each power is a `game.` permission, held by characters, objects and accounts. A character also holds its account's roles.
- [@role](/reference/sharpmush-help/role-command/#role) and [@permission](/reference/sharpmush-help/permission-command/#permission) define the game's own roles and permissions, and give or refuse them to one object or account. [ROLES()](/reference/sharpmush-help/sharpfunc/#roles), [HASROLE()](/reference/sharpmush-help/sharpfunc/#hasrole) and [PERMISSION()](/reference/sharpmush-help/sharpfunc/#permission) read them.
- A permission is decided as on Discord: an object's own override first, then its account's, then its roles, where one role that allows it wins over any that refuse it.
- [administrative capabilities](/reference/sharpmush-help/capabilities/#administrative-capabilities) lists the permissions that guard snapshots, jobs, queues, profiling and reality layers. [security](/reference/sharpmush-help/security/#security) gives an overview.
- The `approved` role and [ISAPPROVED()](/reference/sharpmush-help/sharpfunc/#isapproved) mark characters that have met the game's own bar.

### Wiki, feeds, pages and dice

- The game keeps a [wiki](/reference/sharpmush-help/wiki/#wiki), with revision history, categories and facts, that the portal shows and [@wiki](/reference/sharpmush-help/wiki/#wiki) edits. [Wiki functions](/reference/sharpmush-help/sharpfunc/#wiki-functions) read it.
- A [@feed](/reference/sharpmush-help/feed-command/#feed) is a stream of messages, such as a radio channel or a staff log, that a softcode system builds on. [Feed functions](/reference/sharpmush-help/feed-functions/#feed-functions) read feeds.
- When the game keeps a page log, `page/recall` and `page/conversations` read a player's own pages. See [page recall](/reference/sharpmush-help/page/#page-recall) and [page functions](/reference/sharpmush-help/page-functions/#page-functions).
- [@roll](/reference/sharpmush-help/roll-command/#roll) and [roll()](/reference/sharpmush-help/roll-function/#roll) roll [dice](/reference/sharpmush-help/roll-function/#roll) and keep each roll under a number that [rollinfo()](/reference/sharpmush-help/rollinfo-function/#rollinfo) checks later.
- [@appdraft](/reference/sharpmush-help/application-drafts/#appdraft) keeps a form, such as a job request, as a draft the player fills in a field at a time.
- [recurring jobs](/reference/sharpmush-help/jobs/#recurring-jobs) run an attribute on a schedule, kept in the world database.

### Plugins, Discord and scenes

[@plugin](/reference/sharpmush-help/plugin-command/#plugin) lists the .NET plugins the game runs, and turns them on and off. A plugin adds commands, functions, portal pages and help; [plugin help](/reference/sharpmush-help/plugin-help/#plugin-help) lists the help each one brings. These ship with SharpMUSH:

- Discord links game channels to Discord channels, and Discord roles and bans to the game's (`help @discord`).
- Scenes keep each scene's members and poses, with every edit of a pose, for the portal's scene pages (`help scene system`).
- World keeps grid maps whose places need no room each, and the portal draws them (`help @world`).
- MCP and LSP let AI tools and code editors check softcode against the game's own parser. Both start turned off.

### Softcode packages

A package is a set of softcode objects that installs, upgrades, rolls back and uninstalls as one, from the portal's Packages page. SharpMUSH ships with bundled packages, such as jobs, bulletin boards, character applications, +finger, +who and the scene commands. More come from package sources, which are Git repositories.

- [@package](/reference/sharpmush-help/sharpcmd/#package) turns objects on the game into a package.
- [@attribute packages](/reference/sharpmush-help/attribute-command/#attribute-entries-from-packages) shows which package declared each standard attribute.
- Every new game has handler objects for [EVENTS](/reference/sharpmush-help/events/#events) and [http](/reference/sharpmush-help/http/#http) requests, so packages can answer them with no setup.

### Softcode

- Every command has an output, which the next command in the same action list reads as `%>`. See [command output](/reference/sharpmush-help/command-output/#command-output).
- [named arguments](/reference/sharpmush-help/named-arguments/#named-arguments) pass arguments by name, read as `%<name>`, and [hasarg()](/reference/sharpmush-help/hasarg/#hasarg) tests for one.
- `%*` marks a [list separators](/reference/sharpmush-help/list-separators/#list-separators) delimiter, so an item that contains the delimiter stays whole.
- [@input](/reference/sharpmush-help/input-command/#input) passes each line a player types to an attribute, and [@map](/reference/sharpmush-help/sharpcmd/#map) runs an attribute for each element of a list.
- [cache()](/reference/sharpmush-help/cache-function/#cache) and [memo()](/reference/sharpmush-help/memo-function/#memo) keep the answers of slow code. [@attribute index](/reference/sharpmush-help/attribute-command/#attribute-indexes) and [indexed()](/reference/sharpmush-help/indexed-function/#indexed) find objects by an attribute's value without a search.
- [@attribute watch](/reference/sharpmush-help/attribute-command/#watched-attributes) runs event handler code whenever any copy of an attribute changes.
- [restrictedexpr()](/reference/sharpmush-help/restrictedexpr/#restrictedexpr) evaluates code limited to the functions you allow, with its inputs as literal text.
- Each command runs under an [execution budget](/reference/sharpmush-help/execution-budget/#execution-budget), and [queue budgets](/reference/sharpmush-help/queue-budgets/#queue-budgets) limit the work waiting in the queue.
- [~](/reference/sharpmush-help/sharpcmd/#-3) runs a command with strict argument parsing.

### Functions

- [Layout functions](/reference/sharpmush-help/layout/#layout-functions) draw boxes, tables, trees, gauges and panels, which each client gets at its own width, and the portal as layout. [layout themes](/reference/sharpmush-help/layout-themes/#layout-themes) colour them.
- [MEDIA FUNCTIONS](/reference/sharpmush-help/sharppueb/#media-functions) write a sound, picture or pane once for every client.
- [JSON FUNCTIONS](/reference/sharpmush-help/sharpfunc/#json-functions) add `json_array()`, `json_fill()` and `json_group_by()`.
- [rendermarkdown()](/reference/sharpmush-help/render-markdown/#rendermarkdown) turns Markdown into game text.
- [schema functions](/reference/sharpmush-help/schema-functions/#schemarender) check and draw JSON against a schema.
- [gradient()](/reference/sharpmush-help/gradient-function/#gradient), [notice()](/reference/sharpmush-help/notice-function/#notice), [chain()](/reference/sharpmush-help/chain-function/#chain), [dateparse()](/reference/sharpmush-help/dateparse-function/#dateparse), [formq()](/reference/sharpmush-help/formq-function/#formq), [standin()](/reference/sharpmush-help/standin-function/#standin), [exitmap()](/reference/sharpmush-help/exitmap-function/#exitmap) and [activity()](/reference/sharpmush-help/activity-function/#activity) have no PennMUSH equivalent.
- [syntaxdiagnostics()](/reference/sharpmush-help/sharpfunc/#syntaxdiagnostics) reports the parse errors in a piece of code.
- [account()](/reference/sharpmush-help/sharpfunc/#account) returns a character's account, and [context()](/reference/sharpmush-help/context-function/#context) the commands its context stack puts first.

### Commands and switches

New commands, beyond those under the other headings:

- [walk](/reference/sharpmush-help/sharpcmd/#walk) goes through a list of exits. [@gender](/reference/sharpmush-help/sharpcmd/#gender) sets the gender attribute.
- [@locale](/reference/sharpmush-help/sharpcmd/#locale) sets the language the game addresses you in. [@ascii](/reference/sharpmush-help/ascii-command/#ascii) sets what a character becomes for a client without UTF-8.
- [@queue](/reference/sharpmush-help/queuecontrol/#queue) lists, pauses and resumes queued work.

New switches on commands PennMUSH has:

- [@dolist then](/reference/sharpmush-help/dolist-command/#running-something-afterwards), [@mapsql then](/reference/sharpmush-help/mapsql-command/#running-something-afterwards): run something once the list or the query is done.
- [@sql prepare](/reference/sharpmush-help/sql-command/#prepared-statements), [@mapsql prepare](/reference/sharpmush-help/mapsql-command/#prepared-statements): queries with `?` parameters.
- `/args` on [@function](/reference/sharpmush-help/function-command/#function), [@command](/reference/sharpmush-help/command/#command), [@include](/reference/sharpmush-help/include-command/#include) and [@trigger](/reference/sharpmush-help/trigger-command/#trigger) names the arguments.

### Clients, pictures and sound

- [MEDIA FUNCTIONS](/reference/sharpmush-help/sharppueb/#media-functions) and [CMDLINK()](/reference/sharpmush-help/sharppueb/#cmdlink) reach MXP, Pueblo, the portal and plain text, each in its own form.
- [IMAGE ATTRIBUTES](/reference/sharpmush-help/image-attributes/#image) name the pictures the portal shows for characters, rooms, exits and things.
- [gmcpsupports()](/reference/sharpmush-help/gmcpsupports-function/#gmcpsupports) tells which [GMCP](/reference/sharpmush-help/oob-function/#oob) modules a client asked for.
- A [screen reader](/reference/sharpmush-help/screenreader/#screen-readers) gets text that reads well aloud.
- [charset](/reference/sharpmush-help/charset/#charset) sets a connection's character set, and [@ascii](/reference/sharpmush-help/ascii-command/#ascii) the game's stand-ins for a client without UTF-8.
- [@theme](/reference/sharpmush-help/theme-command/#theme) sets the layout theme an object's output is drawn in.

### TinyMUX, RhostMUSH and imports

- SharpMUSH imports PennMUSH, TinyMUX and RhostMUSH databases, with their configuration files. See [compatibility config](/reference/sharpmush-help/compatibility-config/#compatibility-config).
- An attribute flagged `mux` or `rhost` is read as that server reads it. See [compatibility dialects](/reference/sharpmush-help/compatibility-dialects/#compatibility-dialects) and [dialect switches](/reference/sharpmush-help/dialect-switches/#dialect-switches).
- TinyMUX and RhostMUSH commands and functions are there too, such as the MUX channel commands, [piping](/reference/sharpmush-help/piping/#piping), [toggles](/reference/sharpmush-help/toggles/#toggles), [@pipe](/reference/sharpmush-help/pipe-command/#pipe), [@rollback](/reference/sharpmush-help/rollback-command/#rollback), [@recover](/reference/sharpmush-help/recover-command/#recover), [@tag](/reference/sharpmush-help/tag-command/#tag), [@livewire](/reference/sharpmush-help/livewire-command/#livewire), [@rxlevel](/reference/sharpmush-help/rxlevel-command/#rxlevel), [printf()](/reference/sharpmush-help/printf-function/#printf), [strdistance()](/reference/sharpmush-help/strdistance-function/#strdistance), [colordepth()](/reference/sharpmush-help/colordepth-function/#colordepth) and [localfun](/reference/sharpmush-help/localfun/#localfun) (RhostMUSH's @lfunction). A command whose name PennMUSH uses for something else is there under an `@dialect_`, `@rhost_` or `@mux_` name.
- [compatibility left out](/reference/sharpmush-help/compatibility-left-out/#compatibility-left-out) lists what is not.

### Running the game

- [@backup](/reference/sharpmush-help/backup-command/#backup) copies the live world, and [@storage](/reference/sharpmush-help/storage-command/#storage) reports its disk use and purges old history.
- [object snapshots](/reference/sharpmush-help/snapshots/#object-snapshots) undo a mistake on one room, exit or code object.
- [@reality](/reference/sharpmush-help/reality/#reality) sets reality layers, off until staff turn them on, so objects in one room can be present to some viewers and not to others. RhostMUSH and TinyMUX reality levels import into them.
- [@secret](/reference/sharpmush-help/secret-command/#secret) keeps passwords and tokens encrypted, out of reach of softcode.
- [@profile](/reference/sharpmush-help/profile-command/#profile) records which functions and commands run, and [@ps/history](/reference/sharpmush-help/sharpcmd/#pshistory) lists recent queue outcomes.
- An internal error is reported as an [exception](/reference/sharpmush-help/sharpcode/#exception) with an id the server log can be searched for.
- The server reports Prometheus metrics at `/metrics`. With the update agent, the portal updates the game's containers.

<nav class="help-see-also help-see-also-names" aria-label="See also">
<span class="help-see-also-label">See Also</span>

- [pennmush compatibility](/reference/sharpmush-help/pennmush-compatibility/#pennmush-compatibility)
- [Getting Started](/reference/sharpmush-help/sharptop/#getting-started)
- [topics](/reference/sharpmush-help/topics/#topics)

</nav>


---
title: "SharpMUSH Features"
description: "SharpMUSH documentation for SharpMUSH Features"
---

<!-- help-article
{
  "corpus": "help",
  "id": "sharpmush-features",
  "lookup": "sharpmush features",
  "aliases": ["features"](/reference/sharpmush-help/sharpconf/#features),
  "sections": [
    {
      "id": "features-accounts",
      "heading": "Accounts and the web portal",
      "lookup": "sharpmush features accounts"
    },
    {
      "id": "features-roles",
      "heading": "Roles and permissions",
      "lookup": "sharpmush features roles"
    },
    {
      "id": "features-wiki",
      "heading": "The wiki",
      "lookup": "sharpmush features wiki"
    },
    {
      "id": "features-softcode",
      "heading": "Softcode",
      "lookup": "sharpmush features softcode"
    },
    {
      "id": "features-clients",
      "heading": "Clients, pictures and sound",
      "lookup": "sharpmush features clients"
    },
    {
      "id": "features-administration",
      "heading": "Running the game",
      "lookup": "sharpmush features administration"
    }
  ](/reference/sharpmush-help/sharpconf/#id-features-accounts-heading-accounts-and-the-web-portal-lookup-sharpmush-features-accounts-id-features-roles-heading-roles-and-permissions-lookup-sharpmush-features-roles-id-features-wiki-heading-the-wiki-lookup-sharpmush-features-wiki-id-features-softcode-heading-softcode-lookup-sharpmush-features-softcode-id-features-clients-heading-clients-pictures-and-sound-lookup-sharpmush-features-clients-id-features-administration-heading-running-the-game-lookup-sharpmush-features-administration)
}
-->
## SharpMUSH Features

SharpMUSH plays PennMUSH softcode and imports PennMUSH databases, and adds the systems below. Each
line names the help topic that explains it. For where SharpMUSH still differs from PennMUSH, see
[pennmush compatibility](/reference/sharpmush-help/pennmush-compatibility/#pennmush-compatibility).

### Accounts and the web portal

- Players can hold a web-portal account with several characters linked to it. At the login
  screen, [register](/reference/sharpmush-help/sharpcmd/#register) and [login](/reference/sharpmush-help/sharpcmd/#login) reach the account, and [make](/reference/sharpmush-help/sharpcmd/#make) and [play](/reference/sharpmush-help/sharpcmd/#play) create and connect its
  characters. Wizards manage accounts with [@account](/reference/sharpmush-help/sharpcmd/#account).
- [@locale](/reference/sharpmush-help/sharpcmd/#internationalization) sets the language the server addresses you in.

### Roles and permissions

- WIZARD, ROYALTY and the powers are [roles](/reference/sharpmush-help/roles/#roles), held by characters, objects and accounts. Games can
  define their own roles and permissions with [@role](/reference/sharpmush-help/role-command/#role) and [@permission](/reference/sharpmush-help/permission-command/#permission), and test them with
  [ROLES()](/reference/sharpmush-help/sharpfunc/#roles), [HASROLE()](/reference/sharpmush-help/sharpfunc/#hasrole) and [PERMISSION()](/reference/sharpmush-help/sharpfunc/#permission).
- [administrative capabilities](/reference/sharpmush-help/capabilities/#administrative-capabilities) lists the scopes that guard snapshots, jobs, queues and the
  reality layers. [security](/reference/sharpmush-help/security/#security) gives an overview of how access is decided.
- The `approved` role and [ISAPPROVED()](/reference/sharpmush-help/sharpfunc/#isapproved) mark characters that have met the game's own bar.

### The wiki

- The game has a wiki that the web portal serves and softcode can read. See [wiki](/reference/sharpmush-help/wiki/#wiki) and
  [Wiki functions](/reference/sharpmush-help/sharpfunc/#wiki-functions).

### Softcode

- Every command has an output, which the next command in the same action list reads as `%>`.
  See [command output](/reference/sharpmush-help/command-output/#command-output). [piping](/reference/sharpmush-help/piping/#piping) hands what a command printed to the next command as `%|`.
- Each command runs under a time limit, its [execution budget](/reference/sharpmush-help/execution-budget/#execution-budget), and [queue budgets](/reference/sharpmush-help/queue-budgets/#queue-budgets) limit how
  much work may wait in the queue. [@queue](/reference/sharpmush-help/queuecontrol/#queue) inspects and controls queued work.
- [restrictedexpr()](/reference/sharpmush-help/restrictedexpr/#restrictedexpr) evaluates code limited to the functions you allow. [localfun](/reference/sharpmush-help/localfun/#localfun) gives each
  owner their own named functions.
- [@map](/reference/sharpmush-help/sharpcmd/#map) runs an attribute once for each element of a list, and [@input](/reference/sharpmush-help/sharpcmd/#input) passes each line a
  player types to an attribute until the session ends.
- Every new game is seeded with handler objects for [EVENTS](/reference/sharpmush-help/sharpevents/#events) and [http] requests, so softcode
  can answer them without any setup.
- [JSON FUNCTIONS](/reference/sharpmush-help/sharpfunc/#json-functions), [rendermarkdown()](/reference/sharpmush-help/render-markdown/#rendermarkdown) and [~] (strict argument parsing) round out the toolset.

### Clients, pictures and sound

- [MEDIA FUNCTIONS](/reference/sharpmush-help/sharppueb/#media-functions) write a sound, picture or pane once, and each client gets it in its own form:
  MXP, Pueblo, the web portal or plain text.
- [IMAGE ATTRIBUTES](/reference/sharpmush-help/sharpattr/#image) name the pictures the portal shows for characters, rooms, exits and things.
- [CMDLINK()](/reference/sharpmush-help/sharppueb/#cmdlink) writes a clickable command for every client that has one.

### Running the game

- [recurring jobs](/reference/sharpmush-help/jobs/#recurring-jobs) run an attribute on a schedule. [object snapshots](/reference/sharpmush-help/snapshots/#object-snapshots) recover mistakes on a
  room, exit or code object without restoring the whole world.
- [@reality](/reference/sharpmush-help/reality/#reality) sets reality layers, so objects in one room can be present to some viewers and not
  to others.
- [@backup](/reference/sharpmush-help/sharpcmd/#backup) copies the live world, [@storage](/reference/sharpmush-help/sharpcmd/#storage) reports its disk use, and [@package](/reference/sharpmush-help/sharpcmd/#package) turns objects
  into installable softcode packages.
- [@profile](/reference/sharpmush-help/sharpcmd/#profile) records which functions and commands run, and [@ps/history] lists recent queue
  outcomes.
- An internal error is reported as an [exception](/reference/sharpmush-help/sharpcode/#exception) with an id the server log can be searched for.

::: seealso
- [pennmush compatibility](/reference/sharpmush-help/pennmush-compatibility/#pennmush-compatibility)
- [Getting Started](/reference/sharpmush-help/sharptop/#getting-started)
- [topics](/reference/sharpmush-help/topics/#topics)
:::

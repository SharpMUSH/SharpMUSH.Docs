---
title: "@lock/zone"
description: "SharpMUSH documentation for @lock/zone"
---

<!-- help-article
{
  "corpus": "help",
  "id": "lock-zone-command",
  "lookup": "@lock/zone",
  "aliases": [],
  "sections": [
    {"id": "chzone", "heading": "Chzone lock", "lookup": "@lock/zone chzone", "aliases": ["@lock/chzone"]},
    {"id": "chown", "heading": "Chown lock", "lookup": "@lock/zone chown", "aliases": ["@lock/chown"]},
    {"id": "parent", "heading": "Parent lock", "lookup": "@lock/zone parent", "aliases": ["@lock/parent"]},
    {"id": "link", "heading": "Link lock", "lookup": "@lock/zone link", "aliases": ["@lock/link"]},
    {"id": "open", "heading": "Open lock", "lookup": "@lock/zone open", "aliases": ["@lock/open"]}
  ]
}
-->
## @lock/zone

Objects which pass a SHARED player's @lock/zone control all the objects the shared player owns. If the zone_control_zmp_only @config option is off, anything passing the @lock/zone of other objects will control everything @chzoned to the object.

- [@lock/zone chzone](/reference/sharpmush-help/lock-zone-command/#chzone-lock): who can @chzone an object to this zone
- [@lock/zone chown](/reference/sharpmush-help/lock-zone-command/#chown-lock): who can @chown this CHOWN_OK object
- [@lock/zone parent](/reference/sharpmush-help/lock-zone-command/#parent-lock): who can @parent something to this LINK_OK object
- [@lock/zone link](/reference/sharpmush-help/lock-zone-command/#link-lock): who can @link this exit, or link an exit here
- [@lock/zone open](/reference/sharpmush-help/lock-zone-command/#open-lock): who can @open an exit from this OPEN_OK room

::: seealso
- [@chzone](/reference/sharpmush-help/chzone-command/#chzone)
- [SHARED](/reference/sharpmush-help/sharpflag/#shared)
- [zones](/reference/sharpmush-help/zones/#zones)
- [ZONE MASTER ROOMS](/reference/sharpmush-help/sharptop/#zone-master-rooms)
:::

### Chzone lock

If set, controls who can @chzone an object to this zone.

::: seealso
- [@chzone](/reference/sharpmush-help/chzone-command/#chzone)
- [zones](/reference/sharpmush-help/zones/#zones)
:::

### Chown lock

If set, controls who can change the owner of this CHOWN_OK object via @chown.

::: seealso
- [CHOWN_OK](/reference/sharpmush-help/sharpflag/#chownok)
- [@chown](/reference/sharpmush-help/sharpcmd/#chown)
:::

### Parent lock

Controls who can @parent something to this LINK_OK object.

::: seealso
- [@parent](/reference/sharpmush-help/sharpcmd/#parent)
- [LINK_OK](/reference/sharpmush-help/sharpflag/#linkok)
:::

### Link lock

Controls who can @link this unlinked exit, or who can @link an exit to this LINK_OK room/thing.

::: seealso
- [@link](/reference/sharpmush-help/sharpcmd/#link)
- [LINK_OK](/reference/sharpmush-help/sharpflag/#linkok)
- [@power](/reference/sharpmush-help/power-command/#power)
:::

### Open lock

Controls who can @open an exit from this OPEN_OK room.

::: seealso
- [@open](/reference/sharpmush-help/sharpcmd/#open)
- [@dig](/reference/sharpmush-help/dig-command/#dig)
- [OPEN_OK](/reference/sharpmush-help/sharpflag/#openok)
- [@power](/reference/sharpmush-help/power-command/#power)
:::

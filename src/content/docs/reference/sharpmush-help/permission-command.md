---
title: "@permission"
description: "SharpMUSH documentation for @permission"
---

<!-- help-article
{
  "corpus": "help",
  "id": "permission-command",
  "lookup": "@permission",
  "aliases": ["@permissions"](/reference/sharpmush-help/sharpconf/#permissions),
  "sections": [
    {
      "id": "permission-overrides",
      "heading": "Overrides",
      "lookup": "@permission overrides"
    },
    {
      "id": "permission-custom",
      "heading": "Custom permissions",
      "lookup": "@permission define"
    },
    {
      "id": "permission-categories",
      "heading": "Permission categories",
      "lookup": "@permission categories"
    }
  ](/reference/sharpmush-help/sharpconf/#id-permission-overrides-heading-overrides-lookup-permission-overrides-id-permission-custom-heading-custom-permissions-lookup-permission-define-id-permission-categories-heading-permission-categories-lookup-permission-categories),
  "redirects": {
    "@permission2": "@permission overrides",
    "@permission3": "@permission define"
  }
}
-->
## @permission

`@permission[/list]`<br>
`@permission[/info] <permission>`<br>
`@permission/allow[/account] <object>=<permission> [<permission> ...]`<br>
`@permission/deny[/account] <object>=<permission> [<permission> ...]`<br>
`@permission/clear[/account] <object>=<permission> [<permission> ...]`<br>
`@permission/define <permission>=<category>[/<description>]`<br>
`@permission/undefine <permission>`<br>
`@permission/category <permission>=<category>`<br>
`@permission/categories`<br>
`@permission/category/create <category>=<description>`<br>
`@permission/category/describe <category>=<description>`<br>
`@permission/category/rename <category>=<new name>`<br>
`@permission/category/delete <category>`

A permission names one thing an object may do, such as `wiki.edit` or `game.see_all`. Roles allow and deny permissions (see [@role](/reference/sharpmush-help/role-command/#role) and [roles](/reference/sharpmush-help/roles/#roles)); @permission lists them, sets them on one object or account, and manages the permissions a game defines for itself.

`@permission` lists every permission, with the narrower permissions each umbrella permission covers, and then the game's custom permissions by category. `@permission <permission>` shows one: its category and description, what it covers, and which roles allow or deny it. Anyone may list permissions and look at one.

### Overrides

An override sets one permission on one holder, and beats every role that holder has. `@permission/deny Twink=wiki.edit` takes wiki editing away from that character even though the `player` role allows it, and `@permission/allow Ariel=wiki.delete` grants it without a role. Add `/account` to set it on the player's account instead, so it applies to all their characters. `@permission/clear` removes an override.

When both are set, the object's override beats the account's. `@power <object>=See_All` is an Allow override on `game.see_all`, and `@power <object>=!See_All` clears it.

An override cannot touch `administrator`, and nothing overrides a role that allows `administrator`. Setting one follows the rules of [@role rank](/reference/sharpmush-help/sharpcmd/#role-rank).

### Examples

```sharp
> @permission/deny Twink=wiki.edit media.upload
> @permission/clear Twink=wiki.edit
> @permission/allow/account Ariel=wiki.delete
```

### Custom permissions

A game can add permissions of its own for its softcode to check. `@permission/define bbs.moderate=Staff/Moderate any board` defines `bbs.moderate` in the `Staff` permission category; from then on it is allowed and denied like any built-in permission, with `@role/allow`, overrides and the portal's role editor. Softcode asks `permission(%#,bbs.moderate)` or locks with `PERM^bbs.moderate`, and `@command/restrict` and `@function/restrict` accept it. A package can define the permissions it checks itself (see [roles packages](/reference/sharpmush-help/sharpconf/#roles-packages)); the scene package defines `scene.close`.

A name is two or more parts joined by `.`, each of lowercase letters, digits and `_`, at most 64 characters; `valid(permission, <name>)` checks one. It cannot be a built-in permission, or start with `game.`, `control.` or `protect.`. Defining a name again changes its category and description; `@permission/category <permission>=<category>` changes only the category.

`@permission/undefine <permission>` removes it, and every role and override that set it. It needs the right to grant the permission.

A new custom permission is held only by #1 and holders of `administrator` until a role or override allows it. A holder of `game.wizard` may allow any custom permission. Defining or removing one needs the `roles.admin` permission.

### Examples

```sharp
> @permission/define bbs.moderate=Staff/Moderate any board
> @role/allow helper=bbs.moderate
> think permission(*Ariel,bbs.moderate)
```

### Permission categories

Custom permissions have a category list of their own, apart from the role categories of [@role categories](/reference/sharpmush-help/sharpcmd/#role-categories); the same name may be in both. Each category has a description of up to 200 characters. A new game has `Staff`. `@permission/categories` lists them, with how many permissions each holds and its description.

`@permission/category/create <category>=<description>` makes one. A name is 1 to 32 characters a player name may use, without `/`; `valid(rolecategory, <name>)` checks one. Names are matched without regard to case. `@permission/define` and `@permission/category` refuse a category that does not exist, with a reminder to create it first.

`@permission/category/describe` changes the description, and `@permission/category/rename` the name, taking every permission in it along. `@permission/category/delete` removes an empty category. All of these need the `roles.admin` permission.

### Examples

```sharp
> @permission/category/create Boards=Permissions the board softcode checks
> @permission/define bbs.moderate=Boards/Moderate any board
```

::: seealso
- [@role](/reference/sharpmush-help/role-command/#role)
- [roles](/reference/sharpmush-help/roles/#roles)
- [PERMISSION()](/reference/sharpmush-help/sharpfunc/#permission)
- [@power](/reference/sharpmush-help/power-command/#power)
- [lock keys](/reference/sharpmush-help/lock-keys/#lock-keys)
:::

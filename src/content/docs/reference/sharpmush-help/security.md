---
title: "Security"
description: "SharpMUSH documentation for Security"
---

## Security

SharpMUSH decides who may do what in a few layers:

- Roles and permissions decide what an account, its characters and their objects may do.
  WIZARD, ROYALTY and the powers are roles too. See [roles](/reference/sharpmush-help/roles/#roles) and [administrative capabilities](/reference/sharpmush-help/capabilities/#administrative-capabilities).
- Locks decide who may use, enter, pass or otherwise act on one object. See [@lock](/reference/sharpmush-help/sharpcmd/#locking) and [locktypes](/reference/sharpmush-help/sharplock/#locktypes).
- Command and function restrictions narrow what the whole game may use. See [restrict](/reference/sharpmush-help/restrict/#restrict).
- Site locks decide which addresses may connect, create characters or register accounts.
  See [@sitelock](/reference/sharpmush-help/sitelock-command/#sitelock).

::: seealso
- [roles](/reference/sharpmush-help/roles/#roles)
- [@role](/reference/sharpmush-help/role-command/#role)
- [@permission](/reference/sharpmush-help/permission-command/#permission)
- [administrative capabilities](/reference/sharpmush-help/capabilities/#administrative-capabilities)
- [@lock](/reference/sharpmush-help/sharpcmd/#locking)
- [locktypes](/reference/sharpmush-help/sharplock/#locktypes)
- [restrict](/reference/sharpmush-help/restrict/#restrict)
- [@sitelock](/reference/sharpmush-help/sitelock-command/#sitelock)
:::

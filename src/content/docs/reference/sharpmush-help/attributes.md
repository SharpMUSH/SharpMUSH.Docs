---
title: "Attributes Overview"
description: "SharpMUSH documentation for Attributes Overview"
---

<!-- help-article
{
  "corpus": "help",
  "id": "attributes",
  "lookup": "attributes",
  "aliases": [
    "ATTRIBUTES LIST",
    "ATTRIBUTE LIST"
  ](/reference/sharpmush-help/sharpattr/#attributes-list-attribute-list),
  "sections": [
    {
      "id": "attribute-contents",
      "heading": "Attribute contents",
      "lookup": "attributes attribute contents"
    },
    {
      "id": "abbreviating-names",
      "heading": "Abbreviating names",
      "lookup": "attributes abbreviating names"
    },
    {
      "id": "attribute-ownership",
      "heading": "Attribute ownership",
      "lookup": "attributes attribute ownership"
    }
  ](/reference/sharpmush-help/sharpattr/#id-attribute-contents-heading-attribute-contents-lookup-attributes-attribute-contents-id-abbreviating-names-heading-abbreviating-names-lookup-attributes-abbreviating-names-id-attribute-ownership-heading-attribute-ownership-lookup-attributes-attribute-ownership),
  "redirects": {
    "ATTRIBUTES2": "attributes attribute contents",
    "ATTRIBUTES3": "attributes abbreviating names",
    "ATTRIBUTES4": "attributes attribute ownership"
  }
}
-->
## Attributes

Attributes with (*) after them are special, cannot be set by players, and may only be visible to wizards or admin. For those attributes, there is no @-command, so you can just type 'help `<attribute name>`' for help. For all other attributes, type 'help @`<attribute name>`' for help.

Standard Attributes: (see `@list/attribs` for the complete list)

|                |              |                  |                |                |
|----------------|--------------|------------------|----------------|----------------|
| [@AAHEAR](/reference/sharpmush-help/sharpcmd/#ahear)      | [@ACLONE](/reference/sharpmush-help/sharpcmd/#aclone)    | [@ACONNECT](/reference/sharpmush-help/sharpcmd/#aconnect)      | [@ADESCRIBE](/reference/sharpmush-help/sharpcmd/#adescribe)   | [@ADISCONNECT](/reference/sharpmush-help/sharpcmd/#adisconnect) |
| [@ADROP](/reference/sharpmush-help/sharpcmd/#adrop)       | [@AEFAIL](/reference/sharpmush-help/sharpcmd/#aefail)    | [@AENTER](/reference/sharpmush-help/sharpcmd/#aenter)        | [@AFAILURE](/reference/sharpmush-help/sharpcmd/#afailure)    | [@AHEAR](/reference/sharpmush-help/sharpcmd/#ahear)       |
| [@ALEAVE](/reference/sharpmush-help/sharpcmd/#leave)      | [@ALFAIL](/reference/sharpmush-help/sharpcmd/#lfail)    | [@AMHEAR](/reference/sharpmush-help/sharpcmd/#ahear)        | [@AMOVE](/reference/sharpmush-help/sharpcmd/#move)       | [@APAYMENT](/reference/sharpmush-help/sharpcmd/#apayment)    |
| [@ASUCCESS](/reference/sharpmush-help/sharpcmd/#asuccess)    | [@AWAY](/reference/sharpmush-help/sharpcmd/#away)      | [@CHARGES](/reference/sharpmush-help/charges-command/#charges)       | [@COST](/reference/sharpmush-help/sharpcmd/#cost)        | [@DESCRIBE](/reference/sharpmush-help/sharpcmd/#describe)    |
| [@DROP](/reference/sharpmush-help/sharpcmd/#adrop)        | [@EALIAS](/reference/sharpmush-help/sharpcmd/#ealias)    | [@EFAIL](/reference/sharpmush-help/sharpcmd/#aefail)         | [@ENTER](/reference/sharpmush-help/sharpcmd/#aenter)       | [@FAILURE](/reference/sharpmush-help/sharpcmd/#afailure)     |
| [@FORWARDLIST](/reference/sharpmush-help/sharpcmd/#forwardlist) | [@HAVEN](/reference/sharpmush-help/sharpcmd/#haven)     | [@IDESCRIBE](/reference/sharpmush-help/sharpcmd/#idescribe)     | [@IDLE](/reference/sharpmush-help/sharpcmd/#idle)        | [@LALIAS](/reference/sharpmush-help/sharpcmd/#ealias)      |
| [LAST](/reference/sharpmush-help/sharptop/#last) (*)     | [LASTIP](/reference/sharpmush-help/sharptop/#lastsite) (*) | [LASTLOGOUT](/reference/sharpmush-help/sharptop/#last) (*) | [LASTSITE](/reference/sharpmush-help/sharptop/#lastsite) (*) | [@LEAVE](/reference/sharpmush-help/sharpcmd/#leave)       |
| [@LFAIL](/reference/sharpmush-help/sharpcmd/#lfail)       | [@LISTEN](/reference/sharpmush-help/listen-command/#listen)    | [@MOVE](/reference/sharpmush-help/sharpcmd/#go)          | [@ODESCRIBE](/reference/sharpmush-help/sharpcmd/#adescribe)   | [@ODROP](/reference/sharpmush-help/sharpcmd/#adrop)       |
| [@OEFAIL](/reference/sharpmush-help/sharpcmd/#aefail)      | [@OENTER](/reference/sharpmush-help/sharpcmd/#aenter)    | [@OFAILURE](/reference/sharpmush-help/sharpcmd/#afailure)      | [@OLEAVE](/reference/sharpmush-help/sharpcmd/#leave)      | [@OLFAIL](/reference/sharpmush-help/sharpcmd/#lfail)      |
| [@OMOVE](/reference/sharpmush-help/sharpcmd/#move)       | [@OPAYMENT](/reference/sharpmush-help/sharpcmd/#apayment)  | [@OSUCCESS](/reference/sharpmush-help/sharpcmd/#asuccess)      | [@OXENTER](/reference/sharpmush-help/sharpcmd/#aenter)     | [@OXLEAVE](/reference/sharpmush-help/sharpcmd/#leave)     |
| [@OXMOVE](/reference/sharpmush-help/sharpcmd/#move)      | [@PAYMENT](/reference/sharpmush-help/sharpcmd/#apayment)   | [QUEUE](/reference/sharpmush-help/queue/#queue) (*)      | [RQUOTA](/reference/sharpmush-help/sharptop/#rquota) (*)   | [@RUNOUT](/reference/sharpmush-help/sharpcmd/#runout)      |
| [@SEX](/reference/sharpmush-help/sharpcmd/#gender)         | [@STARTUP](/reference/sharpmush-help/sharpcmd/#startup)   | [@SUCCESS](/reference/sharpmush-help/sharpcmd/#asuccess)       | TFPREFIX       |                |

### Attribute contents

An attribute is part of the code on an object that makes it unique. An attribute can contain any sort of text -- from a single word, to a long paragraph, to a piece of MUSHcode. Some attributes are standard in SharpMUSH. That means that their effects are pre-set.

Standard attributes can be set using one of the following commands:<br>
    @`<attribute name>` `<object>`=`<content>`<br>
    `@set` `<object>`=`<attribute name>`:`<content>`<br>
    &`<attribute name>` `<object>`=`<content>`

It is also possible to have non-standard attributes, which can be named anything you like. Please see [NON-STANDARD ATTRIBUTES](/reference/sharpmush-help/sharptop/#non-standard-attributes) for more information on those.

### Abbreviating names

Any attribute name can be shortened, but a shorter forms run the risk of conflicting with other attribute names. This could result in you setting an unwanted attribute.

For example:
  ```sharp
    @adesc me=think %n looks at you.
  ```
will set your ADESCRIBE attribute just as
  ```sharp
    @adescribe`me=think %n looks at you.
  ```
would.

To see the attributes that are set on you or on any of the objects you own, you should use the "examine" command. See [examine](/reference/sharpmush-help/sharpcmd/#examine).

### Attribute ownership

Attributes can be owned by someone other than the object they are set on. This allows the person to change the content of just that attribute while not the rest of the object. Attributes can also be locked, which prevents them from being changed by anyone.

In addition to the standard attributes with pre-set effects, there are some special attributes that date from the days before you could set non-standard attributes with any name you wanted. These are the attributes VA-VZ, WA-WZ, XA-XZ. These attributes have no pre-set effects, and were just to allow players to store any text or MUSHcode that they wished in those attributes. Now that non-standard attributes are available, it is highly recommended that you instead use them, since you can use longer and descriptive names for attributes, which makes it much easier to examine and work on objects.

::: seealso
- [ATTRIB-OWNERSHIP](/reference/sharpmush-help/sharptop/#attribute-ownership)
- [@set](/reference/sharpmush-help/sharpcmd/#set)
- [examine](/reference/sharpmush-help/sharpcmd/#examine)
- [@atrchown](/reference/sharpmush-help/sharpcmd/#atrchown)
- [@atrlock](/reference/sharpmush-help/sharpcmd/#atrlock)
- [HASATTR()](/reference/sharpmush-help/sharpfunc/#hasattr)
- [GET()](/reference/sharpmush-help/sharpfunc/#get)
- [V()](/reference/sharpmush-help/sharpfunc/#v)
- [NON-STANDARD ATTRIBUTES](/reference/sharpmush-help/sharptop/#non-standard-attributes)
- [SETTING-ATTRIBUTES](/reference/sharpmush-help/sharptop/#setting-attributes)
- [attribute trees](/reference/sharpmush-help/attribute-trees/#attribute-trees)
:::

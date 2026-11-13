---
title: "Mail System"
description: "SharpMUSH documentation for Mail System"
---

## Mail

- `@mail[/<switches>] [<msg-list>[=<target>]]`
- `@mail[/<switches>] <player-list>=[<subject>/]<message>`

@mail invokes the built-in MUSH mailer, which allows players to send and receive mail. Pronoun/function substitution is performed on any messages you may try to send.

A *&lt;msg-list&gt;* is one of the following:
* A single msg # (ex: 3)
* A message range (ex: 2-5, -7, 3-)
* A folder number and message number/range (ex: 0:3, 1:2-5, 2:-7)
* A sender (ex: *paul)
* An age of mail in days (ex: ~3 (exactly 3), <2, >1)
* "days" here means 24-hour periods from the current time.
* One of the following: "read", "unread", "cleared", "tagged", "urgent", "folder" (all messages in the current folder), "all" (all messages in all folders).

Unless a folder is explicitly specified, or all is used, only messages in the current folder will be counted.

A *&lt;player-list&gt;* is a space-separated list of recipients, which may be:
* Player names
* Player dbref #'s
* Message #'s, in which case you send to the sender of that message
* An alias name (see [@malias](/reference/sharpmush-help/malias-command/#malias))


::: seealso
- [MAIL-SENDING](/reference/sharpmush-help/sharpmail/#sending-mail)
- [MAIL-READING](/reference/sharpmush-help/sharpmail/#reading-mail)
- [MAIL-FOLDERS](/reference/sharpmush-help/sharpmail/#mail-folders)
- [@mail/fwd](/reference/sharpmush-help/sharpmail/#sending-mail)
- [MAIL-OTHER](/reference/sharpmush-help/mail-other/#other-mail-commands)
- [MAIL-ADMIN](/reference/sharpmush-help/sharpmail/#mail-administration)
- [@malias](/reference/sharpmush-help/malias-command/#malias)
- [MAIL-REVIEWING](/reference/sharpmush-help/sharpmail/#reviewing-mail)
- [@MAILQUOTA](/reference/sharpmush-help/sharpmail/#mailquota)
:::

## Reading Mail

- `@mail <msg #>`
- `@mail/read <msg-list>`
* This displays messages which match the msg# or msg-list from your current folder.

- `@mail`
- `@mail <msg-list, but not a single msg #>`
- `@mail/list <msg-list>`
* This gives a brief list of all mail in the current folder, with sender name, time sent, and message status.
* The status field is a set of characters (ex: NC-UF+) which mean:
* N = New (unread) message
* C = Cleared message
* U = Urgent message
* F = Forwarded message
* + = Tagged message
* The opposites of these (read messages, etc.) are indicated with a '-' in the status field in that position.

`@mail/cstats`
* Shows how many messages you have, in the same format as the automatic mail check when you connect.

## Sending Mail

- `@mail[/switch] <player-list>=[<subject>]/<msg>`
* This sends the message *&lt;msg&gt;* to all players in *&lt;player-list&gt;*.
* If no subject is given, the message subject is the beginning of the message itself. To include a literal / in the subject, double it up (//).
* All function substitutions are valid in *&lt;msg&gt;* including mail(#) which will allow you to forward mail you have received to other users.

The following switches are available:
* `/send` - same as no switch
* `/urgent` - mail is marked as "Urgent"
* `/silent` - no notification to sender that mail was sent
* `/nosig` - no mail signature
* `/noeval` - `<player-list>`, `<subject>` and `<msg>` are not evaluated
* `/quick` - TinyMUX's form, `@mail/quick <player-list>/<subject>=<msg>`: the subject sits on the left

If you have an [@mailsignature](/reference/sharpmush-help/sharpmail/#mailsignature) attribute set on yourself, its contents will be evaluated and appended to the message unless the /nosig switch is given.

There is no `/reply` switch. To answer a message, send one to its sender:

```
@mail Bob=Re: Dinner/Thanks, I'll be there.
```

- `@mail/fwd <msg-list>=<player-list>`
* This sends a copy of all the messages in *&lt;msg-list&gt;* to all the players in *&lt;player-list&gt;*. The copy will appear to have been sent by you (not the original sender), and its status will be "Forwarded". `/forward` is the same switch.

## Mail Folders

The MUSH mail system allows each player 16 folders, numbered from 0 to 15. Mail can only be in 1 folder at a time. Folder 0 is the "inbox" where new mail is received. Most @mail commands operate on only the current folder.

- `@mail/folder`
* This commands lists all folders which contain mail, telling how many messages are in each, and what the current folder is.

- `@mail/folder <folder#|foldername>`
* This command sets your current folder to *<folder#>*.

- `@mail/folder <folder#> = <foldername>`
* This command gives *<folder#>* a name.

- `@mail/unfolder <folder#|foldername>`
* This command removes a folder's name

- `@mail/file <msg-list>=<folder#|foldername>`
* This command moves all messages in *&lt;msg-list&gt;* from the current folder to a new folder, *<folder#>*.
* A name none of your folders has yet makes a new folder of that name, with the lowest folder number not in use.


::: seealso
- [@MAILFILTER](/reference/sharpmush-help/sharpmail/#mailfilter)
:::

## Reviewing Mail

- `@mail/review [<player>]`
* Reviews the messages you have sent to *&lt;player&gt;*, or all messages you've sent if no *&lt;player&gt;* is specified.

- `@mail/review <player>=<msglist>`
* Reads the messages you have sent to *&lt;player&gt;*.

- `@mail/retract <player>=<msglist>`
* Retracts (deletes) unread messages you have sent to *&lt;player&gt;*.

## @mailquota

- `@mailquota <player>[=<limit>]`

This attribute allows wizards to change the maximum number of messages a player can have in their inbox, override the mail_limit @config option for specific people. *&lt;limit&gt;* should be a number between 1 and 50000, inclusive.

### Example
```sharp
> @alias *Walker=Complaints_Department
> @mailquota *Complaints_Department=50000
> @wall Please @mail any and all problems to Complaints_Department.
```

## @mailfilter

The @mailfilter attribute specifies automatic filing of incoming @mail messages into folders. When an @mail message is received, the contents of @mailfilter are evaluated, with the following arguments passed:
* `%0` or `%<sender>` - dbref of message sender
* `%1` or `%<subject>` - message subject
* `%2` or `%<body>` - message body
* `%3` or `%<flags>` - message status flags (a string containing U and/or F, for urgent and/or forwarded)

Each value is passed by position and by the name shown (see [named arguments](/reference/sharpmush-help/named-arguments/#named-arguments)). Code written for PennMUSH reads the positions.

If @mailfilter evaluates to a folder name or number, the message will be filed into that folder. If @mailfilter evaluates to a null string, the message remains in the incoming folder.

### Example
Filter urgent messages into folder 1
```sharp
> @mailfilter me=if(strmatch(%3,*U*),1)
```

The same, reading the flags by name:
```sharp
> @mailfilter me=if(strmatch(%<flags>,*U*),1)
```


::: seealso
- [MAIL-FOLDERS](/reference/sharpmush-help/sharpmail/#mail-folders)
:::

## @mailsignature

- `@mailsignature <object>[=<signature>]`

When set, this attribute is evaluated and appended to any @mail messages sent by *\<object\>*, unless the @mail/nosig command is used.

### Example
```sharp
> @mailsignature me=%r%r-- %n%r%r[u(funny_quote)]
```


::: seealso
- [MAIL](/reference/sharpmush-help/sharpmail/#mail)
- [MAIL-SENDING](/reference/sharpmush-help/sharpmail/#sending-mail)
:::

## Mail Administration

The @mail command can also take the following switches:

- `@mail/stats [<player>]` - Basic mail statistics.
- `@mail/dstats [<player>]` - Also provides read/unread count.
- `@mail/fstats [<player>]` - Does all that, plus gives space usage.

- `@mail/debug <action>[=<player>]`
- `@mail/nuke`

Only wizards may stats players other than themselves.

The /debug switch does sanity checking on the mail database, and needs the chat administration permission. `@mail/debug sanity` just does the check; the command `@mail/debug clear=<player name or dbref number>` wipes mail for an object. `@mail/debug fix` attempts to repair problems noted in the sanity check.

The /nuke switch destroys the post office, erasing all @mail everywhere. It may only be used by God.

## Mail Functions

Mail functions work with @mail. Some come from TinyMUX (see [tinymux mail functions](/reference/sharpmush-help/mux-mail-functions/#tinymux-mail-functions)) and some from RhostMUSH (see [rhostmush mail functions](/reference/sharpmush-help/rhost-mail-functions/#rhostmush-mail-functions)).

|                   |                   |                   |                   |
|-------------------|-------------------|-------------------|-------------------|
| [FOLDERCURRENT()](/reference/sharpmush-help/rhost-mail-functions/#foldercurrent) | [FOLDERLIST()](/reference/sharpmush-help/rhost-mail-functions/#foldercurrent)    | [FOLDERSTATS()](/reference/sharpmush-help/sharpmail/#folderstats)   | [MAIL()](/reference/sharpmush-help/sharpmail/#mail-1)          |
| [MAILALIAS()](/reference/sharpmush-help/mailalias-function/#mailalias)     | [MAILCOUNT()](/reference/sharpmush-help/mux-mail-functions/#mailcount)     | [MAILDSTATS()](/reference/sharpmush-help/sharpmail/#mailstats)    | [MAILFLAGS()](/reference/sharpmush-help/mux-mail-functions/#mailflags)     |
| [MAILFROM()](/reference/sharpmush-help/sharpmail/#mailfrom)      | [MAILFSTATS()](/reference/sharpmush-help/sharpmail/#mailstats)    | [MAILINFO()](/reference/sharpmush-help/mux-mail-functions/#mailinfo)      | [MAILLIST()](/reference/sharpmush-help/sharpmail/#maillist)      |
| [MAILQUICK()](/reference/sharpmush-help/rhost-mail-functions/#mailquick)     | [MAILQUOTA()](/reference/sharpmush-help/rhost-mail-functions/#mailquota)     | [MAILREAD()](/reference/sharpmush-help/rhost-mail-functions/#mailread)      | [MAILREVIEW()](/reference/sharpmush-help/mux-mail-functions/#mailreview)    |
| [MAILSEND()](/reference/sharpmush-help/sharpmail/#mailsend)      | [MAILSIZE()](/reference/sharpmush-help/mux-mail-functions/#mailcount)      | [MAILSTATS()](/reference/sharpmush-help/sharpmail/#mailstats)     | [MAILSTATUS()](/reference/sharpmush-help/sharpmail/#mailfrom)    |
| [MAILSUBJECT()](/reference/sharpmush-help/sharpmail/#mailfrom)   | [MAILTIME()](/reference/sharpmush-help/sharpmail/#mailfrom)      | [MALIAS()](/reference/sharpmush-help/sharpmail/#malias)        | [MSIZETOT()](/reference/sharpmush-help/rhost-mail-functions/#mailquota)      |

## folderstats()

- `folderstats()`
- `folderstats(<folder #>)`
- `folderstats(<player>)`
- `folderstats(<player>, <folder #>)`

folderstats() returns the number of read, unread, and cleared messages in a specific folder, or, if none is given, the player's current folder. Only Wizards may use forms which get other players' mail information.


::: seealso
- [mailstats()](/reference/sharpmush-help/sharpmail/#mailstats)
:::

## mail()

- `mail()`
- `mail(<player name>)`
- `mail([<folder #>:]<mail message #>)`
- `mail(<player>, [<folder #>:]<mail message #>)`

Without arguments, mail() returns the number of messages in all the player's mail folders. With a player name argument, mail() returns the number of read, unread, and cleared messages *&lt;player&gt;* has in all folders. Only Wizards can use this on other players.

When given numeric arguments, mail() returns the text of the corresponding message in the current folder. The message number may also be prefaced by the folder number and a colon, to indicate a message in a different folder.

### Example
```sharp
> think mail(3:2)
(text of the second message in the player's third folder)
```


::: seealso
- [maillist()](/reference/sharpmush-help/sharpmail/#maillist)
- [mailfrom()](/reference/sharpmush-help/sharpmail/#mailfrom)
:::

## maillist()

- `maillist([<player>, ]<message-list>)`

maillist() returns a list of all *&lt;player&gt;*'s @mail messages which match the given *&lt;message-list&gt;* (the same as @mail/list *&lt;message-list&gt;*). If no *&lt;player&gt;* is given, the executor's mail is matched. The *&lt;message-list&gt;* argument is described in [MAIL](/reference/sharpmush-help/sharpmail/#mail).

### Examples
```sharp
> think maillist()
0:1 0:2 0:3
> think maillist(all)
0:1 0:2 0:3 1:1 1:2
> think maillist(1:)
1:1 1:2
```


::: seealso
- [MAIL](/reference/sharpmush-help/sharpmail/#mail)
- [mailfrom()](/reference/sharpmush-help/sharpmail/#mailfrom)
:::

## mailfrom()

- `mailfrom([<player>, ][<folder #>:]<mail message #>)`
- `mailtime([<player>, ][<folder #>:]<mail message #>)`
- `mailstatus([<player>, ][<folder #>:]<mail message #>)`
- `mailsubject([<player>, ][<folder #>:]<mail message #>)`

* mailfrom() returns the dbref number of the sender of a mail message.
* mailtime() is similar, but returns the time the mail was sent.
* mailsubject() is similar, but returns the subject of the message.
* mailstatus() returns the mail's status characters (as per @mail/list).


::: seealso
- [MAIL](/reference/sharpmush-help/sharpmail/#mail)
- [maillist()](/reference/sharpmush-help/sharpmail/#maillist)
:::

## mailstats()

- `mailstats([<player>])`
- `maildstats([<player>])`
- `mailfstats([<player>])`

The mail*stats() functions return data like @mail/*stats does. You either must use this on yourself, or you must be a wizard. The information will be joined together as a space separated list of numbers.

### Example
```sharp
> think mailstats(One)
<# sent> <# received>
> think mailfstats(One)
<# sent> <# sent unread> <# sent cleared> <# sent bytes> <# received>
<# received unread> <# received cleared> <# received bytes>
```


::: seealso
- [folderstats()](/reference/sharpmush-help/sharpmail/#folderstats)
:::

## mailsend()

- `mailsend(<player>,[<subject>/]<message>)`
- `mailsend(<players>,<subject>,<message>)`

This function sends a message to a player, just like @mail/send. It returns nothing if successful, or an error message. The three-argument form is TinyMUX's: the subject is given apart, and it returns 1 once the mail is delivered.

## malias()

- `malias([<delimiter>])`
- `malias(<malias name>)`
- `malias(<malias name>[,<delimiter>])`

With no arguments, malias() returns the list of all malias names which are visible to the player. With two arguments, returns the list of dbrefs that are members of the given malias, delimited by *&lt;delimiter&gt;*.

With one argument, the behavior is ambiguous:
* If the argument matches a malias, returns the list of dbrefs that are members of the malias, space-delimited
* If not, it's treated as a no-argument case with a delimiter

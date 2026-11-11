---
title: "Lock Types"
description: "SharpMUSH documentation for Lock Types"
---

<!-- help-article
{
  "corpus": "help",
  "id": "locktypes",
  "lookup": "locktypes",
  "aliases": [
    "LOCKLIST",
    "LOCK TYPES",
    "LOCK LIST"
  ],
  "sections": [
    {
      "id": "additional-lock-types",
      "heading": "Additional lock types",
      "lookup": "locktypes additional lock types"
    },
    {
      "id": "control-lock-types",
      "heading": "Control, filter and ownership lock types",
      "lookup": "locktypes control"
    }
  ],
  "redirects": {
    "LOCK TYPES2": "locktypes additional lock types",
    "LOCKTYPES2": "locktypes additional lock types"
  }
}
-->
## Lock Types

These are the standard lock types supported by SharpMUSH. For more detailed information about any lock type, see `[@lock/<lock>]`.

Standard Lock Types:
- [@lock/basic](/reference/sharpmush-help/sharplock/#lockbasic) - Who can pick up the player/thing, or go through the exit.
- [@lock/enter](/reference/sharpmush-help/sharplock/#lockbasic) - Who can enter the player/object (aka @elock)
- [@lock/teleport](/reference/sharpmush-help/sharplock/#lockbasic) - Who can teleport to the room
- [@lock/use](/reference/sharpmush-help/sharplock/#lockuse) - Who can use the object (aka @ulock)
- [@lock/page](/reference/sharpmush-help/sharplock/#lockpage) - Who can page/@pemit the player
- [@lock/zone](/reference/sharpmush-help/lock-zone-command/#lockzone) - Who can control objects on this zone
- [@lock/parent](/reference/sharpmush-help/lock-zone-command/#parent-lock) - Who can @parent something to this object/room
- [@lock/link](/reference/sharpmush-help/lock-zone-command/#link-lock) - Who can @link something to this object/room or who can @link this unlinked exit.
- [@lock/open](/reference/sharpmush-help/lock-zone-command/#open-lock) - Who can @open an exit from this room
- [@lock/mail](/reference/sharpmush-help/sharplock/#lockpage) - Who can @mail the player
- [@lock/user:&lt;name&gt;] - User-defined. No built-in function of this lock, but users can test it with elock()


::: seealso
- [locktypes additional lock types](/reference/sharpmush-help/locktypes/#additional-lock-types)
:::

### Additional lock types

More standard lock types:

- [@lock/speech](/reference/sharpmush-help/sharplock/#lockpage) - Who can speak/pose/emit in this room
- [@lock/listen](/reference/sharpmush-help/sharplock/#lockuse) - Who can trigger my @ahear/^-pattern actions
- [@lock/command](/reference/sharpmush-help/sharplock/#lockuse) - Who can trigger my $-pattern commands
- [@lock/leave](/reference/sharpmush-help/sharplock/#lockbasic) - Who can leave this object (or room, via exits/@tel)
- [@lock/drop](/reference/sharpmush-help/sharplock/#lockdrop) - Who can drop this object
- [@lock/dropin](/reference/sharpmush-help/sharplock/#lockdrop) - Who can drop objects into this location.
- [@lock/give](/reference/sharpmush-help/sharplock/#lockdrop) - Who can give this object
- [@lock/from](/reference/sharpmush-help/sharplock/#lockdrop) - Who can give things to this object
- [@lock/pay](/reference/sharpmush-help/sharplock/#lockdrop) - Who can give pennies to/buy from this object
- [@lock/receive](/reference/sharpmush-help/sharplock/#lockdrop) - What things can be given to this object
- [@lock/follow](/reference/sharpmush-help/sharplock/#lockfollow) - Who can follow this object

### Control, filter and ownership lock types

Further standard lock types:

- [@lock/examine](/reference/sharpmush-help/sharplock/#lockcontrol) - Who can examine this object if it's VISUAL
- [@lock/chzone](/reference/sharpmush-help/lock-zone-command/#chzone-lock) - Who can @chzone to this object if it's a ZMO
- [@lock/forward](/reference/sharpmush-help/sharplock/#lockfollow) - Who can @forwardlist a message to this object 
- [@lock/filter](/reference/sharpmush-help/sharplock/#lockfilter) - Controls if the message %0 should be filtered
- [@lock/infilter](/reference/sharpmush-help/sharplock/#lockfilter) - Controls if the message %0 should be infiltered
- [@lock/control](/reference/sharpmush-help/sharplock/#lockcontrol) - Who can control this object (only if set; non-player)
- [@lock/dropto](/reference/sharpmush-help/sharplock/#lockfollow) - Who can trigger this container's drop-to.
- [@lock/destroy](/reference/sharpmush-help/sharplock/#lockcontrol) - Who can destroy this object if it's DESTROY_OK
- [@lock/interact](/reference/sharpmush-help/sharplock/#lockpage) - Who can send sound (say/pose/emit/etc) to this object
- [@lock/take](/reference/sharpmush-help/sharplock/#lockdrop) - Who can get things contained in this object
- [@lock/mailforward](/reference/sharpmush-help/sharplock/#lockpage) - Who can forward mail to this object via @mailforward
- [@lock/chown](/reference/sharpmush-help/lock-zone-command/#chown-lock) - Who can @chown this CHOWN_OK object?


::: seealso
- [LOCKING](/reference/sharpmush-help/locking/#locking)
- [@lset](/reference/sharpmush-help/sharpcmd/#lset)
- [@CHANNEL CLOCK](/reference/sharpmush-help/channel-clock-command/#channel-clock)
- [failure](/reference/sharpmush-help/failure/#failure)
:::

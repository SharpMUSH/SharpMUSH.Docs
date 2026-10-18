# Sharpie documentation illustrations

Sharpie introduces the major documentation categories and package guides. Each scene shows a clear physical action: opening a curtain, turning a page, tuning a radio, pinning a post or fitting a reusable part. Keep instructions and navigation as live text; the illustrations are decorative.

## Category coverage

| Sidebar category | Entry page | Scene |
| --- | --- | --- |
| About SharpMUSH | `about/what-is` | Building a small world |
| Run a Game | `guides/get-started` | Placing stepping stones toward a doorway |
| Web Portal | `guides/web-portal` | Selecting a room tile in a portal window |
| Look and Access | `guides/visual-layouts` | Adjusting a visual/audio preference slider |
| Write Softcode | `guides/packages` | Taking a reusable block from a package |
| Extend the Server | `guides/plugins` | Fitting a plugin piece into its socket |
| Packages | `guides/package-library` | Unpacking reusable building blocks |
| Reference | `reference/features` | Taking a book from a reference shelf |

The homepage keeps its world-building hero, and the header keeps the canonical SharpMUSH M logo. Generated command/function help entries are not decorated.

## Package coverage

| Group or system | Guide | Action |
| --- | --- | --- |
| Essentials | `guides/game-help` | Turning a help-book page |
| Scenes | `guides/scenes` | Opening the curtain on a shared scene |
| Characters | `guides/character-applications` | Stamping a character card |
| Community | `guides/who-where` | Placing a connection marker on a room map |
| Staff | `guides/jobs` | Checking a request on a clipboard |
| MUD clients | `guides/mud-clients` | Operating a terminal mirrored to a phone |
| Radio | `guides/radio` | Turning the tuning dial |
| Wiki Reader | `guides/wiki-reader` | Following and turning an article page |
| Bulletin Boards | `guides/bboards` | Pinning a post |
| Line Editor | `guides/line-editor` | Editing a line with a pencil |

## Rendering rules

- Keep headings, instructions and links in HTML; images contain no required information.
- Use empty alternative text for these decorative placements. The guide wrapper is also hidden from assistive technology.
- Preserve native alpha. These were generated transparent, not extracted or matted from opaque art.
- Keep pure-white fur opaque. Do not recolor it for dark mode or apply CSS color filters.
- Keep guide images compact: at most 28rem wide and 12rem tall, with `object-fit: contain`. No background panels or cover crops.
- Load guide art lazily with responsive sizes and intrinsic dimensions. Starlight loads the homepage hero eagerly.
- Review light/dark and mobile layouts, full silhouettes, paw-to-object contact, limb counts and alpha edges. Reject anatomy defects and cropped ears.

## Provenance

Generated with the built-in OpenAI image generation tool using the approved Sharpie identity preview and the initial documentation illustration style as references. `provenance.json` records source PNG hashes, actions, dimensions and export details. Each WebP is lossless and was checked for exact RGBA equality with its generated PNG.

The generation briefs require the ink/mint/pure-white palette, a readable forehead M, a rounded muzzle, genuine transparency, complete silhouettes and a physical interaction with the subject. The older static drafts and abandoned atlas background-removal experiments are not used.

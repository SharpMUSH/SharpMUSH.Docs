# Sharpie documentation illustrations

Sharpie introduces the major documentation categories and package guides. Each scene shows a clear physical action: opening a curtain, turning a page, tuning a radio, pinning a post or fitting a reusable part. Keep instructions and navigation as live text; the illustrations are decorative.

## Category coverage

| Sidebar category | Entry page | Scene |
| --- | --- | --- |
| About SharpMUSH | `about/what-is` | Answering a question with a connected-world diagram |
| Run a Game | `guides/get-started` | Placing stepping stones toward a doorway |
| Web Portal | `guides/web-portal` | Selecting a room tile in a portal window |
| Look and Access | `guides/visual-layouts` | Adjusting a visual/audio preference slider |
| Write Softcode | `guides/packages` | Taking a reusable block from a package |
| Extend the Server | `guides/plugins` | Fitting a plugin piece into its socket |
| Packages | `guides/package-library` | Sorting closed packages into a library shelf |
| Reference | `reference/features` | Taking a book from a reference shelf |

The homepage has its own welcoming Sharpie portrait and introduces Sharpie's name in live text. The header keeps the canonical SharpMUSH M logo. Each of the 19 placements has a distinct image; do not reuse a scene across pages. Generated command/function help entries are not decorated.

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
- Draw Sharpie with flat ink, mint and white regions, without blended fur shading. The welcoming paw has a feline palm pad and four toe pads.
- Use the approved mint green `#00DDB3`, dark ink `#17333E` and white as the color authority. Props may use discrete lighter or darker green-mint tones to distinguish their parts. Reject cyan/blue drift in forehead marks, eyes, tail tips, haunch markings and props; reference the approved logo directly on every generative pass. Do not globally reduce an entire scene to three colors; refine the illustrations generatively instead of using palette normalization.
- Keep the lower body consistent: compact feline haunches, short dark hind legs and rounded white sock paws. Ground-facing paws have a gently flattened sole and a short curved toe separator. Keep outlines and detail consistent with the forepaws; reject disconnected patches, pointed foot slivers and melted ankle joins. A seated cat still has only two forelegs and two hind legs; preserve natural occlusion behind props rather than adding feet to fill gaps.
- Keep guide images compact: at most 28rem wide and 12rem tall, with `object-fit: contain`. No background panels or cover crops.
- Load guide art lazily with responsive sizes and intrinsic dimensions. Starlight loads the homepage hero eagerly.
- Review light/dark and mobile layouts, full silhouettes, paw-to-object contact, limb counts and alpha edges. Reject anatomy defects and cropped ears.

## Provenance

Generated with the built-in OpenAI image generation tool using the approved Sharpie identity preview and the initial documentation illustration style as references. `provenance.json` records source PNG hashes, actions, dimensions and export details. Each WebP is lossless and was checked for exact RGBA equality with its generated PNG.

The generation briefs require the ink/mint/pure-white palette, a readable forehead M, a rounded muzzle, genuine transparency, complete silhouettes and a physical interaction with the subject. The older static drafts and abandoned atlas background-removal experiments are not used.

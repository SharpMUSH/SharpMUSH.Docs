# Guide pictures

Pictures for the pages under `src/content/docs`. `npm run check-content` checks the rules marked
**(checked)**.

## Diagrams

A diagram is an SVG file here, put on a page with a paragraph holding only the image:

```md
![How +config finds and changes a setting](../../../assets/guide/config-flow.svg)
```

`scripts/remark-inline-diagrams.js` copies the SVG into the page, so it draws with the site's
colours and changes with the light and dark themes. The image must be the only thing in its
paragraph, or it stays a plain image with no colours **(checked)**. The alt text becomes its label
for screen readers, so it cannot be empty. Each diagram's ids and `<style>` rules are scoped to it,
so short ids such as `a` are fine.

- Colour everything with the `--dg-*` tokens in `src/styles/diagrams.css`, never a hex, `rgb()`,
  `hsl()` or colour name **(checked)**. `style="fill:var(--dg-blue-fill);stroke:var(--dg-blue-line)"`
  works, and so does a rule in the diagram's `<style>`.
- A diagram's `<style>` holds plain rules only: no `@media`, `@keyframes` or comments, which the
  page would not scope to the diagram **(checked)**. The tokens already follow the theme.
- Neutrals, from background to foreground: `canvas`, `card`, `surface`, `line-soft`, `line`,
  `muted`, `text`.
- Five colour families: `green`, `blue`, `amber`, `red`, `purple`. Each has a `-fill` for a box's
  background, a `-line` for its border and arrows that should stand out, and an `-ink` for text
  on that fill. Keep red for refusals and failures.
- Text with no colour of its own draws in `--dg-text`.
- Give the root `<svg>` a `viewBox`, a `width` (the largest it is drawn) and
  `font-family="system-ui, sans-serif"`. The page's alt text is what a screen reader hears, so
  make it say what the picture shows.
- A picture of real colours, such as a theme's palette, stays an image: add its file name to
  `KEEP_AS_IMAGE` in the plugin.

## Screenshots

- WebP, taken in the portal's Ember theme at device scale 2, with the example game's data
  (Marrow, the Harbour Watch) rather than empty pages.
- Crop to the part of the screen the text talks about.
- Mark the parts with numbered circles, and explain each number in a numbered list under the
  picture.
- Alt text says what the picture shows, not "screenshot" **(checked)**.
- Every file here is used by a page **(checked)**.

## Game output

Show what the game prints as text in a code block, never a screenshot: readers copy it, search
finds it, and it reads the same in both themes. Start each line the player types with `> `.

## Asides

Keep the steps in the main text. An aside is for something a reader would regret missing:
`caution` or `danger` for lost data, a security hole or a step that cannot be undone, `tip` for a
shortcut, `note` for a side fact. Give each one a title that states it.

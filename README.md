# SharpMUSH Documentation

The official documentation website for SharpMUSH, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## 🎯 Overview

This documentation site automatically pulls help files from the main [SharpMUSH repository](https://github.com/SharpMUSH/SharpMUSH) using Git submodules and converts them to a modern, searchable web interface.

## 🚀 Quick Start

```bash
# Clone with submodules
git clone --recursive https://github.com/SharpMUSH/SharpMUSH.Docs.git
cd SharpMUSH.Docs

# Install dependencies
npm install

# Start development server (auto-converts docs)
npm run dev
```

## � Project Structure

```
.
├── SharpMUSH-submodule/           # Git submodule to main repository
├── scripts/
│   ├── convert-docs.js            # Documentation converter
│   └── README.md                  # Converter documentation
├── src/
│   ├── content/
│   │   └── docs/
│   │       └── reference/
│   │           └── sharpmush-help/ # Auto-generated from submodule
│   └── assets/
├── .github/workflows/             # CI/CD for automatic updates
├── astro.config.mjs
└── package.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).

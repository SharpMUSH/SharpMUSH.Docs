# Documentation Conversion Scripts

This directory contains scripts for automatically converting SharpMUSH documentation from the Git submodule into Starlight-compatible format.

## Files

### `convert-docs.js`

Converts markdown files from the SharpMUSH submodule into Starlight-compatible documentation with:

- **Frontmatter generation**: Adds Starlight-compatible YAML frontmatter with title and description
- **Link conversion**: Converts PennMUSH-style internal links (`[help TOPIC|DISPLAY]`) to Starlight navigation links
- **Automatic categorization**: Intelligently maps help topics to appropriate documentation files

#### Link Conversion Examples

- `[help ATTRIBUTE FLAGS|attribute flags]` → `[attribute flags](/reference/sharpmush-help/pennattr/#attribute-flags)`
- `[help @set|@set]` → `[@set](/reference/sharpmush-help/penncmd/#set)`
- `[help nearby()|nearby()]` → `[nearby()](/reference/sharpmush-help/pennfunc/#nearby)`
- `[attribute flags2]` → `[attribute flags2](/reference/sharpmush-help/pennattr/#attribute-flags2)`
- `[nearby()]` → `[nearby()](/reference/sharpmush-help/pennfunc/#nearby)`

### Exclusions

The converter intelligently excludes certain patterns from conversion:

- **Code blocks**: Content inside ``` fenced blocks and `backticks` is preserved
- **Function calls**: `[get(obj/attr)]`, `[function(arg1,arg2)]` are not converted
- **Paths and URLs**: Links containing `/`, `#`, `$`, `&` are skipped
- **Short patterns**: Single characters or very short strings (unless starting with @ or &)
- **Numbers**: Pure numeric content like `[123]` is ignored
- **Existing markdown**: Already converted links with `](` are skipped

#### Document Mapping

The script automatically categorizes topics into appropriate documents:

- **pennattr**: Attribute-related topics (ATTRIBUTE FLAGS, ATTRIBUTE TREES, etc.)
- **penncmd**: Commands (topics starting with @)
- **pennfunc**: Functions (topics ending with ())
- **pennflag**: Flag-related topics
- **pennlock**: Lock-related topics
- **pennmail**: Mail system topics
- **pennchat**: Chat/channel topics
- **pennevents**: Event system topics
- **pennhttp**: HTTP-related topics
- **pennpueb**: Pueblo client topics
- **pennconf**: Configuration and other topics (fallback)

## Usage

### Manual Conversion

```bash
npm run convert-docs
```

### Update Submodule and Convert

```bash
npm run update-submodule
npm run convert-docs
```

### Automatic Conversion

The conversion runs automatically during:

- `npm run dev` (development server)
- `npm run build` (production build)
- `npm run start` (development server)

## Configuration

To modify the conversion behavior, edit the following sections in `convert-docs.js`:

- **DOC_MAPPINGS**: Add or modify topic-to-document mappings
- **convertInternalLinks()**: Modify link conversion patterns
- **addFrontmatter()**: Customize frontmatter generation

## Troubleshooting

### Submodule Not Found

If you get an error about the source directory not being found:

```bash
git submodule init
git submodule update
```

### Link Conversion Issues

If internal links aren't converting properly:

1. Check the topic name in the source markdown
2. Verify the mapping in `DOC_MAPPINGS`
3. Ensure the target document exists in the output directory

### Build Failures

If the build fails during conversion:

1. Ensure Node.js version 16+ is installed
2. Check that all source files are valid markdown
3. Verify file permissions in the output directory
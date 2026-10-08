#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBMODULE_DOCS_PATH = path.join(__dirname, '..', 'SharpMUSH-submodule', 'SharpMUSH.Documentation', 'Helpfiles', 'SharpMUSH');
const OUTPUT_DOCS_PATH = path.join(__dirname, '..', 'src', 'content', 'docs', 'reference', 'sharpmush-help');

// Mapping of internal link patterns to Starlight-compatible links
const LINK_MAPPINGS = {
  // Pattern: [help ATTRIBUTE FLAGS|ATTRIBUTE FLAGS] -> /reference/sharpmush-help/sharpattr/#attribute-flags
  // Pattern: [help @set|@set] -> /reference/sharpmush-help/sharpcmd/#set (for commands)
  // Pattern: [help nearby()|nearby()] -> /reference/sharpmush-help/sharpfunc/#nearby (for functions)
};

// Known file titles based on filenames
const FILE_TITLES = {
  'sharptop.md': 'Top-Level Topics',
  'sharpattr.md': 'Attributes',
  'sharpchat.md': 'Chat and Channels',
  'sharpcmd.md': 'Commands',
  'sharpcode.md': 'Coding and Programming',
  'sharpconf.md': 'Configuration',
  'sharpevents.md': 'Events',
  'sharpflag.md': 'Flags',
  'sharpfunc.md': 'Functions',
  'sharphttp.md': 'HTTP Features',
  'sharplock.md': 'Locks',
  'sharpmail.md': 'Mail System',
  'sharppueb.md': 'Pueblo Client',
  'sharpwiki.md': 'Wiki',
  'markdown.md': 'Markdown',
};

// Load document mappings from JSON file
let DOC_MAPPINGS = {};

async function loadDocMappings() {
  try {
    const mappingsPath = path.join(__dirname, 'doc-mappings.json');
    const mappingsData = await fs.readFile(mappingsPath, 'utf-8');
    const parsed = JSON.parse(mappingsData);
    DOC_MAPPINGS = parsed.mappings || {};
    console.log(`Loaded ${Object.keys(DOC_MAPPINGS).length} header mappings from doc-mappings.json`);
  } catch (error) {
    console.warn('Could not load doc-mappings.json, using fallback logic:', error.message);
    console.warn('Run "node scripts/index-headers.js" to generate mappings.');
    DOC_MAPPINGS = {};
  }
}

// The id each topic heading gets on its page, by page and topic: a heading whose slug an earlier
// heading on the same page already took gets -1, -2, ..., as the site's own heading ids do, so
// @THEME after THEME() on one page links to its own heading. Aliases share their topic's id.
let TOPIC_ANCHORS = {};

export function topicAnchors(pages) {
  const anchors = {};
  for (const [doc, content] of Object.entries(pages)) {
    const occurrences = new Map();
    const idFor = (text) => {
      const slug = createSlugFromTitle(text);
      let id = slug;
      while (occurrences.has(id)) {
        occurrences.set(slug, occurrences.get(slug) + 1);
        id = `${slug}-${occurrences.get(slug)}`;
      }
      occurrences.set(id, 0);
      return id;
    };
    const topics = (anchors[doc] = {});
    let fenced = false;
    let topic = null;
    for (const raw of content.split('\n')) {
      const line = raw.replace(/\r$/, '');
      if (/^[ \t]*```/.test(line)) fenced = !fenced;
      if (fenced) { topic = null; continue; }
      const heading = line.match(/^(#{1,6}) (.+)/);
      if (!heading) { topic = null; continue; }
      const text = heading[2].trim();
      if (heading[1] === '#' && topic) {
        // An alias right under its topic, removed when the page is converted.
        topics[text.toUpperCase()] ??= topic;
        continue;
      }
      const id = idFor(text);
      topic = heading[1] === '#' ? id : null;
      if (topic) topics[text.toUpperCase()] ??= id;
    }
  }
  return anchors;
}

export function useLinkData({ mappings = DOC_MAPPINGS, anchors = TOPIC_ANCHORS } = {}) {
  DOC_MAPPINGS = mappings;
  TOPIC_ANCHORS = anchors;
}

function createSlugFromTitle(title) {
  return title.toLowerCase()
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[@]/g, '') // Remove @ symbols
    .replace(/[^a-z0-9\s-]/g, '') // Remove other special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export function convertInternalLinks(content) {
  // Split content into sections, preserving code blocks
  const sections = [];
  let currentIndex = 0;
  
  // Find all code: fenced blocks, then inline spans of any backtick run length (``a`b``),
  // skipping an escaped backtick (socket\`connect), which opens no span.
  const codeBlockPattern = /^[ \t]*```[\s\S]*?^[ \t]*```[^\n]*$|(?<![\\`])(`+)(?!`)[^\n]*?[^`\n]\1(?!`)/gm;
  let match;
  
  while ((match = codeBlockPattern.exec(content)) !== null) {
    // Add text before the code block
    if (match.index > currentIndex) {
      sections.push({
        type: 'text',
        content: content.slice(currentIndex, match.index)
      });
    }
    
    // Add the code block (unchanged)
    sections.push({
      type: 'code',
      content: match[0]
    });
    
    currentIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last code block
  if (currentIndex < content.length) {
    sections.push({
      type: 'text',
      content: content.slice(currentIndex)
    });
  }
  
  // Process only text sections for link conversion
  const processedSections = sections.map(section => {
    if (section.type === 'code') {
      return section.content; // Return code unchanged
    }
    
    let textContent = section.content;
    
    // Pattern 1: [help TOPIC|DISPLAY] or [help TOPIC]
    const helpLinkPattern = /\[help\s+([^\]|]+?)(\|([^\]]+?))?\]/gi;
    textContent = textContent.replace(helpLinkPattern, (match, topic, pipe, display) => {
      const displayText = display || topic;
      return convertTopicToLink(topic, displayText);
    });
    
    // Pattern 2: Simple [TOPIC] links - but be more selective
    const simpleLinkPattern = /\[([^\]]+?)\]/g;
    textContent = textContent.replace(simpleLinkPattern, (match, topic) => {
      // Skip if this looks like it's already a markdown link
      if (topic.includes('](') || topic.includes('http') || match.includes('](')) {
        return match;
      }
      
      // Skip common non-help patterns
      if (topic.match(/^\d+$/) || topic.length < 2) {
        return match;
      }
      
      // Skip function calls and other code-like patterns
      if (topic.includes('(') && topic.includes(')')) {
        // But allow function names that are likely help topics
        if (!topic.match(/^\w+\(\)$/)) {
          return match;
        }
      }
      
      // Skip patterns that contain special characters that suggest they're not help topics
      // A known topic with a switch, such as [@THEME/LIST], is still a link.
      if (topic.includes('/') && DOC_MAPPINGS[topic.toUpperCase().trim()]) {
        return convertTopicToLink(topic, topic);
      }
      if (topic.includes('/') || topic.includes('#') || topic.includes('$') || topic.includes('&') || topic.includes('*')) {
        return match;
      }
      
      // Skip single character or very short topics that are likely not help references
      if (topic.length < 3 && !topic.match(/^[@&]/)) {
        return match;
      }
      
      return convertTopicToLink(topic, topic);
    });
    
    return textContent;
  });
  
  return processedSections.join('');
}

function convertTopicToLink(topic, displayText) {
  const topicUpper = topic.toUpperCase().trim();
  
  // Find the appropriate document for this topic
  let targetDoc = DOC_MAPPINGS[topicUpper];
  
  // If not found in mappings, try to guess based on naming patterns
  if (!targetDoc) {
    if (topicUpper.includes('()') || topicUpper.endsWith('()')) {
      targetDoc = 'sharpfunc';
    } else if (topicUpper.startsWith('@')) {
      targetDoc = 'sharpcmd';
    } else if (topicUpper.includes('ATTRIBUTE') || topicUpper.includes('ATTR')) {
      targetDoc = 'sharpattr';
    } else if (topicUpper.includes('FLAG')) {
      targetDoc = 'sharpflag';
    } else if (topicUpper.includes('LOCK')) {
      targetDoc = 'sharplock';
    } else if (topicUpper.includes('MAIL')) {
      targetDoc = 'sharpmail';
    } else if (topicUpper.includes('CHAT') || topicUpper.includes('CHANNEL')) {
      targetDoc = 'sharpchat';
    } else if (topicUpper.includes('EVENT')) {
      targetDoc = 'sharpevents';
    } else if (topicUpper.includes('HTTP')) {
      targetDoc = 'sharphttp';
    } else if (topicUpper.includes('PUEBLO')) {
      targetDoc = 'sharppueb';
    } else if (topicUpper.includes('REGEX')) {
      targetDoc = 'sharpconf';
    } else if (topicUpper.includes('VERB')) {
      targetDoc = 'sharpcmd';
    } else {
      targetDoc = 'sharpconf'; // Default fallback
    }
  }
  
  const slug = TOPIC_ANCHORS[targetDoc]?.[topicUpper] ?? createSlugFromTitle(topic);
  const link = `/reference/sharpmush-help/${targetDoc}/${slug ? '#' + slug : ''}`;
  
  return `[${displayText}](${link})`;
}

function convertHeadingLevels(content) {
  // Remove alias headers (consecutive # headers where subsequent ones are aliases)
  // Split content into lines to process aliases
  const lines = content.split('\n');
  const processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    
    // Check if this is a # header (handle Windows line endings with \r)
    if (currentLine.match(/^# .+/)) {
      // Keep the first header in a sequence
      processedLines.push(currentLine);
      
      // Skip any immediately following # headers (these are aliases)
      while (i + 1 < lines.length && lines[i + 1].match(/^# .+/)) {
        i++; // Skip the alias
      }
    } else {
      processedLines.push(currentLine);
    }
  }
  
  content = processedLines.join('\n');
  
  // First convert ## H2 tags to ### H3 tags
  content = content.replace(/^## (.+)/gm, '### $1');
  
  // Then convert # H1 tags to ## H2 tags
  content = content.replace(/^# (.+)/gm, '## $1');
  
  return content;
}

function addFrontmatter(content, filename) {
  // A topic collection keeps its known title; a single-topic file is named by its first heading
  // (already lowered to ##), so the sidebar reads "Layout Functions" rather than "layout-functions".
  const firstHeading = content.match(/^## (.+)/m)?.[1].replace(/\r$/, '');
  let title = FILE_TITLES[filename] || firstHeading || filename.replace('.md', '');
  // A single topic that shares its name with a collection ("Functions") is that topic's overview.
  if (!FILE_TITLES[filename] && Object.values(FILE_TITLES).includes(title)) title = `${title} Overview`;
  
  // Clean and escape title for YAML
  title = title
    .trim()
    .replace(/\r?\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/"/g, '\\"'); // Escape quotes
  
  // Use simple string format for YAML to avoid issues
  const frontmatter = `---
title: "${title}"
description: "SharpMUSH documentation for ${title}"
---

`;
  
  return frontmatter + content;
}

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function convertFile(sourceFile, targetFile) {
  try {
    console.log(`Converting ${sourceFile} -> ${targetFile}`);
    
    let content = await fs.readFile(sourceFile, 'utf-8');
    
    // Convert heading levels (H1 -> H2, H2 -> H3) and remove aliases
    content = convertHeadingLevels(content);
    
    // Convert internal links
    content = convertInternalLinks(content);
    
    // Add Starlight frontmatter
    content = addFrontmatter(content, path.basename(sourceFile));
    
    // Ensure target directory exists
    await ensureDirectoryExists(path.dirname(targetFile));
    
    // Write converted content
    await fs.writeFile(targetFile, content, 'utf-8');
    
    console.log(`✓ Converted ${path.basename(sourceFile)}`);
  } catch (error) {
    console.error(`✗ Error converting ${sourceFile}:`, error.message);
    throw error;
  }
}

// Build alias map from source files
async function buildAliasMap() {
  const files = await fs.readdir(SUBMODULE_DOCS_PATH);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  const aliasMap = {}; // Maps page -> "alias-slug" -> "main-topic-slug"; an alias is only an alias on its own page
  
  for (const file of markdownFiles) {
    const filePath = path.join(SUBMODULE_DOCS_PATH, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const aliases = (aliasMap[file.replace(/\.md$/, '')] = {});
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if this is a # header (handle Windows line endings)
      if (line.match(/^# .+/)) {
        // Extract the header text
        const mainTopic = line.substring(2).trim().replace(/\r$/, '');
        const mainSlug = createSlugFromTitle(mainTopic);
        
        // Check for consecutive aliases
        let j = i + 1;
        while (j < lines.length && lines[j].match(/^# .+/)) {
          const aliasTopic = lines[j].substring(2).trim().replace(/\r$/, '');
          const aliasSlug = createSlugFromTitle(aliasTopic);
          
          // Map alias to main topic
          aliases[aliasSlug] = mainSlug;
          
          j++;
        }
        
        // Skip past the aliases we just processed
        i = j - 1;
      }
    }
  }
  
  return aliasMap;
}

// Fix links in a file that point to removed aliases
async function fixAliasLinksInFile(filePath, aliasMap) {
  let content = await fs.readFile(filePath, 'utf-8');
  
  // Pattern: [text](/reference/sharpmush-help/filename/#anchor)
  const linkPattern = /\[([^\]]+)\]\(\/reference\/sharpmush-help\/([^#)]+)#([^)]+)\)/g;
  
  const newContent = content.replace(linkPattern, (match, linkText, filename, anchor) => {
    // Check if this anchor is an alias that should be replaced
    const page = filename.replace(/\/$/, '');
    const aliases = aliasMap[page] ?? {};
    // An anchor that is a topic's own heading on that page stays, even when an alias elsewhere on it slugs the same.
    const headings = new Set(Object.values(TOPIC_ANCHORS[page] ?? {}));
    if (Object.hasOwn(aliases, anchor) && !headings.has(anchor)) {
      const newAnchor = aliases[anchor];
      return `[${linkText}](/reference/sharpmush-help/${filename}#${newAnchor})`;
    }
    return match;
  });
  
  if (newContent !== content) {
    await fs.writeFile(filePath, newContent, 'utf-8');
  }
}

async function convertAllDocs() {
  try {
    console.log('Starting documentation conversion...');
    console.log(`Source: ${SUBMODULE_DOCS_PATH}`);
    console.log(`Target: ${OUTPUT_DOCS_PATH}`);
    
    // Load document mappings
    await loadDocMappings();
    
    // Ensure source directory exists
    try {
      await fs.access(SUBMODULE_DOCS_PATH);
    } catch {
      console.error(`Source directory not found: ${SUBMODULE_DOCS_PATH}`);
      console.error('Make sure the git submodule is properly initialized.');
      process.exit(1);
    }
    
    // Get list of markdown files in source directory
    const files = await fs.readdir(SUBMODULE_DOCS_PATH);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    const pages = {};
    for (const file of markdownFiles) {
      pages[file.replace(/\.md$/, '')] = await fs.readFile(path.join(SUBMODULE_DOCS_PATH, file), 'utf-8');
    }
    TOPIC_ANCHORS = topicAnchors(pages);
    
    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in source directory');
      return;
    }
    
    console.log(`Found ${markdownFiles.length} markdown files to convert`);
    
    // Convert each file
    for (const file of markdownFiles) {
      const sourceFile = path.join(SUBMODULE_DOCS_PATH, file);
      const targetFile = path.join(OUTPUT_DOCS_PATH, file);
      
      await convertFile(sourceFile, targetFile);
    }
    
    console.log(`\n✅ Successfully converted ${markdownFiles.length} files`);
    
    // Fix links that point to removed aliases
    console.log('\nFixing links to removed aliases...');
    const aliasMap = await buildAliasMap();
    console.log(`Found ${Object.values(aliasMap).reduce((n, aliases) => n + Object.keys(aliases).length, 0)} aliases to check`);
    
    for (const file of markdownFiles) {
      const targetFile = path.join(OUTPUT_DOCS_PATH, file);
      await fixAliasLinksInFile(targetFile, aliasMap);
    }
    
    console.log('✅ Links updated');
    console.log(`📁 Output directory: ${OUTPUT_DOCS_PATH}`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exit(1);
  }
}

// Run the conversion
if (process.argv[1] === __filename) {
  convertAllDocs();
}

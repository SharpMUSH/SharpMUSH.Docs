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

function createSlugFromTitle(title) {
  return title.toLowerCase()
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[@]/g, '') // Remove @ symbols
    .replace(/[^a-z0-9\s-]/g, '') // Remove other special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function convertInternalLinks(content) {
  // Split content into sections, preserving code blocks
  const sections = [];
  let currentIndex = 0;
  
  // Find all code blocks (``` fenced blocks and single backticks)
  const codeBlockPattern = /```[\s\S]*?```|`[^`\n]*`/g;
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
      if (topic.includes('/') || topic.includes('#') || topic.includes('$') || topic.includes('&')) {
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
  
  const slug = createSlugFromTitle(topic);
  const link = `/reference/sharpmush-help/${targetDoc}/${slug ? '#' + slug : ''}`;
  
  return `[${displayText}](${link})`;
}

function convertHeadingLevels(content) {
  // First convert ## H2 tags to ### H3 tags
  content = content.replace(/^## (.+)$/gm, '### $1');
  
  // Then convert # H1 tags to ## H2 tags
  content = content.replace(/^# (.+)$/gm, '## $1');
  
  return content;
}

function addFrontmatter(content, filename) {
  // Use filename-based title instead of extracting from headers
  let title = FILE_TITLES[filename] || filename.replace('.md', '');
  
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
    
    // Convert heading levels (H1 -> H2, H2 -> H3)
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
    console.log(`📁 Output directory: ${OUTPUT_DOCS_PATH}`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exit(1);
  }
}

// Run the conversion
convertAllDocs();
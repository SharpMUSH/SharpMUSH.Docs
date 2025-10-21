#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBMODULE_DOCS_PATH = path.join(__dirname, '..', 'SharpMUSH-submodule', 'SharpMUSH.Documentation', 'Helpfiles', 'SharpMUSH');
const OUTPUT_MAPPING_PATH = path.join(__dirname, 'doc-mappings.json');

async function extractHeaders(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const headers = [];
  
  // Extract all headers (# and ##)
  const headerPattern = /^#+\s+(.+)$/gm;
  let match;
  
  while ((match = headerPattern.exec(content)) !== null) {
    const headerText = match[1].trim();
    
    // Skip very short headers or ones that look like special markers
    if (headerText.length > 1 && !headerText.match(/^[\\\`\-\=\+\*]+$/)) {
      headers.push(headerText);
    }
  }
  
  return headers;
}

function normalizeHeaderName(header) {
  // Convert header to uppercase and normalize common variations
  return header
    .toUpperCase()
    .trim()
    // Handle common patterns
    .replace(/^@/, '@')  // Preserve @ prefix
    .replace(/\(\)$/, '()') // Preserve function parentheses
    .replace(/\s+/g, ' '); // Normalize whitespace
}

function getDocumentKey(filename) {
  // Convert filename to document key (remove .md extension)
  return filename.replace('.md', '');
}

async function indexAllHeaders() {
  try {
    console.log('Indexing headers from documentation files...');
    console.log(`Source: ${SUBMODULE_DOCS_PATH}`);
    
    // Ensure source directory exists
    try {
      await fs.access(SUBMODULE_DOCS_PATH);
    } catch {
      console.error(`Source directory not found: ${SUBMODULE_DOCS_PATH}`);
      console.error('Make sure the git submodule is properly initialized.');
      process.exit(1);
    }
    
    // Get list of markdown files
    const files = await fs.readdir(SUBMODULE_DOCS_PATH);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in source directory');
      return;
    }
    
    const docMappings = {};
    const headerIndex = {};
    
    for (const file of markdownFiles) {
      const filePath = path.join(SUBMODULE_DOCS_PATH, file);
      const docKey = getDocumentKey(file);
      
      console.log(`Processing ${file}...`);
      
      try {
        const headers = await extractHeaders(filePath);
        
        console.log(`  Found ${headers.length} headers`);
        
        // Add each header to the mapping
        for (const header of headers) {
          const normalizedHeader = normalizeHeaderName(header);
          
          // Store the mapping
          docMappings[normalizedHeader] = docKey;
          
          // Also store in index for analysis
          if (!headerIndex[docKey]) {
            headerIndex[docKey] = [];
          }
          headerIndex[docKey].push({
            original: header,
            normalized: normalizedHeader
          });
        }
        
      } catch (error) {
        console.error(`  Error processing ${file}:`, error.message);
      }
    }
    
    // Generate comprehensive mappings object
    const mappingsData = {
      _metadata: {
        generatedAt: new Date().toISOString(),
        sourceFiles: markdownFiles,
        totalMappings: Object.keys(docMappings).length
      },
      mappings: docMappings,
      index: headerIndex
    };
    
    // Write the mappings file
    await fs.writeFile(OUTPUT_MAPPING_PATH, JSON.stringify(mappingsData, null, 2), 'utf-8');
    
    console.log(`\n✅ Successfully indexed ${Object.keys(docMappings).length} headers`);
    console.log(`📁 Mappings saved to: ${OUTPUT_MAPPING_PATH}`);
    
    // Display summary
    console.log('\n📊 Summary by document:');
    for (const [docKey, headers] of Object.entries(headerIndex)) {
      console.log(`  ${docKey}: ${headers.length} headers`);
    }
    
    // Show some example mappings
    console.log('\n🔗 Example mappings:');
    const exampleMappings = Object.entries(docMappings).slice(0, 10);
    for (const [header, doc] of exampleMappings) {
      console.log(`  "${header}" → ${doc}`);
    }
    
    if (Object.keys(docMappings).length > 10) {
      console.log(`  ... and ${Object.keys(docMappings).length - 10} more`);
    }
    
  } catch (error) {
    console.error('❌ Indexing failed:', error.message);
    process.exit(1);
  }
}

// Run the indexing
indexAllHeaders();
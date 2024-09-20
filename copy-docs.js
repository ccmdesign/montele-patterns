// copy-docs.js

const fs = require('fs-extra');
const path = require('path');

// Define source and destination directories
const SOURCE_DIR = path.join(__dirname, '_src', '_includes/patterns');
const DEST_DIR = path.join(__dirname, '_src', 'pages/patterns');

// Define the glob pattern for matching files
const GLOB_PATTERN = '**/*-doc.html';

/**
 * Copies files matching the GLOB_PATTERN from SOURCE_DIR to DEST_DIR.
 * Preserves the directory structure and removes files from DEST_DIR that no longer exist in SOURCE_DIR.
 */
async function copyDocs() {
  try {
    console.log('Starting pre-build: Copying documentation files...');

    // Ensure the destination directory exists
    await fs.ensureDir(DEST_DIR);

    // Use glob to find matching files
    const glob = require('glob');
    const sourceFiles = glob.sync(GLOB_PATTERN, { cwd: SOURCE_DIR, nodir: true });
    const destFiles = glob.sync(GLOB_PATTERN, { cwd: DEST_DIR, nodir: true });

    if (sourceFiles.length === 0) {
      console.warn('No documentation files found to copy.');
      return;
    }

    // Copy each file to the destination directory, preserving structure
    for (const file of sourceFiles) {
      const srcPath = path.join(SOURCE_DIR, file);
      const destPath = path.join(DEST_DIR, file);

      // Ensure the destination subdirectory exists
      await fs.ensureDir(path.dirname(destPath));

      // Copy the file
      await fs.copy(srcPath, destPath);
      console.log(`Copied: ${file}`);
    }

    // Remove files from DEST_DIR that no longer exist in SOURCE_DIR
    for (const file of destFiles) {
      if (!sourceFiles.includes(file)) {
        const filePath = path.join(DEST_DIR, file);
        await fs.remove(filePath);
        console.log(`Removed: ${file}`);
      }
    }

    console.log('Documentation files processed successfully.');
  } catch (error) {
    console.error('Error during pre-build: Processing documentation files failed.');
    console.error(error);
    process.exit(1); // Exit with failure
  }
}

copyDocs();

#!/usr/bin/env node

// Since using a custom `babel.config.js` is breaking the builder-bob default configuration,
// using something like `babel-plugin-rewrite-module-path` is tricky, hence this hacky solution.

// The problem is that references to `package.json` are not rewritten
// from `../../package.json` to `../../../package.json`
// when files are generated in the `lib` directory.

const fs = require('fs');
const path = require('path');

// Specify the directory path
const rootDirectory = 'lib';

// Specify the text to replace and the replacement text
const searchText = '../../package.json';
const replacementText = '../../../package.json';

// Function to recursively process directories and files
const processDirectory = (directoryPath) => {
  fs.readdir(directoryPath, (readDirErr, files) => {
    if (readDirErr) {
      console.error(`Error reading directory ${directoryPath}:`, readDirErr);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (statErr, stat) => {
        if (statErr) {
          console.error(`Error checking file stats for ${filePath}:`, statErr);
          return;
        }

        if (stat.isDirectory()) {
          // If it's a directory, recursively process it
          processDirectory(filePath);
        } else {
          // If it's a file, read and update its content
          fs.readFile(filePath, 'utf8', (readFileErr, data) => {
            if (readFileErr) {
              console.error(`Error reading file ${filePath}:`, readFileErr);
              return;
            }

            // Perform the replacement
            const updatedContent = data.replace(
              new RegExp(searchText, 'g'),
              replacementText
            );

            // Check if the content has changed
            if (data !== updatedContent) {
              // Write the updated content back to the file
              fs.writeFile(filePath, updatedContent, 'utf8', (writeFileErr) => {
                if (writeFileErr) {
                  console.error(
                    `Error writing file ${filePath}:`,
                    writeFileErr
                  );
                  return;
                }
                console.log(`Replacement successful for file: ${filePath}`);
              });
            }
          });
        }
      });
    });
  });
};

// Start processing from the root directory
processDirectory(rootDirectory);

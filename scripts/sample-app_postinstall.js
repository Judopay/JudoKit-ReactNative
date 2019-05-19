#!/usr/bin/env node

/*
 * Using libraries within sample-app and linking them within packages.json like:
 * "react-native-library-name": "file:../"
 * will cause problems with the metro bundler if the sample-app will run via
 * `react-native run-[ios|android]`. This will result in an error as the metro
 * bundler will find multiple versions for the same module while resolving it.
 * The reason for that is that if the library is installed it also copies in the
 * sample-app folder itself as well as the node_modules folder of the library
 * although their are defined in .npmignore and should be ignored in theory.
 *
 * This postinstall script removes the node_modules folder as well as all
 * entries from the library's .npmignore file within the sample-app node_modules
 * folder after the library was installed. This should resolve the metro
 * bundler issue mentioned above.
 *
 * It is expected that this script lives in the library's root folder within a
 * scripts folder. As first parameter the relative path to the library's
 * folder within the sample-app node_modules folder should be provided.
 * The sample-app's package.json entry could look like:
 * "postinstall": "node ../scripts/sample-app_postinstall.js node_modules/judo-react-native/"
 */

"use strict";

const fs = require("fs");
const path = require("path");

/// Delete all files and directories for the given path
const removeFileDirectoryRecursively = fileDirPath => {
  // Remove file
  if (!fs.lstatSync(fileDirPath).isDirectory()) {
    fs.unlinkSync(fileDirPath);
    return;
  }

  // Go down the directory an remove each file / directory recursively
  fs.readdirSync(fileDirPath).forEach(entry => {
    const entryPath = path.join(fileDirPath, entry);
    removeFileDirectoryRecursively(entryPath);
  });
  fs.rmdirSync(fileDirPath);
};

/// Remove sample-app/node_modules/judo-react-native/node_modules directory
const removeLibraryNodeModulesPath = libraryNodeModulesPath => {
  const nodeModulesPath = path.resolve(libraryNodeModulesPath, "node_modules");

  if (!fs.existsSync(nodeModulesPath)) {
    console.log(
      `No node_modules path found at ${nodeModulesPath}. Skipping delete.`
    );
    return;
  }

  console.log(`Deleting: ${nodeModulesPath}`);
  try {
    removeFileDirectoryRecursively(nodeModulesPath);
    console.log(`Successfully deleted: ${nodeModulesPath}`);
  } catch (err) {
    console.log(`Error deleting ${nodeModulesPath}: ${err.message}`);
  }
};

/// Remove all entries from the .npmignore within  sample-app/node_modules/judo-react-native/
const removeLibraryNpmIgnorePaths = (npmIgnorePath, libraryNodeModulesPath) => {
  if (!fs.existsSync(npmIgnorePath)) {
    console.log(
      `No .npmignore path found at ${npmIgnorePath}. Skipping deleting content.`
    );
    return;
  }

  fs.readFileSync(npmIgnorePath, "utf8")
    .split(/\r?\n/)
    .forEach(entry => {
      if (entry.length === 0) {
        return;
      }

      const npmIgnoreLibraryNodeModulesEntryPath = path.resolve(
        libraryNodeModulesPath,
        entry
      );
      if (!fs.existsSync(npmIgnoreLibraryNodeModulesEntryPath)) {
        return;
      }

      console.log(`Deleting: ${npmIgnoreLibraryNodeModulesEntryPath}`);
      try {
        removeFileDirectoryRecursively(npmIgnoreLibraryNodeModulesEntryPath);
        console.log(
          `Successfully deleted: ${npmIgnoreLibraryNodeModulesEntryPath}`
        );
      } catch (err) {
        console.log(
          `Error deleting ${npmIgnoreLibraryNodeModulesEntryPath}: ${
            err.message
          }`
        );
      }
    });
};

// Main start sweeping process
(() => {
  // Read out dir of example project
  const sampleAppDir = process.cwd();

  // Relative libraries path within the examples node_modules directory
  const relativeLibraryNodeModulesPath = process.argv[2];
  const libraryNodeModulesPath = path.resolve(
    sampleAppDir,
    relativeLibraryNodeModulesPath
  );

  removeLibraryNodeModulesPath(libraryNodeModulesPath);

  const npmIgnorePath = path.resolve(__dirname, "../.npmignore");
  removeLibraryNpmIgnorePaths(npmIgnorePath, libraryNodeModulesPath);
})();

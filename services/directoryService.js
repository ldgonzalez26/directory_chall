const Directory = require('../components/directory');
class DirectoryService {
  constructor(root) {
    this.root = root;
  }

  /**
   * Creates a new directory at the specified path.
   * @param {string} path - The path where the new directory should be created.
   */
  create(path) {
    const parts = path.split('/');
    let current = this.root;
    for (const part of parts) {
      if (!current.subdirectories[part]) {
        current.subdirectories[part] = new Directory(part);
      }
      current = current.subdirectories[part];
    }
  }

  /**
   * Moves a directory from sourcePath to destinationPath.
   * @param {string} sourcePath - The path of the directory to move.
   * @param {string} destinationPath - The path where the directory should be moved.
   * @returns {boolean} True if the move was successful, false otherwise.
   */
  move(sourcePath, destinationPath) {
    const { sourceDirName, sourceParentDir } = this.getSourceDetails(sourcePath);

    if (!sourceParentDir || !sourceParentDir.subdirectories[sourceDirName]) {
      console.log(`Cannot move ${sourcePath} - ${sourceParentPath} does not exist`);
      return false;
    }
    const sourceDir = sourceParentDir.subdirectories[sourceDirName];
    let destinationDir = !destinationPath || destinationPath === 'root' ? this.root : this.getDirectory(destinationPath);

    if (!destinationDir) {
      console.log(`Cannot move ${sourcePath} to ${destinationPath} - invalid path`);
      return false;
    }
    destinationDir.subdirectories[sourceDirName] = sourceDir;
    delete sourceParentDir.subdirectories[sourceDirName];
    return true;
  }

  /**
   * Deletes the directory at the specified path.
   * @param {string} path - The path of the directory to delete.
   * @returns {boolean} True if the deletion was successful, false otherwise.
   */
  delete(path) {
    const { sourceDirName, sourceParentDir } = this.getSourceDetails(path);
    if (!sourceParentDir || !sourceParentDir.subdirectories[sourceDirName]) {
      console.log(`Cannot delete ${path} - ${sourceParentDir ? path : sourceParentDir} does not exist`);
      return false;
    }

    delete sourceParentDir.subdirectories[sourceDirName];
    return true;
  }

  /**
   * Retrieves the directory at the specified path.
   * @param {string} path - The path of the directory to retrieve.
   * @returns {Directory|null} The directory at the specified path, or null if it doesn't exist.
   */

  getDirectory(path) {
    if (path === '') return this.root;
    const parts = path.split('/');
    let current = this.root;
    for (const part of parts) {
      if (current.subdirectories[part]) {
        current = current.subdirectories[part];
      } else {
        return null;
      }
    }
    return current;
  }

  /**
   * Lists the directories recursively with indentation.
   * @param {number} [indent=0] - The indentation level (default is 0).
   * @returns {string[]} An array of directory names with indentation.
   */
  listDirectories(indent = 0) {
    return this.root.listDirectories(indent);
  }

  /**
   * Helper method to extract source details from the path.
   * @param {string} path - The path of the directory.
   * @returns {Object} An object containing sourceDirName and sourceParentDir.
   */
  getSourceDetails(path) {
    const parts = path.split('/');
    const sourceDirName = parts.pop();
    const sourceParentPath = parts.join('/');
    const sourceParentDir = this.getDirectory(sourceParentPath);
    return { sourceDirName, sourceParentDir };
  }
}

module.exports = DirectoryService;

/**
 * Directory class representing a single directory in the directory tree.
 */
class Directory {
  constructor(name) {
    /**
     * The name of the directory.
     * @type {string}
     */
    this.name = name;

    /**
     * The subdirectories of this directory.
     * @type {Object.<string, Directory>}
     */
    this.subdirectories = {};
  }
  /**
   * Lists the directories recursively with indentation.
   * @param {number} [indent=0] - The indentation level (default is 0).
   * @returns {string[]} An array of directory names with indentation.
   */
  listDirectories(indent = 0) {
    const lines = [];
    for (const name of Object.keys(this.subdirectories).sort()) {
      lines.push(' '.repeat(indent) + name);
      lines.push(...this.subdirectories[name].listDirectories(indent + 2));
    }
    return lines;
  }
}

module.exports = Directory;

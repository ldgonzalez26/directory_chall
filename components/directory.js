class Directory {
  constructor(name) {
    this.name = name;
    this.subdirectories = {};
  }

  create(path) {
    const parts = path.split('/');
    let current = this;
    for (const part of parts) {
      if (!current.subdirectories[part]) {
        current.subdirectories[part] = new Directory(part);
      }
      current = current.subdirectories[part];
    }
  }

  move(sourcePath, destinationPath) {
    const sourceParts = sourcePath.split('/');

    const sourceDir = this.getDirectory(sourceParts.slice(0, -1).join('/'));
    const destDir = this.getDirectory(destinationPath);

    if (!sourceDir || !destDir) {
      return false;
    }

    const sourceName = sourceParts.at(-1);
    const sourceSubdir = sourceDir.subdirectories[sourceName];
    if (!sourceSubdir) {
      return false;
    }

    destDir.subdirectories[sourceName] = sourceSubdir;
    delete sourceDir.subdirectories[sourceName];
    return true;
  }

  delete(path) {
    const parts = path.split('/');
    const parentDir = this.getDirectory(parts.slice(0, -1).join('/'));
    if (!parentDir) {
      return false;
    }

    const dirToDelete = parts.at(-1);
    if (parentDir.subdirectories[dirToDelete]) {
      delete parentDir.subdirectories[dirToDelete];
      return true;
    }
    return false;
  }

  getDirectory(path) {
    if (path === '') return this;
    const parts = path.split('/');
    let current = this;
    for (const part of parts) {
      if (current.subdirectories[part]) {
        current = current.subdirectories[part];
      } else {
        return null;
      }
    }
    return current;
  }

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

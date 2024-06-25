const { readCommands } = require('./utils/readCommands');
const DirectoryTree = require('./components/directoryTree');
const DirectoryService = require('./services/directoryService');
const Directory = require('./components/directory');

// Initialize the root directory and directory service
const rootDirectory = new Directory('root');
const directoryService = new DirectoryService(rootDirectory);

// Initialize the directory tree with the directory service
const tree = new DirectoryTree(directoryService);

// Read commands and execute them
const commands = readCommands('commands.txt');
tree.run(commands);

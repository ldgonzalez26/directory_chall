const { readCommands } = require('./utils/readCommands');
const DirectoryTree = require('./components/directoryTree');

const commands = readCommands('commands.txt');

const tree = new DirectoryTree();
tree.run(commands);

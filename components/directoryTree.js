const Directory = require('./directory');

class DirectoryTree {
  constructor() {
    this.root = new Directory('root');
  }

  execute(command) {
    const [action, ...args] = command.split(' ');
    if (action === 'CREATE') {
      this.root.create(args[0]);
      console.log(`CREATE ${args[0]}`);
    } else if (action === 'MOVE') {
      const [source, destination] = args;
      console.log(`MOVE ${source} ${destination}`);
      if (!this.root.move(source, destination)) {
        console.log(`Cannot move ${source} to ${destination} - invalid path`);
      }
    } else if (action === 'DELETE') {
      console.log(`DELETE ${args[0]}`);
      if (!this.root.delete(args[0])) {
        console.log(`Cannot delete ${args[0]} - ${args[0]} does not exist`);
      }
    } else if (action === 'LIST') {
      console.log('LIST');
      console.log(this.root.listDirectories().join('\n'));
    }
  }

  run(commands) {
    commands.map((command) => this.execute(command));
  }
}

module.exports = DirectoryTree;

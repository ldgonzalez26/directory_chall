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
      if (!this.root.move(source, destination)) {
        console.log(`Cannot move ${source} to ${destination} - invalid path`);
      } else {
        console.log(`MOVE ${source} ${destination}`);
      }
    } else if (action === 'DELETE') {
      if (!this.root.delete(args[0])) {
        console.log(`Cannot delete ${args[0]} - ${args[0]} does not exist`);
      } else {
        console.log(`DELETE ${args[0]}`);
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

const Directory = require('./directory');

class DirectoryTree {
  constructor() {
    this.root = new Directory('root');
  }

  execute(command) {
    const [action, ...args] = command.split(' ');
    switch (action) {
      case 'CREATE':
        this.root.create(args[0]);
        console.log(`CREATE ${args[0]}`);
        break;
      case 'MOVE':
        const [source, destination] = args;
        console.log(`MOVE ${source} ${destination}`);
        if (!this.root.move(source, destination)) {
          console.log(`Cannot move ${source} to ${destination} - invalid path`);
        }
        break;
      case 'DELETE':
        console.log(`DELETE ${args[0]}`);
        this.root.delete(args[0]);
        break;
      case 'LIST':
        console.log('LIST');
        console.log(this.root.listDirectories().join('\n'));
        break;
      default:
        console.log('ONLY CREATE, DELETE , MOVE , LIST ACTIONS ARE ACCEPTED');
        console.log(`Unknown action: ${action}`);
    }
  }

  run(commands) {
    commands.map((command) => this.execute(command));
  }
}

module.exports = DirectoryTree;

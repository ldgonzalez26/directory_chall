const Command = require('./Command');

/**
 * Command class for moving a directory.
 */
class MoveCommand extends Command {
  constructor(args, directoryService) {
    super(args);
    /**
     * The directory service to execute commands.
     * @type {DirectoryService}
     */
    this.directoryService = directoryService;
  }

  execute() {
    let [source, destination] = this.args;
    // check for root
    if (destination === undefined || destination === '') {
      destination = 'root';
    }
    console.log(`MOVE ${source} ${destination}`);
    this.directoryService.move(source, destination);
  }
}

module.exports = MoveCommand;

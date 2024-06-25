const Command = require('./Command');

/**
 * Command class for creating a directory.
 */
class CreateCommand extends Command {
  constructor(args, directoryService) {
    super(args);
    /**
     * The directory service to execute commands.
     * @type {DirectoryService}
     */
    this.directoryService = directoryService;
  }

  execute() {
    this.directoryService.create(this.args[0]);
    console.log(`CREATE ${this.args[0]}`);
  }
}
module.exports = CreateCommand;

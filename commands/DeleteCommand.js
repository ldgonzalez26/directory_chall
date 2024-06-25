const Command = require('./Command');

/**
 * Command class for deleting a directory.
 */
class DeleteCommand extends Command {
  constructor(args, directoryService) {
    super(args);
    /**
     * The directory service to execute commands.
     * @type {DirectoryService}
     */
    this.directoryService = directoryService;
  }

  execute() {
    console.log(`DELETE ${this.args[0]}`);
    this.directoryService.delete(this.args[0]);
  }
}
module.exports = DeleteCommand;

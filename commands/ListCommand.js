const Command = require('./Command');

/**
 * Command class for listing directories.
 */
class ListCommand extends Command {
  constructor(args, directoryService) {
    super(args);
    /**
     * The directory service to execute commands.
     * @type {DirectoryService}
     */
    this.directoryService = directoryService;
  }

  execute() {
    console.log('LIST');
    console.log(this.directoryService.listDirectories().join('\n'));
  }
}

module.exports = ListCommand;

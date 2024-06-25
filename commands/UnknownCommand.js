const Command = require('./Command');

/**
 * Command class for handling unknown commands.
 */
class UnknownCommand extends Command {
  constructor(action, args) {
    super(args);
    /**
     * The full command that was not recognized.
     * @type {string}
     */
    this.fullCommand = (action + ' ' + args).trim().split(/\s+/).join(' ');
  }

  execute() {
    console.log('ONLY CREATE, DELETE, MOVE, LIST COMMANDS ARE ACCEPTED');
    console.log(`Unknown command: ${this.fullCommand}`);
  }
}

module.exports = UnknownCommand;

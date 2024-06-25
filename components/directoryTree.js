const Directory = require('./directory');
const CreateCommand = require('../commands/CreateCommand');
const MoveCommand = require('../commands/MoveCommand');
const DeleteCommand = require('../commands/DeleteCommand');
const ListCommand = require('../commands/ListCommand');
const UnknownCommand = require('../commands/UnknownCommand');

/**
 * DirectoryTree class that manages a hierarchical directory structure.
 */

class DirectoryTree {
  constructor(directoryService) {
    /**
     * Injected directoryService
     * @type {directoryService}
     */
    this.directoryService = directoryService;
  }
  /**
   * Executes a single command on the directory tree.
   * @param {string} command - The command to execute.
   */
  execute(command) {
    const [action, ...args] = command.trim().split(/\s+/);
    const commandInstance = this.getCommandInstance(action, args);
    commandInstance.execute();
  }
  /**
   * Executes a list of commands on the directory tree.
   * @param {string[]} commands - The list of commands to execute.
   */
  run(commands) {
    commands.map((command) => this.execute(command));
  }

  /**
   * Returns the appropriate command instance based on the action.
   * @param {string} action - The action of the command.
   * @param {string[]} args - The arguments of the command.
   * @returns {Command} The command instance.
   */
  getCommandInstance(action, args) {
    switch (action) {
      case 'CREATE':
        return new CreateCommand(args, this.directoryService);
      case 'MOVE':
        return new MoveCommand(args, this.directoryService);
      case 'DELETE':
        return new DeleteCommand(args, this.directoryService);
      case 'LIST':
        return new ListCommand(args, this.directoryService);
      default:
        return new UnknownCommand(action, args);
    }
  }
}

module.exports = DirectoryTree;

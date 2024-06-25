/**
 * Base Command class that all specific command classes inherit from.
 */
class Command {
  constructor(args) {
    this.args = args;
  }

  /**
   * Executes the command.
   * This method must be implemented by subclasses.
   */
  execute() {
    throw new Error('Execute method must be implemented');
  }
}

module.exports = Command;

const DirectoryTree = require('../components/directoryTree');

describe('Directory Tree', () => {
  let consoleOutput = [];
  const originalLog = console.log;

  beforeEach(() => {
    consoleOutput = [];
    console.log = (message) => {
      consoleOutput.push(message);
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  const runTest = (commands, expectedOutput) => {
    const tree = new DirectoryTree();
    tree.run(commands);
    const cleanedOutput = consoleOutput
      .join('\n')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);
    const cleanedExpectedOutput = expectedOutput.map((line) => line.trim());
    expect(cleanedOutput).toEqual(cleanedExpectedOutput);
  };

  test('CREATE and LIST commands', () => {
    runTest(['CREATE fruits', 'CREATE fruits/apples', 'LIST'], ['CREATE fruits', 'CREATE fruits/apples', 'LIST', 'fruits', 'apples']);
  });

  test('MOVE command', () => {
    runTest(
      ['CREATE fruits', 'CREATE vegetables', 'CREATE fruits/apples', 'MOVE fruits/apples vegetables', 'LIST'],
      ['CREATE fruits', 'CREATE vegetables', 'CREATE fruits/apples', 'MOVE fruits/apples vegetables', 'LIST', 'fruits', 'vegetables', 'apples']
    );
  });

  test('DELETE command', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', 'DELETE fruits/apples', 'LIST'],
      ['CREATE fruits', 'CREATE fruits/apples', 'DELETE fruits/apples', 'LIST', 'fruits']
    );
  });

  test('Invalid DELETE command', () => {
    runTest(
      ['CREATE fruits', 'DELETE fruits/apples', 'LIST'],
      ['CREATE fruits', 'Cannot delete fruits/apples - fruits/apples does not exist', 'LIST', 'fruits']
    );
  });

  test('Invalid MOVE command', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples non_existent', 'LIST'],
      ['CREATE fruits', 'CREATE fruits/apples', 'Cannot move fruits/apples to non_existent - invalid path', 'LIST', 'fruits', 'apples']
    );
  });
});

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

  test('MOVE command to root', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples root', 'LIST'],
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples root', 'LIST', 'apples', 'fruits']
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
      ['CREATE fruits', 'DELETE fruits/apples', 'Cannot delete fruits/apples - fruits/apples does not exist', 'LIST', 'fruits']
    );
  });

  test('Invalid MOVE command', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples non_existent', 'LIST'],
      [
        'CREATE fruits',
        'CREATE fruits/apples',
        'MOVE fruits/apples non_existent',
        'Cannot move fruits/apples to non_existent - invalid path',
        'LIST',
        'fruits',
        'apples',
      ]
    );
  });

  test('CREATE command with leading, trailing, and multiple spaces', () => {
    runTest(
      ['   CREATE fruits', 'CREATE   fruits/apples', 'CREATE fruits/apples  ', 'CREATE    fruits/apples/fuji', 'LIST   '],
      ['CREATE fruits', 'CREATE fruits/apples', 'CREATE fruits/apples', 'CREATE fruits/apples/fuji', 'LIST', 'fruits', 'apples', 'fuji']
    );
  });

  test('MOVE command with leading, trailing, and multiple spaces', () => {
    runTest(
      ['CREATE fruits', 'CREATE vegetables', 'CREATE fruits/apples', '  MOVE fruits/apples  vegetables  ', 'LIST  '],
      ['CREATE fruits', 'CREATE vegetables', 'CREATE fruits/apples', 'MOVE fruits/apples vegetables', 'LIST', 'fruits', 'vegetables', 'apples']
    );
  });

  test('MOVE command to root with leading, trailing, and multiple spaces', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', '  MOVE fruits/apples  root', 'LIST  '],
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples root', 'LIST', 'apples', 'fruits']
    );
  });

  test('DELETE command with leading, trailing, and multiple spaces', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', '  DELETE fruits/apples  ', 'LIST  '],
      ['CREATE fruits', 'CREATE fruits/apples', 'DELETE fruits/apples', 'LIST', 'fruits']
    );
  });

  test('Unknown command with leading, trailing, and multiple spaces', () => {
    runTest(
      ['CREATE fruits', 'CREATE vegetables', '   INTRODUCE fruits   ', 'LIST'],
      [
        'CREATE fruits',
        'CREATE vegetables',
        'ONLY CREATE, DELETE, MOVE, LIST COMMANDS ARE ACCEPTED',
        'Unknown command: INTRODUCE fruits',
        'LIST',
        'fruits',
        'vegetables',
      ]
    );
  });

  test('MOVE command missing destination', () => {
    runTest(
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples', 'LIST'],
      ['CREATE fruits', 'CREATE fruits/apples', 'MOVE fruits/apples root', 'LIST', 'apples', 'fruits']
    );
  });
});

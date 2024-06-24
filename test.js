const test = 'vegetables';
const sourceParts = test.split('/');
console.log(sourceParts);
const sourceDir = sourceParts.slice(0, -1).join('/');
console.log('Hi', sourceDir);

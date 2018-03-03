const { assert } = require('chai');
const Parser = require('../../../src/parser');
const AST = require('../../../src/ast');

describe('Parser', () => {
  it('Should properly export the parser', () => {
    assert.isFunction(Parser);
  });

  it('Should properly parse the simple code', () => {
    const parser = new Parser('[a b] a + b');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.FunctionDeclaration);
    assert.instanceOf(ast.getArgumentsList(), AST.ArgumentsList);
    assert.instanceOf(ast.getExpression(), AST.BinaryOperator);
  });
});

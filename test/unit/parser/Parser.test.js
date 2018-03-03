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

  it('Should throw an error when source code is not valid', () => {
    const parser = new Parser('[first second wrong');

    assert.throws(
      () => parser.parse(),
      Error,
      'Unexpected token: Token(EOF,null) (expected to have RIGHT_BRACKET)'
    );
  });

  it('Should properly parse complex expression', () => {
    const parser = new Parser('[first second] 2 * (5 / first - 10)');
    const ast = parser.parse();
    const argumentsList = ast.getArgumentsList();
    const expression = ast.getExpression();

    assert.instanceOf(ast, AST.FunctionDeclaration);
    assert.instanceOf(argumentsList, AST.ArgumentsList);
    assert.instanceOf(expression, AST.BinaryOperator);
    assert.equal(argumentsList.getNode(0).getIdentifier(), 'first');
    assert.equal(argumentsList.getNode(1).getIdentifier(), 'second');
  });

  it('Should throw an error if wrong function declaration', () => {
    const parser = new Parser('first second');

    assert.throws(
      () => parser.parse(),
      Error,
      'Unexpected token: Token(VARIABLE,first) (expected to have LEFT_BRACKET)'
    );
  });

  it('Should throw an error if can not parse factor', () => {
    const parser = new Parser('[first second] )');

    assert.throws(
      () => parser.parse(),
      Error,
      'Unexpected token: Token(RIGHT_PARENTHESIS,)) (expected to have NUMBER, VARIABLE, LEFT_PARENTHESIS)'
    );
  });
});

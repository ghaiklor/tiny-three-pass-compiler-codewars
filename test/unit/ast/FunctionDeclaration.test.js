const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'foo');
const OPERATOR_PLUS_TOKEN = Token.create(Token.OPERATOR, '+');

const VARIABLE_IDENTIFIER_NODE = new AST.VariableIdentifier(VARIABLE_TOKEN);
const BINARY_OPERATOR_NODE = new AST.BinaryOperator(VARIABLE_IDENTIFIER_NODE, OPERATOR_PLUS_TOKEN, VARIABLE_IDENTIFIER_NODE);
const ARGUMENTS_LIST_NODE = new AST.ArgumentsList().pushNode(VARIABLE_IDENTIFIER_NODE);

describe('AST::FunctionDeclaration', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.FunctionDeclaration);
  });

  it('Should properly create node', () => {
    const node = new AST.FunctionDeclaration(ARGUMENTS_LIST_NODE, BINARY_OPERATOR_NODE);

    assert.instanceOf(node, AST.FunctionDeclaration);
    assert.instanceOf(node.getArgumentsList(), AST.ArgumentsList);
    assert.instanceOf(node.getExpression(), AST.BinaryOperator);
  });

  it('Should throw an error when setting not an ArgumentList node', () => {
    assert.throws(
      () => new AST.FunctionDeclaration('NOT_NODE'),
      Error,
      'Unexpected node: NOT_NODE'
    );
  });

  it('Should properly convert to string', () => {
    const node = new AST.FunctionDeclaration(ARGUMENTS_LIST_NODE, BINARY_OPERATOR_NODE);

    assert.equal(
      node.toString(),
      'FunctionDeclaration(' +
      '\nArgumentsList(' +
      '\n\tVariableIdentifier(foo)' +
      '\n)' +
      '\nBinaryOperator(' +
      '\n\tVariableIdentifier(foo)' +
      '\n\t+' +
      '\n\tVariableIdentifier(foo)' +
      '\n)' +
      '\n)'
    );
  });
});

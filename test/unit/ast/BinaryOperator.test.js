const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const NUMBER_TOKEN = Token.create(Token.NUMBER, '300');
const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'foo');
const OPERATOR_PLUS_TOKEN = Token.create(Token.OPERATOR, '+');

const NUMBER_LITERAL_NODE = new AST.NumberLiteral(NUMBER_TOKEN);
const VARIABLE_IDENTIFIER_NODE = new AST.VariableIdentifier(VARIABLE_TOKEN);
const BINARY_OPERATOR_NODE = new AST.BinaryOperator(NUMBER_LITERAL_NODE, OPERATOR_PLUS_TOKEN, VARIABLE_IDENTIFIER_NODE);

describe('AST::BinaryOperator', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.BinaryOperator);
  });

  it('Should properly create binary operator node and convert to string', () => {
    const node = new AST.BinaryOperator(NUMBER_LITERAL_NODE, OPERATOR_PLUS_TOKEN, VARIABLE_IDENTIFIER_NODE);

    assert.equal(
      node.toString(),
      'BinaryOperator(' +
      '\n\tNumberLiteral(300)' +
      '\n\t+' +
      '\n\tVariableIdentifier(foo)' +
      '\n)'
    )
  });

  it('Should properly create string representation when lhs and rhs are binary operators too', () => {
    const node = new AST.BinaryOperator(BINARY_OPERATOR_NODE, OPERATOR_PLUS_TOKEN, VARIABLE_IDENTIFIER_NODE);

    assert.equal(
      node.toString(),
      'BinaryOperator(' +
      '\n\tBinaryOperator(' +
      '\n\tNumberLiteral(300)' +
      '\n\t+' +
      '\n\tVariableIdentifier(foo)' +
      '\n)' +
      '\n\t+' +
      '\n\tVariableIdentifier(foo)' +
      '\n)'
    );
  });

  it('Should throw an error if some of arguments are missing', () => {
    assert.throws(
      () => new AST.BinaryOperator('NOT_NODE'),
      Error,
      'You need provide lhs, operator and rhs'
    );
  });

  it('Should throw an error if lhs or rhs are not nodes', () => {
    assert.throws(
      () => new AST.BinaryOperator('NOT_NODE', 'OPERATOR', 'NOT_NODE_2'),
      Error,
      'Unknown nodes: NOT_NODE, NOT_NODE_2'
    );
  });

  it('Should throw an error if operator is not a Token.OPERATOR', () => {
    assert.throws(
      () => new AST.BinaryOperator(NUMBER_LITERAL_NODE, VARIABLE_TOKEN, VARIABLE_IDENTIFIER_NODE),
      Error,
      'Unknown operator: Token(VARIABLE,foo)'
    );
  });
});

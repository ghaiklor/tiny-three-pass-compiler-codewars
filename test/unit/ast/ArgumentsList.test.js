const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const NUMBER_TOKEN = Token.create(Token.NUMBER, '200');
const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'bar');

const NUMBER_LITERAL_NODE = new AST.NumberLiteral(NUMBER_TOKEN);
const VARIABLE_IDENTIFIER_NODE = new AST.VariableIdentifier(VARIABLE_TOKEN);

describe('AST::ArgumentsList', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.ArgumentsList);
  });

  it('Should properly store arguments', () => {
    const node = new AST.ArgumentsList();

    assert.equal(node.getNodes().length, 0);
    assert.instanceOf(node.pushNode(VARIABLE_IDENTIFIER_NODE), AST.ArgumentsList);
    assert.equal(node.getNodes().length, 1);
    assert.instanceOf(node.pushNode(VARIABLE_IDENTIFIER_NODE), AST.ArgumentsList);
    assert.equal(node.getNodes().length, 2);
    assert.instanceOf(node.getNode(0), AST.VariableIdentifier);
    assert.instanceOf(node.getNode(1), AST.VariableIdentifier);
  });

  it('Should properly convert arguments list node to string', () => {
    const node = new AST.ArgumentsList();

    assert.instanceOf(node.pushNode(VARIABLE_IDENTIFIER_NODE), AST.ArgumentsList);
    assert.instanceOf(node.pushNode(VARIABLE_IDENTIFIER_NODE), AST.ArgumentsList);

    assert.equal(
      node.toString(),
      'ArgumentsList(' +
      '\n\tVariableIdentifier(bar)' +
      '\n\tVariableIdentifier(bar)' +
      '\n)'
    );
  });

  it('Should throw an error if wrong node is supplied', () => {
    const node = new AST.ArgumentsList();

    assert.throws(
      () => node.pushNode(NUMBER_LITERAL_NODE),
      Error,
      'Unknown node: NumberLiteral(200)'
    );
  });
});

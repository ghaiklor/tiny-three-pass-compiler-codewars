const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const NUMBER_TOKEN = Token.create(Token.NUMBER, '200');
const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'bar');

const NUMBER_LITERAL_NODE = new AST.NumberLiteral(NUMBER_TOKEN);
const VARIABLE_IDENTIFIER_NODE = new AST.VariableIdentifier(VARIABLE_TOKEN);

describe('AST::Compound', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.Compound);
  });

  it('Should properly store nodes in the compound', () => {
    const compound = new AST.Compound();

    assert.equal(compound.getNodes().length, 0);
    assert.instanceOf(compound.pushNode(NUMBER_LITERAL_NODE), AST.Compound);
    assert.equal(compound.getNodes().length, 1);
    assert.instanceOf(compound.pushNode(VARIABLE_IDENTIFIER_NODE), AST.Compound);
    assert.equal(compound.getNodes().length, 2);
    assert.instanceOf(compound.getNode(0), AST.NumberLiteral);
    assert.instanceOf(compound.getNode(1), AST.VariableIdentifier);
  });

  it('Should properly convert compound node to string', () => {
    const compound = new AST.Compound();

    assert.instanceOf(compound.pushNode(NUMBER_LITERAL_NODE), AST.Compound);
    assert.instanceOf(compound.pushNode(VARIABLE_IDENTIFIER_NODE), AST.Compound);

    assert.equal(
      compound.toString(),
      'Compound(' +
      '\n\tNumberLiteral(200)' +
      '\n\tVariableIdentifier(bar)' +
      '\n)'
    );
  });

  it('Should throw an error if trying to push not a node', () => {
    const compound = new AST.Compound();

    assert.throws(
      () => compound.pushNode('NOT_NODE'),
      Error,
      'Unexpected node: NOT_NODE'
    );
  })
});

const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const NUMBER_TOKEN = Token.create(Token.NUMBER, '200');
const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'foo');

describe('AST::VariableIdentifier', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.VariableIdentifier);
  });

  it('Should properly create node and convert into string', () => {
    const node = new AST.VariableIdentifier(VARIABLE_TOKEN);

    assert.instanceOf(node, AST.VariableIdentifier);
    assert.equal(node.toString(), 'VariableIdentifier(foo)');
  });

  it('Should throw an error if provided token is not variable', () => {
    assert.throws(
      () => new AST.VariableIdentifier(NUMBER_TOKEN),
      Error,
      `Unexpected token: Token(NUMBER,200)`
    );
  });
});

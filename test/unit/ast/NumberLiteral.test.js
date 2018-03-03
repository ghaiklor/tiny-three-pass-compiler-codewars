const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const NUMBER_TOKEN = Token.create(Token.NUMBER, '200');
const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'foo');

describe('AST::NumberLiteral', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.NumberLiteral);
  });

  it('Should properly create node and convert into string', () => {
    const node = new AST.NumberLiteral(NUMBER_TOKEN);

    assert.instanceOf(node, AST.NumberLiteral);
    assert.equal(node.toString(), 'NumberLiteral(200)');
  });

  it('Should throw an error if provided token is not number', () => {
    assert.throws(
      () => new AST.NumberLiteral(VARIABLE_TOKEN),
      Error,
      `Unexpected token: Token(VARIABLE,foo)`
    );
  });
});

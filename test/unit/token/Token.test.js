const { assert } = require('chai');
const Token = require('../../../src/token');

describe('Token', () => {
  it('Should properly export', () => {
    assert.isFunction(Token);
  });

  it('Should properly instantiate a token and convert to string', () => {
    const token = new Token(Token.LEFT_BRACKET, '[');

    assert.instanceOf(token, Token);
    assert.equal(token.toString(), 'Token(LEFT_BRACKET,[)');
  });

  it('Should properly check if the token is the same type', () => {
    const token = new Token(Token.LEFT_PARENTHESIS, '(');

    assert.instanceOf(token, Token);
    assert.ok(token.is(Token.LEFT_PARENTHESIS));
    assert.notOk(token.is(Token.RIGHT_PARENTHESIS));
  });

  it('Should properly create a token instance via static create', () => {
    const token = Token.create(Token.VARIABLE, 'foo');

    assert.instanceOf(token, Token);
    assert.equal(token.toString(), 'Token(VARIABLE,foo)');
  });

  it('Should have all the required token types', () => {
    assert.equal(Token.LEFT_PARENTHESIS, 'LEFT_PARENTHESIS');
    assert.equal(Token.RIGHT_PARENTHESIS, 'RIGHT_PARENTHESIS');
    assert.equal(Token.LEFT_BRACKET, 'LEFT_BRACKET');
    assert.equal(Token.RIGHT_BRACKET, 'RIGHT_BRACKET');
    assert.equal(Token.VARIABLE, 'VARIABLE');
    assert.equal(Token.NUMBER, 'NUMBER');
    assert.equal(Token.OPERATOR, 'OPERATOR');
    assert.equal(Token.EOF, 'EOF');
  });
});

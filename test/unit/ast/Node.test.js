const { assert } = require('chai');
const AST = require('../../../src/ast');
const Token = require('../../../src/token');

const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'foo');

describe('AST::Node', () => {
  it('Should properly export', () => {
    assert.isFunction(AST.Node);
  });

  it('Should properly instantiate and convert to string', () => {
    const node = new AST.Node(VARIABLE_TOKEN);

    assert.instanceOf(node, AST.Node);
    assert.equal(node.toString(), 'Node(Token(VARIABLE,foo))');
  });
});

const { assert } = require('chai');
const Visitor = require('../../../src/visitor');
const Token = require('../../../src/token');
const AST = require('../../../src/ast');

const NUMBER_TOKEN = Token.create(Token.NUMBER, '400');
const VARIABLE_TOKEN = Token.create(Token.VARIABLE, 'foo');
const OPERATOR_PLUS_TOKEN = Token.create(Token.OPERATOR, '+');
const NUMBER_LITERAL_NODE = new AST.NumberLiteral(NUMBER_TOKEN);
const BINARY_OPERATOR_NODE = new AST.BinaryOperator(NUMBER_LITERAL_NODE, OPERATOR_PLUS_TOKEN, NUMBER_LITERAL_NODE);
const VARIABLE_IDENTIFIER_NODE = new AST.VariableIdentifier(VARIABLE_TOKEN);

class EmptyVisitor extends Visitor {
}

class NumberVisitor extends EmptyVisitor {
  onNumberLiteral(node) {
    return node.getValue();
  }
}

class BinaryVisitor extends NumberVisitor {
  onBinaryOperator(node) {
    return this.visit(node.getLHS()) + this.visit(node.getRHS());
  }
}

describe('Visitor', () => {
  it('Should properly export', () => {
    assert.isFunction(Visitor);
  });

  it('Should properly handle the visitor when implementing the visitor as a sub-class', () => {
    const numberVisitor = new NumberVisitor();

    assert.equal(numberVisitor.visit(NUMBER_LITERAL_NODE), 400);
  });

  it('Should properly throw an error if no visitor for the node', () => {
    const emptyVisitor = new EmptyVisitor();

    assert.throws(
      () => emptyVisitor.visit(BINARY_OPERATOR_NODE),
      Error,
      'There is no visitor for BinaryOperator'
    );
  });

  it('Should properly visit BinaryOperator node with recursion into NumberLiteral', () => {
    const binaryVisitor = new BinaryVisitor();

    assert.equal(binaryVisitor.visit(BINARY_OPERATOR_NODE), 800);
  });

  it('Should properly visit VariableIdentifier with default handler', () => {
    const visitor = new EmptyVisitor();

    assert.equal(visitor.visit(VARIABLE_IDENTIFIER_NODE), 'foo');
  });
});

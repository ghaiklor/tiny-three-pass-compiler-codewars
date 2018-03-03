const Visitor = require('../visitor');
const AST = require('../ast');
const Token = require('../token');

/**
 * Implements simple pipeline for constant folding optimization.
 *
 * @class
 * @extends Visitor
 */
class ConstantFolding extends Visitor {
  /**
   * Triggers when BinaryOperator node is visiting.
   *
   * @param {BinaryOperator} node
   * @returns {NumberLiteral}
   */
  onBinaryOperator(node) {
    let lhs = this.visit(node.getLHS());
    let rhs = this.visit(node.getRHS());
    let operator = node.getOperator();

    if (lhs instanceof AST.NumberLiteral) {
      lhs = this.visit(lhs);
    }

    if (rhs instanceof AST.NumberLiteral) {
      rhs = this.visit(rhs);
    }

    if ((typeof lhs !== 'number') || (typeof rhs !== 'number')) {
      return node;
    }

    if (operator === '+') {
      const number = Token.create(Token.NUMBER, lhs + rhs);
      return new AST.NumberLiteral(number);
    } else if (operator === '-') {
      const number = Token.create(Token.NUMBER, lhs - rhs);
      return new AST.NumberLiteral(number);
    } else if (operator === '*') {
      const number = Token.create(Token.NUMBER, lhs * rhs);
      return new AST.NumberLiteral(number);
    } else {
      const number = Token.create(Token.NUMBER, lhs / rhs);
      return new AST.NumberLiteral(number);
    }
  }

  /**
   * Triggers when FunctionDeclaration is visiting.
   *
   * @param {FunctionDeclaration} node
   * @returns {FunctionDeclaration}
   */
  onFunctionDeclaration(node) {
    const argumentsList = node.getArgumentsList();
    const expression = this.visit(node.getExpression());

    return new AST.FunctionDeclaration(argumentsList, expression);
  }
}

module.exports = ConstantFolding;

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
    let lhs = node.getLHS();
    let rhs = node.getRHS();
    let operator = node.getOperator();

    lhs = lhs instanceof AST.BinaryOperator ? this.visit(lhs) : lhs;
    rhs = rhs instanceof AST.BinaryOperator ? this.visit(rhs) : rhs;

    if (lhs instanceof AST.NumberLiteral && rhs instanceof AST.NumberLiteral) {
      if (operator === '+') {
        const number = Token.create(Token.NUMBER, this.visit(lhs) + this.visit(rhs));
        return new AST.NumberLiteral(number);
      } else if (operator === '-') {
        const number = Token.create(Token.NUMBER, this.visit(lhs) - this.visit(rhs));
        return new AST.NumberLiteral(number);
      } else if (operator === '*') {
        const number = Token.create(Token.NUMBER, this.visit(lhs) * this.visit(rhs));
        return new AST.NumberLiteral(number);
      } else {
        const number = Token.create(Token.NUMBER, this.visit(lhs) / this.visit(rhs));
        return new AST.NumberLiteral(number);
      }
    }

    return new AST.BinaryOperator(lhs, node.getToken(), rhs);
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

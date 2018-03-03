const Node = require('./Node');
const Token = require('../token');

/**
 * Implement node that holds binary operators.
 *
 * @class
 * @extends Node
 */
class BinaryOperator extends Node {
  /**
   * Creates binary operator node.
   *
   * @param {Node} lhs Left hand statement
   * @param {Token} operator Token.OPERATOR
   * @param {Node} rhs Right hand statement
   */
  constructor(lhs, operator, rhs) {
    if (!lhs || !operator || !rhs) {
      throw new Error(`You need provide lhs, operator and rhs`);
    }

    if (!(lhs instanceof Node) || !(rhs instanceof Node)) {
      throw new Error(`Unknown nodes: ${lhs.toString()}, ${rhs.toString()}`);
    }

    if (!operator.is(Token.OPERATOR)) {
      throw new Error(`Unknown operator: ${operator}`);
    }

    super(operator);

    this._lhs = lhs;
    this._operator = operator.getValue();
    this._rhs = rhs;
  }

  /**
   * Get left hand statement of binary operator.
   *
   * @returns {Node}
   */
  getLHS() {
    return this._lhs;
  }

  /**
   * Get operator that applies to the node.
   *
   * @returns {String}
   */
  getOperator() {
    return this._operator;
  }

  /**
   * Get right hand statement of binary operator.
   *
   * @returns {Node}
   */
  getRHS() {
    return this._rhs;
  }

  /**
   * Returns string representation of binary operator.
   *
   * @returns {String}
   */
  toString() {
    return `${this.constructor.name}(\n\t${this.getLHS().toString()}\n\t${this.getOperator()}\n\t${this.getRHS().toString()}\n)`;
  }
}

module.exports = BinaryOperator;

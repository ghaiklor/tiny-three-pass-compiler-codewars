const Node = require('./Node');
const Token = require('../token');

/**
 * Simple node that represents number literals in syntax tree.
 *
 * @class
 * @extends Node
 */
class NumberLiteral extends Node {
  /**
   * Creates NumberLiteral instance.
   *
   * @param {Token} token Token.NUMBER
   */
  constructor(token) {
    if (!token.is(Token.NUMBER)) {
      throw new Error(`Unexpected token: ${token}`);
    }

    super(token);

    this._value = parseInt(token.getValue(), 10);
  }

  /**
   * Get decimal number from the node that represents number.
   *
   * @returns {Number}
   */
  getValue() {
    return this._value;
  }

  /**
   * Returns string representation of the node.
   *
   * @returns {String}
   */
  toString() {
    return `${this.constructor.name}(${this.getValue()})`;
  }
}

module.exports = NumberLiteral;

const Node = require('./Node');
const Token = require('../token');

/**
 * Implements node that holds variable identifier.
 *
 * @class
 * @extends Node
 */
class VariableIdentifier extends Node {
  /**
   * Creates variable identifier node.
   *
   * @param {Token} token Token.VARIABLE
   */
  constructor(token) {
    if (!token.is(Token.VARIABLE)) {
      throw new Error(`Unexpected token: ${token}`);
    }

    super(token);

    this._identifier = token.getValue();
  }

  /**
   * Returns identifier of the variable.
   *
   * @returns {String}
   */
  getIdentifier() {
    return this._identifier;
  }

  /**
   * Converts node to string representation.
   *
   * @returns {String}
   */
  toString() {
    return `${this.constructor.name}(${this.getIdentifier()})`;
  }
}

module.exports = VariableIdentifier;

/**
 * Basic node for creating others.
 *
 * @class
 */
class Node {
  /**
   * Creates basic node instance with assigned token to it.
   *
   * @param {Token} token
   */
  constructor(token) {
    this._token = token;
  }

  /**
   * Get token assigned to the node.
   *
   * @returns {Token}
   */
  getToken() {
    return this._token;
  }

  /**
   * Converts node to string representation.
   *
   * @returns {String}
   */
  toString() {
    return `${this.constructor.name}(${this.getToken().toString()})`;
  }
}

module.exports = Node;

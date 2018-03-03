const Node = require('./Node');
const ArgumentsList = require('./ArgumentsList');

/**
 * Implement node that stores function declarations.
 *
 * @class
 * @extends Node
 */
class FunctionDeclaration extends Node {
  /**
   * Creates function node.
   *
   * @param {ArgumentsList} argumentsList
   * @param {Node} expression
   */
  constructor(argumentsList, expression) {
    super(null);

    if (!(argumentsList instanceof ArgumentsList)) {
      throw new Error(`Unexpected node: ${argumentsList.toString()}`);
    }

    this._argumentsList = argumentsList;
    this._expression = expression;
  }

  /**
   * Get list of arguments of the function.
   *
   * @returns {ArgumentsList}
   */
  getArgumentsList() {
    return this._argumentsList;
  }

  /**
   * Get expression of the function.
   *
   * @returns {Node}
   */
  getExpression() {
    return this._expression;
  }

  /**
   * Converts function node to string representation.
   *
   * @returns {String}
   */
  toString() {
    return `${this.constructor.name}(\n${this.getArgumentsList().toString()}\n${this.getExpression().toString()}\n)`;
  }
}

module.exports = FunctionDeclaration;

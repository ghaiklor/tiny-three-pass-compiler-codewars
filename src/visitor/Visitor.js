/**
 * Implements basic visitor pattern.
 *
 * @class
 */
class Visitor {
  /**
   * Calls an appropriate callback based on node type (visits the node).
   *
   * @param {Node} node
   */
  visit(node) {
    const name = node.constructor.name;
    const visitor = this[`on${name}`];

    if (typeof visitor !== 'function') {
      throw new Error(`There is no visitor for ${name}`);
    }

    return visitor.call(this, node);
  }

  /**
   * Triggers when NumberLiteral node is visiting.
   *
   * @param {NumberLiteral} node
   * @returns {*}
   */
  onNumberLiteral(node) {
    return node.getValue();
  }

  /**
   * Triggers when VariableIdentifier node is visiting.
   *
   * @param {VariableIdentifier} node
   * @returns {*}
   */
  onVariableIdentifier(node) {
    return node.getIdentifier();
  }
}

module.exports = Visitor;

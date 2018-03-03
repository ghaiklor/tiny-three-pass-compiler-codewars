const Node = require('./Node');

/**
 * Implement basic node for such nodes that has few nodes as an array.
 *
 * @class
 * @extends Node
 */
class Compound extends Node {
  /**
   * Creates empty compound node.
   */
  constructor() {
    super(null);

    this._nodes = [];
  }

  /**
   * Pushes one node into compound.
   *
   * @param {Node} node
   */
  pushNode(node) {
    if (!(node instanceof Node)) {
      throw new Error(`Unexpected node: ${node.toString()}`);
    }

    this._nodes.push(node);

    return this;
  }

  /**
   * Get specific node from the compound by its index.
   *
   * @param {Number} index Index of node in the compound
   * @returns {Node}
   */
  getNode(index) {
    return this._nodes[index];
  }

  /**
   * Get a full array of nodes stored in the compound.
   *
   * @returns {Array<Node>}
   */
  getNodes() {
    return this._nodes;
  }

  /**
   * Converts compound node to string representation.
   *
   * @returns {String}
   */
  toString() {
    return `${this.constructor.name}(\n\t${this.getNodes().map(node => node.toString()).join('\n\t')}\n)`;
  }
}

module.exports = Compound;

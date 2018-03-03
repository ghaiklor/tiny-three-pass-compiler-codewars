const Compound = require('./Compound');
const VariableIdentifier = require('./VariableIdentifier');

/**
 * Implement node that stores arguments of a function as variable identifiers in array.
 *
 * @class
 * @extends Compound
 */
class ArgumentsList extends Compound {
  /**
   * Adds VariableIdentifier node to compound.
   *
   * @param {Node} node
   */
  pushNode(node) {
    if (!(node instanceof VariableIdentifier)) {
      throw new Error(`Unknown node: ${node.toString()}`);
    }

    return super.pushNode(node);
  }
}

module.exports = ArgumentsList;

const Visitor = require('../visitor');

/**
 * Implements code generation phase.
 *
 * @class
 * @extends Visitor
 */
class Codegen extends Visitor {
  /**
   * Creates new instance of codegen with empty symbol table.
   */
  constructor() {
    super();

    this._symbolTable = {};
    this._code = [];
  }

  /**
   * Get symbol table.
   *
   * @returns {Object}
   */
  getSymbolTable() {
    return this._symbolTable;
  }

  /**
   * Emits one instruction (push it into the sequence of assembly op codes).
   *
   * @param {String} instruction Assembly instruction
   * @returns {Codegen}
   */
  emit(instruction) {
    this._code.push(instruction);
    return this;
  }

  /**
   * Triggers when ArgumentsList node is met.
   *
   * @param {ArgumentsList} node
   */
  onArgumentsList(node) {
    const symbolTable = this.getSymbolTable();
    const variables = node.getNodes();

    for (let i = 0; i < variables.length; i++) {
      symbolTable[variables[i].getIdentifier()] = i;
    }
  }

  /**
   * Triggers when BinaryOperator node is met.
   *
   * @param {BinaryOperator} node
   */
  onBinaryOperator(node) {
    const lhs = node.getLHS();
    const operator = node.getOperator();
    const rhs = node.getRHS();

    this.visit(lhs);
    this.emit(Codegen.SW());
    this.visit(rhs);

    switch (operator) {
      case '-':
        this.emit(Codegen.SU());
        break;
      case '+':
        this.emit(Codegen.AD());
        break;
      case '*':
        this.emit(Codegen.MU());
        break;
      case '/':
        this.emit(Codegen.DI());
        break;
    }
  }

  /**
   * Triggers when FunctionDeclaration node is met.
   *
   * @param {FunctionDeclaration} node
   * @returns {Array<String>}
   */
  onFunctionDeclaration(node) {
    this.visit(node.getArgumentsList());
    this.visit(node.getExpression());
  }

  /**
   * Triggers when NumberLiteral node is met.
   *
   * @param {NumberLiteral} node
   * @returns {String}
   */
  onNumberLiteral(node) {
    this.emit(Codegen.IM(node.getValue()));
  }

  /**
   * Triggers when VariableIdentifier node is met.
   *
   * @param {VariableIdentifier} node
   */
  onVariableIdentifier(node) {
    const symbolTable = this.getSymbolTable();
    const identifier = node.getIdentifier();

    if (typeof symbolTable[identifier] === 'undefined') {
      throw new Error(`Unknown variable: ${identifier}`);
    }

    this.emit(Codegen.AR(symbolTable[identifier]));
  }

  /**
   * Converts current codegen phase to string representation.
   *
   * @returns {String}
   */
  toString() {
    return this._code.join('\n');
  }

  /**
   * Load the constant value n into R0.
   *
   * @static
   * @param {Number} n Constant value (number literal)
   * @returns {String}
   */
  static IM(n) {
    return `IM ${n}`;
  }

  /**
   * Load the n-th input argument into R0.
   *
   * @static
   * @param {Number} n Arguments index
   * @returns {String}
   */
  static AR(n) {
    return `AR ${n}`;
  }

  /**
   * Swap R0 and R1.
   *
   * @static
   * @returns {String}
   */
  static SW() {
    return 'SW';
  }

  /**
   * Push R0 onto the stack.
   *
   * @static
   * @returns {String}
   */
  static PU() {
    return 'PU';
  }

  /**
   * Pop the top value off of the stack into R0.
   *
   * @static
   * @returns {String}
   */
  static PO() {
    return 'PO';
  }

  /**
   * Add R1 to R0 and put the result in R0.
   *
   * @static
   * @returns {String}
   */
  static AD() {
    return 'AD';
  }

  /**
   * Subtract R1 from R0 and put the result in R0.
   *
   * @static
   * @returns {String}
   */
  static SU() {
    return 'SU';
  }

  /**
   * Multiply R0 by R1 and put the result in R0.
   *
   * @static
   * @returns {String}
   */
  static MU() {
    return 'MU';
  }

  /**
   * Divide R0 by R1 and put the result in R0.
   *
   * @static
   * @returns {String}
   */
  static DI() {
    return 'DI';
  }
}

module.exports = Codegen;

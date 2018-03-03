/**
 * Implements Token structure for storing information about lexical units.
 *
 * @class
 */
class Token {
  /**
   * Creates new instance of a token.
   *
   * @param {String} type Type of a token from {@link Token} statics
   * @param {String} value Character(s) from the program
   */
  constructor(type, value) {
    this._type = type;
    this._value = value;
  }

  /**
   * Get type of a token.
   *
   * @returns {String} Returns string representation of a token name
   */
  getType() {
    return this._type;
  }

  /**
   * Get value of a token.
   *
   * @returns {String} Returns a character(s) from the source code of a program
   */
  getValue() {
    return this._value;
  }

  /**
   * Check if tokens type is the same as you provided in argument.
   *
   * @param {String} type Token type from static getters of a token
   * @returns {Boolean} Return true if token is the same type
   */
  is(type) {
    return this.getType() === type;
  }

  /**
   * Converts token structure into string representation.
   *
   * @returns {String}
   */
  toString() {
    return `Token(${this.getType()},${this.getValue()})`;
  }

  /**
   * Creates new instance of a token.
   *
   * @static
   * @param {String} type Type of a token from {@link Token} statics
   * @param {String} value Character(s) from the program
   */
  static create(type, value) {
    return new this(type, value);
  }

  /**
   * Returns type of a token that represents "(".
   *
   * @static
   * @returns {String}
   */
  static get LEFT_PARENTHESIS() {
    return 'LEFT_PARENTHESIS';
  }

  /**
   * Returns type of a token that represents ")".
   *
   * @static
   * @returns {String}
   */
  static get RIGHT_PARENTHESIS() {
    return 'RIGHT_PARENTHESIS';
  }

  /**
   * Returns type of a token that represents "[".
   *
   * @static
   * @returns {String}
   */
  static get LEFT_BRACKET() {
    return 'LEFT_BRACKET';
  }

  /**
   * Returns type of a token that represents "]".
   *
   * @static
   * @returns {String}
   */
  static get RIGHT_BRACKET() {
    return 'RIGHT_BRACKET';
  }

  /**
   * Returns type of a token that represents variable identifiers: "isAlpha", "foo", etc.
   *
   * @static
   * @returns {String}
   */
  static get VARIABLE() {
    return 'VARIABLE';
  }

  /**
   * Returns type of a token that represents numbers: "120", "50", etc.
   *
   * @static
   * @returns {String}
   */
  static get NUMBER() {
    return 'NUMBER';
  }

  /**
   * Returns type of a token that represents mathematical operator: "+", "-", "*", "/".
   *
   * @static
   * @returns {String}
   */
  static get OPERATOR() {
    return 'OPERATOR';
  }
}

module.exports = Token;

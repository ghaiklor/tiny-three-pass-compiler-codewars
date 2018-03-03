const Token = require('../token');

/**
 * Implements lexical analysis of the source program.
 *
 * @class
 */
class Scanner {
  /**
   * Creates scanner instance.
   *
   * @param {String} input Source code of the program
   */
  constructor(input) {
    this._input = input;
    this._currentPosition = 0;
    this._currentChar = this._input[this._currentPosition];
  }

  /**
   * Returns current char that stored in scanners buffer.
   *
   * @returns {String|undefined}
   */
  getChar() {
    return this._currentChar;
  }

  /**
   * Advance the cursor by specified offset from the current position.
   *
   * @param {Number} [offset=1] How many positions to advance
   * @returns {Scanner} Returns current instance of the scanner
   */
  advance(offset = 1) {
    this._currentPosition += offset;
    this._currentChar = this._input[this._currentPosition];

    return this;
  }

  /**
   * Peek a char at specified offset from current position.
   *
   * @param {Number} [offset=1] How many letter to shift before peeking the char
   * @returns {String|undefined} Returns char if it exists
   */
  peek(offset = 1) {
    const peekPosition = this._currentPosition + offset;

    return this._input[peekPosition];
  }

  /**
   * Returns tokens one by one per call.
   *
   * @returns {Token}
   */
  getNextToken() {
    // EOF
    if (!this._currentChar) {
      return Token.create(Token.EOF);
    }

    // Skip whitespaces
    while (this._currentChar && Scanner.IS_WHITESPACE(this._currentChar)) {
      this.advance();
    }

    // Number literals
    if (this._currentChar && Scanner.IS_DIGIT(this._currentChar)) {
      let number = this._currentChar;

      this.advance();
      while (this._currentChar && Scanner.IS_DIGIT(this._currentChar)) {
        number += this._currentChar;
        this.advance();
      }

      return Token.create(Token.NUMBER, number);
    }

    // Variable identifier
    if (this._currentChar && Scanner.IS_ALPHA(this._currentChar)) {
      let identifier = this._currentChar;

      this.advance();
      while (this._currentChar && Scanner.IS_ALPHANUMERIC(this._currentChar)) {
        identifier += this._currentChar;
        this.advance();
      }

      return Token.create(Token.VARIABLE, identifier);
    }

    // Mathematical operators
    if (['+', '-', '/', '*'].includes(this._currentChar)) {
      const operator = this._currentChar;
      this.advance();
      return Token.create(Token.OPERATOR, operator);
    }

    // Left parenthesis
    if (this._currentChar === '(') {
      this.advance();
      return Token.create(Token.LEFT_PARENTHESIS, '(');
    }

    // Right parenthesis
    if (this._currentChar === ')') {
      this.advance();
      return Token.create(Token.RIGHT_PARENTHESIS, ')');
    }

    // Left bracket
    if (this._currentChar === '[') {
      this.advance();
      return Token.create(Token.LEFT_BRACKET, '[');
    }

    // Right bracket
    if (this._currentChar === ']') {
      this.advance();
      return Token.create(Token.RIGHT_BRACKET, ']');
    }

    // EOF
    if (!this._currentChar) {
      return Token.create(Token.EOF);
    }

    throw new Error(`Unexpected character: ${this._currentChar}`);
  }

  /**
   * Creates scanner instance.
   *
   * @static
   * @param {String} input Source code of the program
   */
  static create(input) {
    return new this(input);
  }

  /**
   * Check if character is just a whitespace character.
   *
   * @static
   * @param char
   * @returns {Boolean}
   */
  static IS_WHITESPACE(char) {
    return /\s/.test(char);
  }

  /**
   * Check if character is alpha.
   *
   * @static
   * @param char
   * @returns {Boolean}
   */
  static IS_ALPHA(char) {
    return /[a-zA-Z]/.test(char);
  }

  /**
   * Check if character is a digit.
   *
   * @static
   * @param char
   * @returns {Boolean}
   */
  static IS_DIGIT(char) {
    return /\d/.test(char);
  }

  /**
   * Check if character is alpha numeric.
   *
   * @static
   * @param char
   * @returns {Boolean}
   */
  static IS_ALPHANUMERIC(char) {
    return this.IS_ALPHA(char) || this.IS_DIGIT(char);
  }
}

module.exports = Scanner;

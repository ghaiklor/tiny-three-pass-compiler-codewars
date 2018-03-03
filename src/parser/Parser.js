const Scanner = require('../scanner');
const Token = require('../token');
const AST = require('../ast');

/**
 * Implements syntax analysis of the source program.
 * As a result generates abstract syntax tree (AST).
 *
 * @class
 */
class Parser {
  /**
   * Takes a source code of the program as an input and creates parser instance.
   *
   * @param {String} input Source code of the program
   */
  constructor(input) {
    this._scanner = Scanner.create(input);
    this._currentToken = this._scanner.getNextToken();
  }

  /**
   * Consumes a token by specified type.
   * If specified token type is not the same as a current token, throws an error.
   *
   * @param {String} type Token type
   */
  consume(type) {
    if (this._currentToken.is(type)) {
      this._currentToken = this._scanner.getNextToken();
    } else {
      throw new Error(`Unexpected token: ${this._currentToken} (expected to have ${type})`);
    }
  }

  /**
   * functionDeclaration ::= "[" argList "]" expression
   */
  functionDeclaration() {
    const token = this._currentToken;

    if (token.is(Token.LEFT_BRACKET)) {
      this.consume(Token.LEFT_BRACKET);
      const argumentsList = this.argList();
      this.consume(Token.RIGHT_BRACKET);
      const expression = this.expression();

      return new AST.FunctionDeclaration(argumentsList, expression);
    }

    throw new Error(`Unexpected token: ${token} (expected to have ${Token.LEFT_BRACKET})`);
  }

  /**
   * argList ::= e
   *           | variable argList
   */
  argList() {
    let argumentsList = new AST.ArgumentsList();

    while (this._currentToken.is(Token.VARIABLE)) {
      const variable = new AST.VariableIdentifier(this._currentToken);
      argumentsList.pushNode(variable);
      this.consume(Token.VARIABLE);
    }

    return argumentsList;
  }

  /**
   * expression ::= term
   *              | expression "+" term
   *              | expression "-" term
   */
  expression() {
    const term = this.term();
    const token = this._currentToken;

    if (token.is(Token.OPERATOR) && token.getValue() === '+') {
      this.consume(Token.OPERATOR);
      const expression = this.expression();
      return new AST.BinaryOperator(term, token, expression);
    } else if (token.is(Token.OPERATOR) && token.getValue() === '-') {
      this.consume(Token.OPERATOR);
      const expression = this.expression();
      return new AST.BinaryOperator(term, token, expression);
    }

    return term;
  }

  /**
   * term ::= factor
   *        | term "*" factor
   *        | term "/" factor
   */
  term() {
    const factor = this.factor();
    const token = this._currentToken;

    if (token.is(Token.OPERATOR) && token.getValue() === '*') {
      this.consume(Token.OPERATOR);
      const term = this.term();
      return new AST.BinaryOperator(factor, token, term);
    } else if (token.is(Token.OPERATOR) && token.getValue() === '/') {
      this.consume(Token.OPERATOR);
      const term = this.term();
      return new AST.BinaryOperator(factor, token, term);
    }

    return factor;
  }

  /**
   * factor ::= number
   *          | variable
   *          | "(" expression ")"
   */
  factor() {
    const token = this._currentToken;

    if (token.is(Token.NUMBER)) {
      this.consume(Token.NUMBER);
      return new AST.NumberLiteral(token);
    } else if (token.is(Token.VARIABLE)) {
      this.consume(Token.VARIABLE);
      return new AST.VariableIdentifier(token);
    } else if (token.is(Token.LEFT_PARENTHESIS)) {
      this.consume(Token.LEFT_PARENTHESIS);
      const expression = this.expression();
      this.consume(Token.RIGHT_PARENTHESIS);
      return expression;
    }

    throw new Error(`Unexpected token: ${token} (expected to have ${Token.NUMBER}, ${Token.VARIABLE}, ${Token.LEFT_PARENTHESIS})`);
  }

  /**
   * Parses the sources code and returns AST.
   *
   * @returns {FunctionDeclaration}
   */
  parse() {
    return this.functionDeclaration();
  }
}

module.exports = Parser;

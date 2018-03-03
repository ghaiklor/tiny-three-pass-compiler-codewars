const { assert } = require('chai');
const Scanner = require('../../../src/scanner');

const MATHEMATICAL_OPERATORS = '+ - / *';
const BRACKETS_AND_PARENTHESIS = '[ ] ( )';
const VARIABLE_IDENTIFIERS = 'foo bar baz';
const NUMBER_LITERALS = '1234 1000';

describe('Scanner', () => {
  it('Should properly export', () => {
    assert.isFunction(Scanner);
  });

  it('Should properly advance the cursor', () => {
    const scanner = new Scanner('123');

    assert.equal(scanner.getChar(), '1');
    assert.instanceOf(scanner.advance(), Scanner);
    assert.equal(scanner.getChar(), '2');
    assert.instanceOf(scanner.advance(-1), Scanner);
    assert.equal(scanner.getChar(), '1');
    assert.instanceOf(scanner.advance(2), Scanner);
    assert.equal(scanner.getChar(), '3');
  });

  it('Should properly peek the char', () => {
    const scanner = new Scanner('123');

    assert.equal(scanner.peek(0), '1');
    assert.equal(scanner.peek(2), '3');
    assert.instanceOf(scanner.advance(), Scanner);
    assert.equal(scanner.peek(), '3');
    assert.equal(scanner.peek(-1), '1');
  });

  it('Should properly parse number literals', () => {
    const scanner = Scanner.create(NUMBER_LITERALS);

    assert.equal(scanner.getNextToken().toString(), 'Token(NUMBER,1234)');
    assert.equal(scanner.getNextToken().toString(), 'Token(NUMBER,1000)');
    assert.equal(scanner.getNextToken().toString(), 'Token(EOF,null)');
  });

  it('Should properly parse variable identifiers', () => {
    const scanner = Scanner.create(VARIABLE_IDENTIFIERS);

    assert.equal(scanner.getNextToken().toString(), 'Token(VARIABLE,foo)');
    assert.equal(scanner.getNextToken().toString(), 'Token(VARIABLE,bar)');
    assert.equal(scanner.getNextToken().toString(), 'Token(VARIABLE,baz)');
    assert.equal(scanner.getNextToken().toString(), 'Token(EOF,null)');
  });

  it('Should properly parse mathematical operators', () => {
    const scanner = new Scanner(MATHEMATICAL_OPERATORS);

    assert.equal(scanner.getNextToken().toString(), 'Token(OPERATOR,+)');
    assert.equal(scanner.getNextToken().toString(), 'Token(OPERATOR,-)');
    assert.equal(scanner.getNextToken().toString(), 'Token(OPERATOR,/)');
    assert.equal(scanner.getNextToken().toString(), 'Token(OPERATOR,*)');
    assert.equal(scanner.getNextToken().toString(), 'Token(EOF,null)');
  });

  it('Should properly parse parenthesis and brackets', () => {
    const scanner = Scanner.create(BRACKETS_AND_PARENTHESIS);

    assert.equal(scanner.getNextToken().toString(), 'Token(LEFT_BRACKET,[)');
    assert.equal(scanner.getNextToken().toString(), 'Token(RIGHT_BRACKET,])');
    assert.equal(scanner.getNextToken().toString(), 'Token(LEFT_PARENTHESIS,()');
    assert.equal(scanner.getNextToken().toString(), 'Token(RIGHT_PARENTHESIS,))');
    assert.equal(scanner.getNextToken().toString(), 'Token(EOF,null)');
  });

  it('Should properly return EOF if there are a lot of whitespaces ahead', () => {
    const scanner = Scanner.create('foo 1234      ');

    assert.equal(scanner.getNextToken().toString(), 'Token(VARIABLE,foo)');
    assert.equal(scanner.getNextToken().toString(), 'Token(NUMBER,1234)');
    assert.equal(scanner.getNextToken().toString(), 'Token(EOF,null)');
  });
});

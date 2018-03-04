const { assert } = require('chai');
const { ConstantFolding } = require('../../../src/optimizer');
const Codegen = require('../../../src/codegen');
const Parser = require('../../../src/parser');

describe('Codegen', () => {
  it('Should properly export', () => {
    assert.isFunction(Codegen);
  });

  it('Should properly emit the correct assembly code for the simplest function', () => {
    const parser = new Parser('[] 5');
    const codegen = new Codegen();
    const ast = parser.parse();

    codegen.visit(ast);
    assert.equal(codegen.toString(), 'IM 5');
  });

  it('Should properly emit for arguments list', () => {
    const parser = new Parser('[foo] foo');
    const codegen = new Codegen();
    const ast = parser.parse();

    codegen.visit(ast);
    assert.equal(codegen.toString(), 'AR 0');
  });

  it('Should properly emit for binary operator with number literals', () => {
    const parser = new Parser('[foo] foo + 5');
    const ast = parser.parse();
    const codegen = new Codegen();

    codegen.visit(ast);
    assert.equal(
      codegen.toString(),
      'AR 0\n' +
      'SW\n' +
      'IM 5\n' +
      'AD'
    );
  });

  it('Should properly emit the assembly from one of examples in kata (optimized)', () => {
    const parser = new Parser('[ x ] x + 2 * 5');
    const ast = parser.parse();
    const optimizer = new ConstantFolding();
    const codegen = new Codegen();

    const optimizedAST = optimizer.visit(ast);

    codegen.visit(optimizedAST);
    assert.equal(
      codegen.toString(),
      'AR 0\n' +
      'SW\n' +
      'IM 10\n' +
      'AD'
    );
  });

  it('Should properly emit assembly for operator -', () => {
    const parser = new Parser('[ x y ] x - y');
    const ast = parser.parse();
    const codegen = new Codegen();

    codegen.visit(ast);
    assert.equal(
      codegen.toString(),
      'AR 0\n' +
      'SW\n' +
      'AR 1\n' +
      'SU'
    );
  });

  it('Should properly emit assembly for operator *', () => {
    const parser = new Parser('[ x y ] x * y');
    const ast = parser.parse();
    const codegen = new Codegen();

    codegen.visit(ast);
    assert.equal(
      codegen.toString(),
      'AR 0\n' +
      'SW\n' +
      'AR 1\n' +
      'MU'
    );
  });

  it('Should properly emit assembly for operator /', () => {
    const parser = new Parser('[ x y ] x / y');
    const ast = parser.parse();
    const codegen = new Codegen();

    codegen.visit(ast);
    assert.equal(
      codegen.toString(),
      'AR 0\n' +
      'SW\n' +
      'AR 1\n' +
      'DI'
    );
  });

  it('Should throw an error if unknown variable', () => {
    const parser = new Parser('[ x y ] x / foo');
    const ast = parser.parse();
    const codegen = new Codegen();

    assert.throws(
      () => codegen.visit(ast),
      Error,
      'Unknown variable: foo'
    );
  });

  it('Should have all the opcodes in static methods', () => {
    assert.equal(Codegen.IM(10), 'IM 10');
    assert.equal(Codegen.AR(10), 'AR 10');
    assert.equal(Codegen.SW(), 'SW');
    assert.equal(Codegen.PU(), 'PU');
    assert.equal(Codegen.PO(), 'PO');
    assert.equal(Codegen.AD(), 'AD');
    assert.equal(Codegen.SU(), 'SU');
    assert.equal(Codegen.MU(), 'MU');
    assert.equal(Codegen.DI(), 'DI');
  });
});

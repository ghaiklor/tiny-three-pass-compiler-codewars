const { assert } = require('chai');
const Simulator = require('../../../src/simulator');
const Parser = require('../../../src/parser');
const { ConstantFolding } = require('../../../src/optimizer');
const Codegen = require('../../../src/codegen');

describe('Simulator', () => {
  it('Should properly export', () => {
    assert.isFunction(Simulator);
  });

  it('Should properly execute simple code', () => {
    const optimizer = new ConstantFolding();
    const parser = new Parser('[ x ] x + 10');
    const ast = parser.parse();
    const optimizedAST = optimizer.visit(ast);
    const codegen = new Codegen();

    codegen.visit(optimizedAST);
    const asm = codegen.getCode();
    const simulator = new Simulator(asm, [20]);
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: 30\n' +
      'R1: 20\n' +
      'IP: 4\n' +
      'STACK: '
    );
  });

  it('Should properly execute push on stack operation', () => {
    const simulator = new Simulator(
      ['IM 10', 'PU', 'SW', 'IM 20', 'PU', 'AD', 'PU'],
      []
    );
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: 30\n' +
      'R1: 10\n' +
      'IP: 7\n' +
      'STACK: 10, 20, 30'
    );
  });

  it('Should properly execute pop from stack operation', () => {
    const simulator = new Simulator(
      ['IM 10', 'PU', 'SW', 'IM 20', 'PU', 'AD', 'PU', 'IM 0', 'PO'],
      []
    );
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: 30\n' +
      'R1: 10\n' +
      'IP: 9\n' +
      'STACK: 10, 20'
    );
  });

  it('Should properly execute mathematical op code DI', () => {
    const simulator = new Simulator(
      ['IM 10', 'SW', 'IM 20', 'DI'],
      []
    );
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: 2\n' +
      'R1: 10\n' +
      'IP: 4\n' +
      'STACK: '
    );
  });

  it('Should properly execute mathematical op code MU', () => {
    const simulator = new Simulator(
      ['IM 10', 'SW', 'IM 20', 'MU'],
      []
    );
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: 200\n' +
      'R1: 10\n' +
      'IP: 4\n' +
      'STACK: '
    );
  });

  it('Should properly execute mathematical op code SU', () => {
    const simulator = new Simulator(
      ['IM 10', 'SW', 'IM 20', 'SU'],
      []
    );
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: 10\n' +
      'R1: 10\n' +
      'IP: 4\n' +
      'STACK: '
    );
  });

  it('Should have the initial state if no asm and args', () => {
    const simulator = new Simulator();
    simulator.executeAll();

    assert.equal(
      simulator.toString(),
      'R0: null\n' +
      'R1: null\n' +
      'IP: 0\n' +
      'STACK: '
    );
  });

  it('Should throw an error if unknown op code', () => {
    const simulator = new Simulator(['UNKNOWN']);
    assert.throws(
      () => simulator.executeAll(),
      Error,
      'Unknown op code: UNKNOWN, halting...'
    );
  })
});

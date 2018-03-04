/**
 * Implements simple stack machine with two registers.
 *
 * @class
 */
class Simulator {
  /**
   * Creates a machine with pre-defined assembly code for it and arguments.
   *
   * @param {Array<String>} asm Array with assemly code
   * @param {Array<Number>} args Array of arguments as numbers
   */
  constructor(asm = [], args = []) {
    this._asm = asm;
    this._args = args;
    this._r0 = null;
    this._r1 = null;
    this._ip = 0;
    this._stack = [];
  }

  /**
   * Executes instruction one by one (per call).
   *
   * @returns {Boolean}
   */
  execute() {
    const instruction = this._asm[this._ip];
    if (!instruction) {
      return false;
    }

    const match = instruction.match(/(IM|AR)\s+(\d+)/) || [0, instruction, 0];
    const opcode = match[1];
    const n = match[2] | 0;

    if (opcode === 'IM') {
      this._r0 = n;
    } else if (opcode === 'AR') {
      this._r0 = this._args[n];
    } else if (opcode === 'SW') {
      let tmp = this._r0;
      this._r0 = this._r1;
      this._r1 = tmp;
    } else if (opcode === 'PU') {
      this._stack.push(this._r0);
    } else if (opcode === 'PO') {
      this._r0 = this._stack.pop();
    } else if (opcode === 'AD') {
      this._r0 += this._r1;
    } else if (opcode === 'SU') {
      this._r0 -= this._r1;
    } else if (opcode === 'MU') {
      this._r0 *= this._r1;
    } else if (opcode === 'DI') {
      this._r0 /= this._r1;
    } else {
      throw new Error(`Unknown op code: ${opcode}, halting...`);
    }

    this._ip += 1;
    return true;
  }

  /**
   * Execute all commands by once.
   */
  executeAll() {
    while (this.execute()) {
      // just waiting for the end
    }
  }

  /**
   * Converts current state of simulator to string representation.
   *
   * @returns {String}
   */
  toString() {
    return (
      `R0: ${this._r0}\n` +
      `R1: ${this._r1}\n` +
      `IP: ${this._ip}\n` +
      `STACK: ${this._stack.join(', ')}`
    );
  }
}

module.exports = Simulator;

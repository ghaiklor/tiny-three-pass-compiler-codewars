const Codegen = require('./codegen');
const { ConstantFolding } = require('./optimizer');
const Parser = require('./parser');
const Simulator = require('./simulator');

/**
 * Compile the source code and run the simulator.
 *
 * @param {String} source
 * @param {Array<Number>} args
 * @returns {{ast: FunctionDeclaration, optimizedAST: FunctionDeclaration, asm: Array<String>, simulatorStates: Array<String>}}
 */
module.exports = function compile(source, args) {
  const codegen = new Codegen();
  const optimizer = new ConstantFolding();
  const parser = new Parser(source);
  const ast = parser.parse();
  const optimizedAST = optimizer.visit(ast);

  codegen.visit(optimizedAST);

  const asm = codegen.getCode();
  const simulator = new Simulator(asm, args);
  const simulatorStates = [simulator.toString()];

  while (simulator.execute()) {
    simulatorStates.push(simulator.toString());
  }

  return {
    ast,
    optimizedAST,
    asm,
    simulatorStates,
    result: simulator._r0
  };
};

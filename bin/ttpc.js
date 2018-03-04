#!/usr/bin/env node
/*eslint no-process-exit: ["OFF"]*/
const blessed = require('blessed');
const compiler = require('../');
const source = process.argv[2] || '';
const args = process.argv[3] || '';
const { ast, optimizedAST, asm, simulatorStates, result } = compiler(source, args.split(',').map(Number));

const screen = blessed.screen({ smartCSR: true });
screen.title = 'Tiny Three-Pass Compiler';

const astBox = blessed.box({
  top: 'center',
  left: '0%',
  width: '25%',
  height: '80%',
  label: 'Un-optimized AST',
  shrink: true,
  scrollable: true,
  content: ast.toString(),
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'green'
    }
  }
});

const optimizedASTBox = blessed.box({
  top: 'center',
  left: '25%',
  width: '25%',
  height: '80%',
  label: 'Optimized AST',
  shrink: true,
  scrollable: true,
  content: optimizedAST.toString(),
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'green'
    }
  }
});

const asmBox = blessed.box({
  top: 'center',
  left: '50%',
  width: '25%',
  height: '80%',
  label: 'Compiled Assembly',
  shrink: true,
  scrollable: true,
  content: asm.join('\n').toString(),
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'green'
    }
  }
});

const simulatorStatesBox = blessed.box({
  top: 'center',
  left: '75%',
  width: '25%',
  height: '80%',
  label: 'State of the simulator at each tick',
  shrink: true,
  scrollable: true,
  content: simulatorStates.join('\n\n').toString(),
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'green'
    }
  }
});

const replBox = blessed.box({
  top: 'right',
  left: '0%',
  width: '100%',
  height: '130',
  label: 'Result of function execution',
  shrink: true,
  scrollable: true,
  content: `Function: ${source.toString()}\nArguments: ${args.split(',')}\nResult: ${result}`,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: 'green'
    }
  }
});

screen.append(astBox);
screen.append(optimizedASTBox);
screen.append(asmBox);
screen.append(simulatorStatesBox);
screen.append(replBox);
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.render();

# Tiny Three-Pass Compiler

[![Build Status](https://travis-ci.org/ghaiklor/tiny-three-pass-compiler-codewars.svg?branch=master)](https://travis-ci.org/ghaiklor/tiny-three-pass-compiler-codewars)
[![Coverage Status](https://coveralls.io/repos/github/ghaiklor/tiny-three-pass-compiler-codewars/badge.svg?branch=master)](https://coveralls.io/github/ghaiklor/tiny-three-pass-compiler-codewars?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ghaiklor/tiny-three-pass-compiler-codewars.svg)](https://greenkeeper.io/)

_Three-pass compiler for a simple programming language into a small assembly language - [link to original task](https://www.codewars.com/kata/tiny-three-pass-compiler/javascript)_

## How to play with it

Just install this package via npm and call `ttpc` command.
First argument is the source code of the program itself.
Second arguments is the list of arguments for your source code (separated via `,`).

```bash
ttpc "[ x ] x + 10" "50"
```

<img width="1792" alt="screen shot 2018-03-04 at 15 14 51" src="https://user-images.githubusercontent.com/3625244/36946006-d471e19c-1fbe-11e8-9090-8aa472677ed1.png">

```bash
ttpc "[ x ] x + 500 - 10 * 20 / 2" "100"
```

<img width="1792" alt="screen shot 2018-03-04 at 15 18 27" src="https://user-images.githubusercontent.com/3625244/36946036-5a7801fe-1fbf-11e8-8bd9-432dfdc2afcb.png">

## How it works

Few words about each of the stages.

### Tokens

[Implementation](./src/token)

All begins from lexical units - tokens.

The implementation is simple as it could.
The token structure just holds type of the token and its value from the source code.

### Scanner

[Implementation](./src/scanner)

Scanner is a class that takes input of your source code.
It stores current position of the cursor and the current char to which cursor is pointing right now.

When `getNextToken` is called on the scanners instance, it consumes as many characters as it need for getting the full instance of the token.

I.e. when analysing the expression `[ x ] x + x` via scanner, it will produce the tokens stream:

```
Token(LEFT_BRACKET,[)
Token(VARIABLE,x)
Token(RIGHT_BRACKET,])
Token(VARIABLE,x)
Token(OPERATOR,+)
Token(VARIABLE,x)
```

### AST

[Implementation](./src/ast)

Before starting with the parser I made few AST nodes that are required for holding the information about the source code.

They are simple nodes like `NumberLiteral` (holds information about number literals in the code) or like `ArgumentsList` which is just a compound node with the list of `VariableIdentifier` nodes in compound, etc...

### Parser

[Implementation](./src/parser)

Parser uses the following grammar:

```
function   ::= '[' arg-list ']' expression

arg-list   ::= /* nothing */
             | variable arg-list

expression ::= term
             | expression '+' term
             | expression '-' term

term       ::= factor
             | term '*' factor
             | term '/' factor

factor     ::= number
             | variable
             | '(' expression ')'
```

Nothing special here, just consuming the stream of the tokens and creating AST nodes.

### Visitor

[Implementation](./src/visitor)

When AST tree is constructed, we need to somehow traverse the tree.

So, I've created a simple Visitor class which is actually implement the Visitor pattern.

### Optimizer

[Implementation](./src/optimizer)

Optimization pipelines are implemented as a child of Visitor class.
So, basically, each of optimization pipelines just traverses the tree and try to find what they can optimize here.

#### Constant Folding

For a proof-of-concept, I made one simple optimization - Constant Folding.
It traverses all the `BinaryOperator` nodes and if some of the nodes have number literals from left and right sides of the statement, it will fold them in one `NumberLiteral` and replaces the `BinaryOperator` one.

### Code gen

[Implementation](./src/codegen)

When AST was optimized by optimization pipelines, it's going into codegen phase.

Codegen phase is another one Visitor, which traverses the tree and emits the assembly code.

Though, few differences here are present:

- Codegen visitor has a symbol table that can resolve variable identifiers in the code;
- It has an array that holds the sequence of assembly code;

So, actually, that's it.
We traverse the optimized AST tree with codegen visitor and then just collect an array of assembly codes there.

### Simulator

[Implementation](./src/simulator)

Assembly code emitted via code gen phase need to be tested somehow.
That is the reason why I've implemented simulator for the processor, that understands the assembly generated before.

The simulator itself is a stack machine that has:

- Two general purpose registers R0 and R1
- IP - Instruction Pointer
- Stack - Stack as an array

When providing the assembly code to simulator it just goes over codes step by step and updates registers\stack\ip.

## License

[MIT](./LICENSE)

const { assert } = require('chai');
const { ConstantFolding } = require('../../../src/optimizer');
const Parser = require('../../../src/parser');
const AST = require('../../../src/ast');

describe('Optimizer::ConstantFolding', () => {
  it('Should properly export', () => {
    assert.isFunction(ConstantFolding);
  });

  it('Should properly fold the binary operator into number literal', () => {
    const optimizer = new ConstantFolding();
    const parser = new Parser('[] 5 + 2');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.FunctionDeclaration);
    assert.instanceOf(ast.getExpression(), AST.BinaryOperator);
    assert.instanceOf(ast.getExpression().getLHS(), AST.NumberLiteral);
    assert.instanceOf(ast.getExpression().getRHS(), AST.NumberLiteral);

    const optimizedAST = optimizer.visit(ast);
    assert.instanceOf(optimizedAST, AST.FunctionDeclaration);
    assert.instanceOf(optimizedAST.getExpression(), AST.NumberLiteral);
    assert.equal(optimizedAST.getExpression().getValue(), 7);
  });

  it('Should properly fold the binary operator into number literal recursively', () => {
    const optimizer = new ConstantFolding();
    const parser = new Parser('[] 10 * 2 + 5 - (25 / 5)');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.FunctionDeclaration);
    assert.instanceOf(ast.getExpression(), AST.BinaryOperator);
    assert.instanceOf(ast.getExpression().getLHS(), AST.BinaryOperator);
    assert.instanceOf(ast.getExpression().getRHS(), AST.BinaryOperator);

    const optimizedAST = optimizer.visit(ast);
    assert.instanceOf(optimizedAST, AST.FunctionDeclaration);
    assert.instanceOf(optimizedAST.getExpression(), AST.NumberLiteral);
    assert.equal(optimizedAST.getExpression().getValue(), 20);
  });

  it('Should return nodes as is if it can not optimize it', () => {
    const optimizer = new ConstantFolding();
    const parser = new Parser('[foo] foo * 10');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.FunctionDeclaration);
    assert.instanceOf(ast.getExpression(), AST.BinaryOperator);
    assert.instanceOf(ast.getExpression().getLHS(), AST.VariableIdentifier);
    assert.instanceOf(ast.getExpression().getRHS(), AST.NumberLiteral);

    const optimizedAST = optimizer.visit(ast);
    assert.instanceOf(optimizedAST, AST.FunctionDeclaration);
    assert.instanceOf(optimizedAST.getExpression(), AST.BinaryOperator);
    assert.instanceOf(ast.getExpression().getLHS(), AST.VariableIdentifier);
    assert.equal(ast.getExpression().getLHS().getIdentifier(), 'foo');
    assert.instanceOf(ast.getExpression().getRHS(), AST.NumberLiteral);
    assert.equal(ast.getExpression().getRHS().getValue(), 10);
  });
});

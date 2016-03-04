
Block = require "../src/block"
Expression = require "../src/expression"

describe "expression.assignTo(keyPath)", ->

  it "sets the expression to the given variable path", ->
    block = Block "foo = 1"
    expr = block.expressions[0]
    expr.assignTo "bar.foo"
    block.compile bare: yes
    expect(block.output).toBe "bar.foo = foo = 1"

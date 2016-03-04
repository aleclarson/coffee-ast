
# coffee-ast v0.0.1 [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This library aims to help you perform changes to CoffeeScript as easily as possible.

```sh
npm install aleclarson/coffee-ast#0.0.1
```

&nbsp;

## usage

&nbsp;

#### Block(code)

```CoffeeScript
{ Block } = require "coffee-ast"

block = Block "success = yes"
```

&nbsp;

#### block.compile(options)

```CoffeeScript
block.compile bare: yes
```

&nbsp;

#### expression.assignTo(keyPath)

```CoffeeScript
# block.input  = "success = yes"

block.expressions[0].assignTo "some.nested.key"

# block.output = "some.nested.key = success = yes"
```

&nbsp;

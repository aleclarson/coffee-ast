var Block, NamedFunction, cs, define, isKind, sync;

sync = require("io").sync;

define = require("define");

cs = require("coffee-script");

NamedFunction = require("named-function");

isKind = require("type-utils").isKind;

Block = module.exports = NamedFunction("Block", function(input) {
  var _block, _locals, _referencedVars, _tokens, expressions, output;
  if (!isKind(this, Block)) {
    return new Block(input);
  }
  _locals = [];
  _tokens = cs.tokens(input);
  _block = cs.nodes(_tokens);
  _referencedVars = sync.reduce(_tokens, {}, function(results, token) {
    if (token.variable) {
      results[token[1]] = true;
    }
    return results;
  });
  output = null;
  expressions = _block.expressions.map((function(_this) {
    return function(node) {
      return Block.Expression(node, _this);
    };
  })(this));
  return define(this, function() {
    this.options = {
      configurable: false
    };
    this({
      input: input,
      output: output,
      expressions: expressions
    });
    this.enumerable = false;
    return this({
      _block: _block,
      _referencedVars: _referencedVars,
      _locals: _locals
    });
  });
});

define(Block.prototype, function() {
  this.options = {
    configurable: false,
    writable: false
  };
  return this({
    compile: function(options) {
      var ref;
      if (options == null) {
        options = {};
      }
      this._block.expressions = sync.map(this.expressions, function(arg) {
        var node;
        node = arg.node;
        return node;
      });
      return this.output = this._block.compile({
        bare: (ref = options.bare) != null ? ref : false,
        locals: this._locals
      });
    }
  });
});

//# sourceMappingURL=../../map/src/block.map

var Block, Expression, KeyMirror, define, isKind, nodeTypes;

require("lotus-require");

isKind = require("type-utils").isKind;

KeyMirror = require("keymirror");

define = require("define");

nodeTypes = require("coffee-script/lib/coffee-script/nodes");

Block = require("./block");

Expression = require("./expression");

if (Block.Expression != null) {
  console.log("Block.Expression is already defined.");
  return;
}

define(exports, function() {
  var i, key, len, overriddenNodeTypes, ref, results, type, visibleNodeTypes;
  this.options = {
    configurable: false,
    writable: false
  };
  this({
    Block: Block
  });
  this(Block, {
    Expression: Expression
  });
  visibleNodeTypes = KeyMirror(["Access", "Assign", "Literal", "Value"]);
  ref = visibleNodeTypes._keys;
  for (i = 0, len = ref.length; i < len; i++) {
    key = ref[i];
    this(key, nodeTypes[key]);
  }
  this.enumerable = false;
  overriddenNodeTypes = KeyMirror(["Block"]);
  results = [];
  for (key in nodeTypes) {
    type = nodeTypes[key];
    if (isKind(type, Function) && (type.name.length > 0) && (overriddenNodeTypes[key] == null) && (visibleNodeTypes[key] == null)) {
      results.push(this(key, type));
    }
  }
  return results;
});

//# sourceMappingURL=../../map/src/index.map

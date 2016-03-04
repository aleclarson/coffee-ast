var Access, Assign, Base, Block, Expression, Literal, NamedFunction, Value, define, isKind, isType, ref, ref1, sync;

sync = require("io").sync;

define = require("define");

NamedFunction = require("named-function");

ref = require("type-utils"), isType = ref.isType, isKind = ref.isKind;

ref1 = require("coffee-script/lib/coffee-script/nodes"), Access = ref1.Access, Assign = ref1.Assign, Base = ref1.Base, Literal = ref1.Literal, Value = ref1.Value;

Block = require("./block");

Expression = module.exports = NamedFunction("Expression", function(node, code) {
  if (!isKind(this, Expression)) {
    return new Expression(node, code);
  }
  if (!isKind(code, Block)) {
    throw TypeError("'code' must inherit from Block");
  }
  return define(this, function() {
    this.options = {
      configurable: false
    };
    return this({
      node: node,
      code: code
    });
  });
});

define(Expression.prototype, function() {
  this.options = {
    configurable: false,
    writable: false
  };
  return this({
    assignTo: function(keyPath) {
      var keys, node, obj, objName, prop;
      if (!isType(keyPath, String)) {
        throw TypeError("'keyPath' must be a String");
      }
      if (!(keyPath.length > 0)) {
        throw Error("'keyPath' cannot be an empty String");
      }
      node = keyPath + " = ";
      keys = keyPath.split(".");
      objName = keys.shift();
      obj = new Literal(objName);
      prop = sync.reduce(keys, obj, function(prop, key) {
        return new Value(prop, [new Access(new Literal(key))]);
      });
      this.node = new Assign(prop, this.node, "=");
      return this;
    },
    isSetter: {
      get: function() {
        return isKind(this.node, Assign) && ((this.node.context == null) || this.node.context === "=");
      }
    }
  });
});

//# sourceMappingURL=../../map/src/expression.map

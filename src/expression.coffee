
{ sync } = require "io"
define = require "define"
NamedFunction = require "named-function"
{ isType, isKind } = require "type-utils"
{ Access, Assign, Base, Literal, Value } = require "coffee-script/lib/coffee-script/nodes"
Block = require "./block"

Expression = module.exports = NamedFunction "Expression", (node, code) ->

  return new Expression node, code unless isKind this, Expression

  throw TypeError "'code' must inherit from Block" unless isKind code, Block

  define this, ->
    @options = configurable: no
    @ { node, code }

define Expression.prototype, ->
  @options = configurable: no, writable: no
  @
    # Prepends '#{keyPath} = ' to this expression. Supports nested assignment via dot-notation.
    assignTo: (keyPath) ->
      throw TypeError "'keyPath' must be a String" unless isType keyPath, String
      throw Error "'keyPath' cannot be an empty String" unless keyPath.length > 0
      node = keyPath + " = "
      keys = keyPath.split "."
      objName = keys.shift()
      # @code._referencedVars[objName] = yes
      obj = new Literal objName
      prop = sync.reduce keys, obj, (prop, key) ->
        new Value prop, [new Access new Literal key]
      @node = new Assign prop, @node, "="
      # TODO: Update location data.
      this

    # Has the 'var = value' syntax.
    isSetter: get: ->
      isKind( @node, Assign ) and ( !@node.context? or @node.context is "=" )

    # Has the 'obj.prop = value' syntax.
    # isPropSetter: get: -> throw "unimplemented"

    # Has the 'prop: value' syntax.
    # isNestedSetter: get: -> throw "unimplemented"

    # Deletes this expression from '@code'.
    # remove: ->
    #   throw Error "unimplemented"

    # Inserts a '@node' into this expression at a specific index.
    # insert: (index, node) ->
    #   throw TypeError "'index' must be a Number" unless isType index, Number
    #   throw TypeError "'node' must be inherit from Base" unless isKind node, Base
    #   throw Error "unimplemented"

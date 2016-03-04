
require "lotus-require"
{ isKind } = require "type-utils"
KeyMirror = require "keymirror"
define = require "define"

nodeTypes = require "coffee-script/lib/coffee-script/nodes"

Block = require "./block"
Expression = require "./expression"

if Block.Expression?
  console.log "Block.Expression is already defined."
  return

define exports, ->

  @options = configurable: no, writable: no
  @ { Block }
  @ Block, { Expression }

  visibleNodeTypes = KeyMirror ["Access", "Assign", "Literal", "Value"]
  @ key, nodeTypes[key] for key in visibleNodeTypes._keys

  @enumerable = no
  overriddenNodeTypes = KeyMirror ["Block"]
  @ key, type for key, type of nodeTypes when isKind(type, Function) and (type.name.length > 0) and !overriddenNodeTypes[key]? and !visibleNodeTypes[key]?

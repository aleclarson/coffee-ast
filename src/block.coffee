
{ sync } = require "io"
define = require "define"
cs = require "coffee-script"
NamedFunction = require "named-function"
{ isKind } = require "type-utils"

Block = module.exports = NamedFunction "Block", (input) ->

  return new Block input unless isKind this, Block

  _locals = []
  _tokens = cs.tokens input
  _block = cs.nodes _tokens
  _referencedVars = sync.reduce _tokens, {}, (results, token) ->
    if token.variable then results[token[1]] = yes
    return results

  output = null
  expressions = _block.expressions.map (node) => Block.Expression node, this

  define this, ->
    @options = configurable: no
    @ { input, output, expressions }
    @enumerable = no
    @ { _block, _referencedVars, _locals }

define Block.prototype, ->
  @options = configurable: no, writable: no
  @
    compile: (options = {}) ->
      @_block.expressions = sync.map @expressions, ({ node }) -> node
      @output = @_block.compile
        bare: options.bare ? no
        locals: @_locals
        # referencedVars: Object.keys @_referencedVars

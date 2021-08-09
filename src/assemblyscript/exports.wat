(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (global $src/assemblyscript/exports/GET_THIS_CONSTANT_FROM_JAVASCRIPT i32 (i32.const 2424))
 (global $src/assemblyscript/exports/ADD_CONSTANT i32 (i32.const 1))
 (global $~lib/memory/__data_end i32 (i32.const 8))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 16392))
 (global $~lib/memory/__heap_base i32 (i32.const 16392))
 (memory $0 0)
 (table $0 1 funcref)
 (elem $0 (i32.const 1))
 (export "callMeFromJavascript" (func $src/assemblyscript/exports/callMeFromJavascript))
 (export "GET_THIS_CONSTANT_FROM_JAVASCRIPT" (global $src/assemblyscript/exports/GET_THIS_CONSTANT_FROM_JAVASCRIPT))
 (export "memory" (memory $0))
 (func $src/assemblyscript/exports/addIntegerWithConstant (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
  global.get $src/assemblyscript/exports/ADD_CONSTANT
  i32.add
 )
 (func $src/assemblyscript/exports/callMeFromJavascript (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  call $src/assemblyscript/exports/addIntegerWithConstant
 )
)

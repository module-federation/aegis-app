import { watch } from 'node:fs'
import { exec } from 'node:child_process'

/**
 * Watch for changes to source files. For any change, recompile and hot reload.
 */
watch('./src', { recursive: true }, (eventType, filename) => {
  exec('./watch.sh', (error, stdout, stdin) => {
    console.log({ eventType, filename })
    if (error) return console.error(error)
    console.log(stdout || stdin)
  })
})

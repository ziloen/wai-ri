import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'


/**
 * @param {string} path 
 * @returns {string}
 */
function r(path) {
  return resolve(__dirname, path)
}

export default defineConfig({
  resolve: {
    alias: {
      '@wai-ri/core': r('packages/core/index.ts'),
      '@wai-ri/shared': r('packages/shared/index.ts')
    },
    dedupe: []
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    typecheck: {
      include: ['**/*.{test,spec}-d.{ts,js}', '**/*.test.ts']
    }
  }
})
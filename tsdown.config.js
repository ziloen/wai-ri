import { defineConfig } from 'tsdown'



/** @type {import("tsdown").UserConfig} */
export default defineConfig({
  workspace: 'packages/*',
  entry: 'index.ts',
  format: 'esm',
  dts: true,
  clean: true,
  platform: 'neutral',
  fixedExtension: false,
  exports: {
    packageJson: false,
  },
})


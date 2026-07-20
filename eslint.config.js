import { format, typescript } from '@ziloen/eslint-config'
import { defineConfig } from 'eslint/config'


export default defineConfig(
  typescript({ project: './tsconfig.json' }),
  format({ project: './tsconfig.json' }),
)
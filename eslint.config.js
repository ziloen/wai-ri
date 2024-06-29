import { format, typescript } from '@ziloen/eslint-config'


export default [
  ...typescript({ project: './tsconfig.json' }),
  ...format({ project: './tsconfig.json' }),
]
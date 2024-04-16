import { format, typescript } from "@ziloen/eslint-config"


export default [
  ...typescript({ tsconfigPath: "./tsconfig.json" }),
  ...format({ tsconfigPath: "./tsconfig.json" }),
]
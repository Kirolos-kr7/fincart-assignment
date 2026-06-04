import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.vscode/**',
  ]),
  {
    settings: {
      react: {
        version: '19',
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [{ regex: '^@mui/[^/]+$' }] },
      ],
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])

export default eslintConfig

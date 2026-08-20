import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: [
      '.next/**',
      '.contentlayer/**',
      'node_modules/**',
      'public/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  {
    // contentlayer's getMDXComponent compiles a component from an MDX string at
    // runtime, so it cannot be hoisted out of render the way this rule expects.
    // The call is memoised on `code`, which is the strongest guarantee available.
    files: ['src/components/MDXComponents.tsx'],
    rules: { 'react-hooks/static-components': 'off' },
  },
]

export default config

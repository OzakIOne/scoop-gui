module.exports = {
  extends: ['../../.eslintrc.yaml', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react', '@tanstack/query'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'unicorn/filename-case': 'off',
  },
  ignorePatterns: ['vite.config.ts', '!**/*'],
  parserOptions: {
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
};

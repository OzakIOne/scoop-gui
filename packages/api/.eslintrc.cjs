module.exports = {
  extends: '../../.eslintrc.yaml',
  rules: {
    'import/no-default-export': 'off', // disable eslintimport/no-default-export
    'no-console': 'off',
  },
  ignorePatterns: [
    'vite.config.ts',
    'dist/*',
    '!**/*', // This is required to override the ignorePatterns from the root .eslintrc.yaml
  ],
  parserOptions: {
    ecmaVersion: 2022,
    project: 'tsconfig.json', // Use __dirname for project path
    sourceType: 'module',
    tsconfigRootDir: __dirname, // If required, uncomment this line and adjust the path accordingly
  },
};

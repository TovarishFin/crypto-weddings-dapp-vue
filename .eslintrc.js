const path = require('path')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:security/recommended'
  ],
  plugins: ['compat', 'security'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/first': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'error',
    'import/no-named-as-default': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      }
    ],
    'lines-between-class-members': ['error', 'always'],
    'no-shadow': 'error',
    'no-var': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'class',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: 'do',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'export'
      },
      {
        blankLine: 'always',
        prev: 'for',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: 'switch',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: 'try',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: 'while',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: 'with',
        next: '*'
      }
    ],
    'prefer-const': 'error',
    'security/detect-object-injection': 'off',
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true
      }
    ]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': path.join(__dirname, '/src'),
              vue$: 'vue/dist/vue.runtime.esm.js'
            },
            extensions: ['.js', '.jsx', '.vue', '.json']
          }
        }
      }
    }
  },
  globals: {
    __DEV__: true,
    __dirname: true,
    accounts: true,
    after: true,
    afterAll: true,
    afterEach: true,
    artifacts: true,
    assert: true,
    before: true,
    beforeAll: true,
    beforeEach: true,
    console: true,
    contract: true,
    describe: true,
    expect: true,
    fetch: true,
    global: true,
    it: true,
    module: true,
    process: true,
    Promise: true,
    require: true,
    setTimeout: true,
    test: true,
    xdescribe: true,
    xit: true,
    web3: true
  }
}

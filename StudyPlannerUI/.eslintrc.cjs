module.exports = {
    root: true,
    env: {
        'browser': true,
        'node': true,
        'es2021': true
    },
    parser: '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'eslint-plugin-no-inline-styles'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    'rules': {
        'no-inline-styles/no-inline-styles': 2,
        'max-len': [ 'error', { 'code': 110 } ],
        'react/require-default-props': 'off',
        'indent': [
		  'error',
		  2,
		  { 'SwitchCase': 1 }
        ],
        'linebreak-style': 'off',
        'quotes': [
		  'error',
		  'single'
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    overrides: [
        {
            files: ['src/**/*.jsx', 'src/**/*.tsx', 'src/**/*.ts'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': ['off'],
            },
        },
        {
            files: ['src/**/*.ts?(x)'],
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json']
            }
        },
        {
            files: ['vite.config.ts', 'cypress.config.ts', '.eslintrc.cjs'],
            parserOptions: {
                'tsconfigRootDir': __dirname,
                'project': ['./tsconfig.node.json']
            }
        },
        {
            files: ['src/**/*.ts', 'vite.config.ts', 'cypress.config.ts', '.eslintrc.cjs'],
            rules: {
                'indent': ['error', 4, { 'SwitchCase': 1 }],
                '@typescript-eslint/indent': ['error', 4, { 'SwitchCase': 1 }],

            }
        },
        {
            'files': ['**/__tests__/**/*.ts?(x)'],
            'extends': ['plugin:testing-library/react'],
            'rules': {
                '@typescript-eslint/no-magic-numbers': ['off'],
                'testing-library/no-await-sync-events': [
                    'error',
                    {
                        'eventModules': ['fire-event']
                    }
                ],
                'testing-library/no-manual-cleanup': 'error',
                'testing-library/prefer-explicit-assert': 'error',
                'testing-library/prefer-user-event': 'error',
                'testing-library/prefer-wait-for': 'error'
            }
        }
    ]
}




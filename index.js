const plugins = ['simple-import-sort', 'unused-imports'];
const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier',
];
const rules = {
    'no-console': 1,
    'curly': 2,
    'eqeqeq': 2,
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
    'prefer-const': [
        'error',
        {
            destructuring: 'all',
        },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'import/named': 0,
    'no-magic-numbers': 0,
    'no-unused-vars': 0,
    'no-unused-expressions': 0,
    'no-useless-constructor': 0,
    'no-throw-literal': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'unused-imports/no-unused-imports': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 2,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreIIFE: true, ignoreVoid: true },
    ],
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
                regex: '^I[A-Z]',
                match: false,
            },
        },
    ],
    '@typescript-eslint/unbound-method': [
        'error',
        {
            ignoreStatic: true,
        },
    ],
    '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'all', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/array-type': [
        'error',
        {
            default: 'array',
        },
    ],
    '@typescript-eslint/consistent-indexed-object-style': 2,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unnecessary-type-arguments': 2,
    '@typescript-eslint/no-unnecessary-condition': 2,
    '@typescript-eslint/no-extra-non-null-assertion': 2,
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
    '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
            ignore: [-1, 0, 1, 2],
            ignoreDefaultValues: true,
            ignoreClassFieldInitialValues: true,
            ignoreArrayIndexes: true,
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: true,
            ignoreTypeIndexes: true,
        },
    ],
    '@typescript-eslint/no-unused-expressions': 1,
    '@typescript-eslint/no-useless-constructor': 1,
    '@typescript-eslint/consistent-type-definitions': 1,
    '@typescript-eslint/no-throw-literal': 1,
    '@typescript-eslint/switch-exhaustiveness-check': 1,
    '@typescript-eslint/prefer-includes': 1,
    '@typescript-eslint/prefer-for-of': 1,
    '@typescript-eslint/no-useless-empty-export': 1,
    '@typescript-eslint/no-unnecessary-qualifier': 1,
    '@typescript-eslint/no-this-alias': 2,
    '@typescript-eslint/no-require-imports': 1,
    '@typescript-eslint/no-redundant-type-constituents': 1,
    '@typescript-eslint/no-inferrable-types': 2,
    '@typescript-eslint/no-for-in-array': 2,
};
const extensions = 'ts,tsx,js,jsx';

const testing = {
    files: [
        `**/*.{spec,test}.{${extensions}}`,
        `**/{tests,test,__tests__,__mock__,__mocks__}/*.{${extensions}}`,
    ],
    rules: {
        ...rules,
        'no-console': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-implied-eval': 0,
        '@typescript-eslint/no-magic-numbers': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/unbound-method': 0,
        'sonarjs/cognitive-complexity': 0,
        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-identical-functions': 0,
    },
    extends: extendsList,
};

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    env: { node: true, es2022: true },
    plugins,
    extends: extendsList,
    rules,
    overrides: [testing],
    ignorePatterns: ['*.shim.d.ts', '.eslintrc.js'],
};

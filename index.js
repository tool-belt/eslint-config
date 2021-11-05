const extensions = ['.ts', '.tsx', '.js', '.jsx'];
const plugins = ['sort-imports-es6-autofix'];
const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
    'sort-imports-es6-autofix/sort-imports-es6': 2,
    'prefer-const': [
        'error',
        {
            destructuring: 'all',
        },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
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
};

const testing = {
    files: [
        `**/*.{spec,test}.{${extensions.join(',')}}`,
        `**/jest.setup.{${extensions.join(',')}}`,
    ],
    env: {
        'jest': true,
        'jest/globals': true,
    },
    rules: {
        ...rules,
        'no-console': 0,
        'sort-imports-es6-autofix/sort-imports-es6': 2,
        'jest/no-try-expect': 0,
        'jest/no-conditional-expect': 0,
        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-identical-functions': 0,
        'sonarjs/cognitive-complexity': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-implied-eval': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/unbound-method': 0,
    },
    extends: [...extendsList, 'plugin:jest/recommended', 'plugin:jest/style'],
};

module.exports = {
    files: extensions.map((extension) => `**/*${extension}`),
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    env: { node: true, es2021: true },
    plugins,
    extends: extendsList,
    rules,
    overrides: [testing],
    ignorePatterns: ['*.shim.d.ts'],
};

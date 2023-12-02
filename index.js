const plugins = [
    'simple-import-sort',
    'unused-imports',
    'optimize-regex',
    'sort-keys-fix',
];
const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:markdown/recommended',
    'plugin:n/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:typescript-sort-keys/recommended',
    'plugin:unicorn/recommended',
    // prettier must come last
    'plugin:prettier/recommended',
    'prettier',
];
const defaultRules = {
    'no-console': 1,
    'prefer-destructuring': 2,
    'curly': 2,
    'eqeqeq': 2,
    'prefer-const': [
        'error',
        {
            destructuring: 'all',
        },
    ],
    'no-magic-numbers': 0,
    'no-unused-vars': 0,
    'no-unused-expressions': 0,
    'no-useless-constructor': 0,
    'no-throw-literal': 0,
    'sort-keys-fix/sort-keys-fix': [
        'error',
        'asc',
        { caseSensitive: true, natural: true },
    ],
};

const tsRules = {
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-indexed-object-style': 2,
    '@typescript-eslint/consistent-type-definitions': 1,
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'interface',
            format: ['PascalCase'],
            custom: { regex: '^I[A-Z]', match: false },
        },
    ],
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extra-non-null-assertion': 2,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreIIFE: true, ignoreVoid: true },
    ],
    '@typescript-eslint/no-for-in-array': 2,
    '@typescript-eslint/no-inferrable-types': 2,
    '@typescript-eslint/no-magic-numbers': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-redundant-type-constituents': 1,
    '@typescript-eslint/no-require-imports': 1,
    '@typescript-eslint/no-this-alias': 2,
    '@typescript-eslint/no-throw-literal': 1,
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
    '@typescript-eslint/no-unnecessary-condition': 2,
    '@typescript-eslint/no-unnecessary-qualifier': 1,
    '@typescript-eslint/no-unnecessary-type-arguments': 2,
    '@typescript-eslint/no-unsafe-enum-comparison': 0,
    '@typescript-eslint/no-unused-expressions': 1,
    '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'all', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-useless-constructor': 1,
    '@typescript-eslint/no-useless-empty-export': 1,
    '@typescript-eslint/prefer-for-of': 1,
    '@typescript-eslint/prefer-includes': 1,
    '@typescript-eslint/prefer-nullish-coalescing': 2,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/require-await': 2,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/switch-exhaustiveness-check': 1,
};

const rules = {
    ...defaultRules,
    ...tsRules,
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 2,
    'eslint-disable prefer-destructuring': 0,
    'import/default': 0,
    'import/first': 2,
    'import/named': 0,
    'import/namespace': 0,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/no-named-as-default-member': 0,
    'n/no-extraneous-import': 0,
    'n/no-missing-import': 0,
    'n/no-process-exit': 0,
    'no-unused-vars': 2,
    'object-shorthand': 2,
    'optimize-regex/optimize-regex': 'warn',
    'prefer-template': 1,
    'simple-import-sort/exports': 2,
    'simple-import-sort/imports': 2,
    'sonarjs/elseif-without-else': 0,
    'sonarjs/no-identical-functions': ['error', 20],
    'unicorn/catch-error-name': 0,
    'unicorn/explicit-length-check': 0,
    'unicorn/no-array-callback-reference': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-null': 0,
    'unicorn/no-process-exit': 0,
    'unicorn/no-useless-undefined': 0,
    'unicorn/prefer-module': 0,
    'unicorn/prevent-abbreviations': 0,
    'unused-imports/no-unused-imports': 2,
};
const extensions = 'ts,tsx,js,jsx,md,mdx';

const testing = {
    files: [
        `**/*.{spec,test}.{${extensions}}`,
        `**/{tests,test,__tests__,__mock__,__mocks__}/*.{${extensions}}`,
    ],
    rules: {
        ...rules,
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
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/unbound-method': 0,
        'sonarjs/cognitive-complexity': 0,
        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-identical-functions': 0,
        'typescript-eslint/no-confusing-void-expression': 0,
        'unicorn/error-message': 0,
        'unicorn/no-await-expression-member': 0,
    },
    extends: extendsList,
};

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    env: { node: true, es2023: true },
    plugins,
    extends: extendsList,
    rules,
    overrides: [testing],
    ignorePatterns: ['*.d.ts', '.eslintrc.js'],
};

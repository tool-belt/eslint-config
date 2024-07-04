import globals from 'globals';
import eslintJS from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintTS from 'typescript-eslint';
import eslintSvelte from 'eslint-plugin-svelte';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginJSDoc from 'eslint-plugin-jsdoc';
import eslintPluginMarkdown from 'eslint-plugin-markdown';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y';
function createForExtensions(globPatterns, extensions) {
    return extensions.flatMap((ext) => globPatterns.flatMap((pattern) => `${pattern}.${ext}`));
}
export function createConfig({ tsconfigRootDir = '.', browser = false, react = false, svelte = false, project = ['./tsconfig.json'], ecmaVersion = 2024, ...restParserOptions }) {
    if (svelte && react) {
        throw new Error('Cannot use both react and svelte for the same configuration');
    }
    return [
        eslintJS.configs.recommended,
        {
            ignores: [
                'dist/',
                'build/',
                '.svelte-kit/',
                'node_modules/',
                'public/',
            ],
            languageOptions: {
                globals: {
                    ...(browser || react || svelte ? globals.browser : {}),
                    ...globals.node,
                },
            },
            rules: {
                'no-console': 'warn',
                'prefer-destructuring': 'error',
                'curly': 'error',
                'eqeqeq': 'error',
                'prefer-const': [
                    'error',
                    {
                        destructuring: 'all',
                    },
                ],
                'no-unused-vars': 'error',
                'object-shorthand': 'error',
                'prefer-template': 'warn',
            },
        },
        ...eslintTS.configs.strictTypeChecked,
        ...eslintTS.configs.stylisticTypeChecked,
        {
            languageOptions: {
                parserOptions: {
                    project,
                    parser: '@typescript-eslint/parser',
                    tsconfigRootDir,
                    ecmaVersion,
                    ...restParserOptions,
                    ...(svelte ? { extraFileExtensions: ['.svelte'] } : {}),
                    ...(react ? { ecmaFeatures: { jsx: true } } : {}),
                },
            },
            rules: {
                '@typescript-eslint/array-type': [
                    'error',
                    { default: 'array' },
                ],
                '@typescript-eslint/consistent-indexed-object-style': 'error',
                '@typescript-eslint/consistent-type-definitions': 'warn',
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'interface',
                        format: ['PascalCase'],
                        custom: { regex: '^I[A-Z]', match: false },
                    },
                ],
                '@typescript-eslint/no-extra-non-null-assertion': 'error',
                '@typescript-eslint/no-floating-promises': [
                    'error',
                    { ignoreIIFE: true, ignoreVoid: true },
                ],
                '@typescript-eslint/no-for-in-array': 'error',
                '@typescript-eslint/no-inferrable-types': 'error',
                '@typescript-eslint/no-redundant-type-constituents': 'warn',
                '@typescript-eslint/no-require-imports': 'warn',
                '@typescript-eslint/no-this-alias': 'error',
                '@typescript-eslint/no-throw-literal': 'warn',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-condition': 'error',
                '@typescript-eslint/no-unnecessary-qualifier': 'warn',
                '@typescript-eslint/no-unnecessary-type-arguments': 'error',
                '@typescript-eslint/no-unused-expressions': 'warn',
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    { args: 'all', argsIgnorePattern: '^_' },
                ],
                '@typescript-eslint/no-useless-constructor': 'warn',
                '@typescript-eslint/no-useless-empty-export': 'warn',
                '@typescript-eslint/prefer-for-of': 'warn',
                '@typescript-eslint/prefer-includes': 'warn',
                '@typescript-eslint/prefer-nullish-coalescing': 'error',
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/require-await': 'error',
                '@typescript-eslint/switch-exhaustiveness-check': 'warn',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/prefer-as-const': 'warn',
            },
        },
        {
            files: createForExtensions([
                '**/*.{spec,test}',
                '**/{tests,test,__tests__,__mock__,__mocks__}/*',
            ], ['ts', react ? 'tsx' : '', svelte ? 'svelte' : ''].filter(Boolean)),
            rules: {
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/require-await': 'off',
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/prefer-as-const': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/no-floating-promises': 'off',
                '@typescript-eslint/no-implied-eval': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
                '@typescript-eslint/no-misused-promises': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
                'typescript-eslint/no-confusing-void-expression': 'off',
                'unicorn/error-message': 'off',
                'unicorn/no-await-expression-member': 'off',
            },
        },
        ...(!svelte && !react && !browser
            ? [
                eslintPluginNode.configs.recommended,
                {
                    rules: {
                        'n/no-extraneous-import': 'error',
                        'n/no-missing-import': 'error',
                        'n/no-process-exit': 'error',
                    },
                },
            ]
            : []),
        eslintPluginPrettierRecommended,
        eslintPluginJSDoc.configs['recommended-typescript'],
        eslintPluginMarkdown.configs.recommended,
        eslintPluginUnicorn.configs['flat/recommended'],
        {
            rules: {
                'unicorn/catch-error-name': 'off',
                'unicorn/explicit-length-check': 'off',
                'unicorn/no-array-callback-reference': 'off',
                'unicorn/no-array-for-each': 'off',
                'unicorn/no-array-reduce': 'off',
                'unicorn/no-null': 'off',
                'unicorn/no-process-exit': 'off',
                'unicorn/no-useless-undefined': 'off',
                'unicorn/prefer-module': 'off',
                'unicorn/prevent-abbreviations': 'off',
            },
        },
        eslintPluginPromise.configs['flat/recommended'],
        ...(react
            ? [
                eslintPluginReact.configs.recommended,
                eslintPluginJSXA11y.configs.recommended,
            ]
            : []),
        {
            plugins: {
                'simple-import-sort': eslintPluginSimpleImportSort,
                'unused-imports': eslintPluginUnusedImports,
            },
            rules: {
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',
                'unused-imports/no-unused-imports': 'error',
            },
        },
        ...(svelte
            ? [
                ...eslintSvelte.configs['flat/recommended'],
                eslintConfigPrettier,
                ...eslintSvelte.configs['flat/prettier'],
                {
                    files: ['**/*.svelte'],
                    languageOptions: {
                        parserOptions: {
                            parser: eslintTS.parser,
                        },
                    },
                },
            ]
            : [eslintConfigPrettier]),
    ];
}

/* eslint-disable unicorn/no-await-expression-member,@typescript-eslint/no-unsafe-member-access */
import eslintJS from '@eslint/js';
import type { Linter } from 'eslint';
// @ts-expect-error, untyped import
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginJSDoc from 'eslint-plugin-jsdoc';
// @ts-expect-error, untyped import
import eslintPluginMarkdown from 'eslint-plugin-markdown';
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// @ts-expect-error, untyped import
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-expect-error, untyped import
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
// @ts-expect-error, untyped import
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import eslintTS from 'typescript-eslint';

/**
 *
 * @param globPatterns - The file patterns to append the provided extensions to.
 * @param extensions - The file extensions to append to the provided glob patterns.
 * @returns A list of file patterns with the provided extensions.
 */
function createForExtensions(
    globPatterns: string[],
    extensions: string[],
): string[] {
    return extensions.flatMap((ext) =>
        globPatterns.flatMap((pattern) => `${pattern}.${ext}`),
    );
}

/**
 * Asynchronously creates a configuration array for ESLint based on the provided options.
 * This configuration is tailored to support JavaScript, TypeScript, and optionally React, Svelte, and browser environments.
 * It integrates various ESLint plugins and configurations to enforce code quality and style.
 * @param options - The configuration options.
 * @param [options.tsconfigRootDir] - The root directory for the TypeScript configuration files.
 * @param [options.browser] - Flag to indicate if the environment should be configured for browser globals.
 * @param [options.react] - Flag to indicate if React specific linting rules should be applied.
 * @param [options.svelte] - Flag to indicate if Svelte specific linting rules should be applied.
 * @param [options.node] - Flag to indicate if Node.js specific linting rules should be applied.
 * @param [options.project] - The path(s) to the TypeScript configuration file(s).
 * @param [options.ecmaVersion] - The ECMAScript version to be used.
 * @returns A promise that resolves to an array of ESLint configurations.
 * @throws {Error} If both React and Svelte options are set to true.
 */
export async function createConfig({
    tsconfigRootDir = '.',
    browser = false,
    react = false,
    svelte = false,
    node = false,
    project = ['./tsconfig.json'],
    ecmaVersion = 2024,
    ...restParserOptions
}: {
    browser?: boolean;
    react?: boolean;
    svelte?: boolean;
    node?: boolean;
} & Linter.ParserOptions = {}): Promise<Linter.FlatConfig[]> {
    if (svelte && react) {
        throw new Error(
            'Cannot use both react and svelte for the same configuration',
        );
    }

    const configNode = node
        ? [
              eslintPluginNode.configs['flat/recommended-module'],
              {
                  rules: {
                      'n/no-extraneous-import': 'error',
                      'n/no-missing-import': 'error',
                      'n/no-process-exit': 'error',
                  },
              },
          ]
        : [];

    const configPrettier = svelte
        ? [
              ...(await import('eslint-plugin-svelte')).configs[
                  'flat/recommended'
              ],
              eslintPluginPrettierRecommended,
              eslintConfigPrettier,
              ...(await import('eslint-plugin-svelte')).configs[
                  'flat/prettier'
              ],
              {
                  files: ['**/*.svelte'],
                  languageOptions: {
                      parserOptions: {
                          parser: eslintTS.parser,
                      },
                  },
              },
          ]
        : [eslintPluginPrettierRecommended, eslintConfigPrettier];

    const configReact = react
        ? [
              // @ts-expect-error, untyped import
              (await import('eslint-plugin-react')).configs.recommended,
              // @ts-expect-error, untyped import
              (await import('eslint-plugin-jsx-a11y')).configs.recommended,
          ]
        : [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
                '@typescript-eslint/no-unnecessary-boolean-literal-compare':
                    'error',
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
                '@typescript-eslint/no-explicit-any': 'off',
                'n/no-missing-import': 'off',
            },
        },
        {
            files: createForExtensions(
                [
                    '**/*.{spec,test}',
                    '**/{tests,test,__tests__,__mock__,__mocks__}/*',
                ],
                ['ts', react ? 'tsx' : '', svelte ? 'svelte' : ''].filter(
                    Boolean,
                ),
            ),
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
        ...configNode,
        eslintPluginJSDoc.configs['flat/recommended-typescript'],
        eslintPluginPromise.configs['flat/recommended'],
        eslintPluginUnicorn.configs['flat/recommended'],
        {
            plugins: {
                'simple-import-sort': eslintPluginSimpleImportSort,
                'unused-imports': eslintPluginUnusedImports,
                'markdown': eslintPluginMarkdown,
            },
            rules: {
                'jsdoc/no-defaults': 'off',
                'jsdoc/no-types': 'off',
                'jsdoc/require-jsdoc': [
                    'error',
                    {
                        publicOnly: true,
                    },
                ],
                'simple-import-sort/exports': 'error',
                'simple-import-sort/imports': 'error',
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
                'unused-imports/no-unused-imports': 'error',
            },
        },
        {
            files: ['**/*.md'],
            processor: 'markdown/markdown',
        },
        ...configReact,
        ...configPrettier,
    ] satisfies Linter.FlatConfig[];
}

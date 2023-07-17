# ESLint Config @tool-belt

This is an opinionated eslint config meant for TypeScript based projects. It bundles the following plugins:

-   `eslint-config-prettier`
-   `eslint-plugin-eslint-comments`
-   `eslint-plugin-import`
-   `eslint-plugin-jsx-a11y`
-   `eslint-plugin-n`
-   `eslint-plugin-optimize-regex`
-   `eslint-plugin-prettier`
-   `eslint-plugin-promise`
-   `eslint-plugin-react-hooks`
-   `eslint-plugin-react`
-   `eslint-plugin-simple-import-sort`
-   `eslint-plugin-sonarjs`
-   `eslint-plugin-testing-library`
-   `eslint-plugin-tsdoc`
-   `eslint-plugin-unicorn`
-   `eslint-plugin-unused-imports`

## Installation

```bash
pnpm add -D @tool-belt/eslint-config
```

Also make sure to have the following peer-dependencies installed:

-   `@typescript-eslint/eslint-plugin`
-   `@typescript-eslint/parser`
-   `eslint-import-resolver-typescript`
-   `eslint`
-   `prettier`
-   `typescript`

The config exposes two configs - a base one, without react, and a react configuraiton which extends the base config. When using node or a frontend framework other than react, simply extend the base configuration:

```javascript
// eslint.config.js
module.exports = {
    extends: ['@tool-belt/eslint-config'],
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['**/*.js', '*.js'],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
};
```

## React

The react config includes the base config, browser globals, react and react-hooks. To use it simply switch the extends in the above example:

```javascript
// eslint.config.js
module.exports = {
    extends: ['@tool-belt/eslint-config/react'],
    // ...
};
```

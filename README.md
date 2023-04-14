# ESLint Config @tool-belt

This is an opinionated eslint config meant for TypeScript based projects. It bundles the following plugins:

-   `@typescript-eslint/eslint-plugin`
-   `eslint-config-prettier`
-   `eslint-plugin-eslint-comments`
-   `eslint-plugin-import`
-   `eslint-plugin-prettier`
-   `eslint-plugin-simple-import-sort`
-   `eslint-plugin-sonarjs`

## Installation

```bash
yarn add --dev @tool-belt/eslint-config
```

or

```bash
npm i --save-dev @tool-belt/eslint-config
```

Also make sure to have `prettier` and of course `typescript` and `eslint` installed as well.
Then add the following config to your extend array in your eslint config file.

```javascript
// eslint.config.js
module.exports = {
    extends: ['@tool-belt/eslint-config'],
    parserOptions: {
        project: './tsconfig.json',
    },
};
```

## React

The react config includes the base config, browser globals, react, react-hooks and testing-library/react. To use it simply

```javascript
// eslint.config.js
module.exports = {
    extends: ['@tool-belt/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json',
    },
};
```

**IMPORTANT**:

-   If you use path aliases, you will need to setup a path resolver for the eslint-plugin-import package or turn off some of its rules. There is a resolver for [node](https://www.npmjs.com/package/eslint-import-resolver-node), [typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript), [babel](https://www.npmjs.com/package/eslint-import-resolver-babel-module), [webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) etc.

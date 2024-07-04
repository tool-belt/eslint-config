# @tool-belt/eslint-config

`@tool-belt/eslint-config` is a comprehensive ESLint configuration library designed to streamline the setup of ESLint
for various JavaScript and TypeScript projects. It includes support for React, Svelte, and Node.js environments and
integrates with Prettier for code formatting.

## Installation

To install the library, use npm:

```bash
npm install @tool-belt/eslint-config
```

## Usage

The `createConfig` function generates an ESLint flat config based on the provided options. Below is an
example `eslint.config.js` file using `@tool-belt/eslint-config`:

```javascript
import { createConfig } from '@tool-belt/eslint-config';

export default await createConfig();
```

## Configuration Options

The `createConfig` function accepts an options object to customize the ESLint configuration. The available options are:

- `tsconfigRootDir`: The root directory of the TypeScript configuration. Default is `.`.
- `browser`: A boolean indicating if the configuration is for a browser environment. Default is `false`.
- `react`: A boolean indicating if the configuration is for a React project. Default is `false`.
- `svelte`: A boolean indicating if the configuration is for a Svelte project. Default is `false`.
- `project`: An array of paths to the TypeScript project configuration files. Default is `['./tsconfig.json']`.
- `ecmaVersion`: The ECMAScript version to use. Default is `2024`.

Additionally, you can pass any `ParserOptions` from the ESLint configuration.

### Example with Custom Options

Here is an example of using `createConfig` with custom options:

```javascript
import { createConfig } from '@tool-belt/eslint-config';

const config = await createConfig({
    tsconfigRootDir: './src',
    browser: true,
    react: true,
    project: ['./tsconfig.app.json'],
    ecmaVersion: 2021,
});

export default config;
````

## Rules and Plugins

The configuration provided by `@tool-belt/eslint-config` includes rules and plugins from various ESLint plugins to
enforce best practices and coding standards.

### Included Plugins

- `eslint-plugin-jsdoc`: Enforces JSDoc comments.
- `eslint-plugin-markdown`: Lints JavaScript code blocks within Markdown files.
- `eslint-plugin-n`: Provides Node.js specific linting rules.
- `eslint-plugin-prettier/recommended`: Integrates Prettier for code formatting.
- `eslint-plugin-promise`: Enforces best practices for working with Promises.
- `eslint-plugin-simple-import-sort`: Ensures import statements are sorted.
- `eslint-plugin-unicorn`: Enforces various stylistic and best practice rules.
- `eslint-plugin-unused-imports`: Removes unused imports.
- `eslint-plugin-react`: Lints React code (when `react` option is true).
- `eslint-plugin-jsx-a11y`: Enforces accessibility rules for JSX (when `react` option is true).
- `eslint-plugin-svelte`: Lints Svelte code (when `svelte` option is true).

## Ignored Paths

The following paths are ignored by default:

- `dist/`
- `build/`
- `.svelte-kit/`
- `node_modules/`
- `public/`

## Additional Configuration

### TypeScript Support

The configuration includes strict and stylistic type-checking rules from `@typescript-eslint`.

### Prettier Integration

The configuration ensures compatibility with Prettier by including `eslint-config-prettier`
and `eslint-plugin-prettier/recommended`.

## Error Handling

If both `react` and `svelte` options are set to `true`, an error is thrown:

```javascript
throw new Error('Cannot use both react and svelte for the same configuration');
```

## Contributing
This project is open to contributions. Please read the [Contributing Guidelines](CONTRIBUTING.md) for more information.
const base = require('./index');

const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:eslint-comments/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier',
];
const reactRules = {
    'react-hooks/exhaustive-deps': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/jsx-key': 2,
};

const rules = {
    ...reactRules,
    'react/react-in-jsx-scope': 0,
    'unicorn/prefer-node-protocol': 0,
};

const testPlugins = ['plugin:testing-library/react'];

const overrides = base.overrides.map((override) => ({
    ...override,
    extends: override.files[0].includes('*.js')
        ? override.files[0].includes('test')
            ? [
                  ...extendsList.filter(
                      (extendEntry) => !extendEntry.includes('typescript'),
                  ),
                  ...testPlugins,
              ]
            : extendsList.filter(
                  (extendEntry) => !extendEntry.includes('typescript'),
              )
        : override.files[0].includes('test')
          ? [...extendsList, ...testPlugins]
          : extendsList,
    rules: {
        ...override.rules,
        ...rules,
    },
}));

module.exports = {
    ...base,
    env: { es2022: true, browser: true, node: true },
    overrides,
    settings: {
        react: {
            version: 'detect',
        },
    },
};

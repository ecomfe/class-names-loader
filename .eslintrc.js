module.exports = {
    extends: [
        '@ecomfe/eslint-config/strict',
        '@ecomfe/eslint-config/typescript/strict',
    ],
    plugins: [
        'jest',
    ],
    env: {
        'jest/globals': true,
    },
    ignorePatterns: [
        '**/output/*',
    ],
};

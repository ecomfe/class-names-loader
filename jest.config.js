module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/__tests__/**/*.test.js',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/*.ts',
    ],
};

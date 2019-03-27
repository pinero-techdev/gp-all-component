module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['./setupJest.ts'],
    globals: {
        'ts-jest': {
            tsConfig: 'projects/gp-all-component-tester/tsconfig.spec.json',
        },
    },
    testMatch: ['**/**.spec.ts'],
};

export default [
    {
        ignores: ['**/node_modules/**', '**/build/**', '**/dist/**']
    },
    {
        rules: {
            quotes: ['warn', 'single'],
            semi: ['warn', 'always'],
            'no-console': 'warn',
            'no-unused-vars': 'off',
            'prefer-const': 'error',
            'comma-dangle': ['warn', 'never']
        }
    }
];

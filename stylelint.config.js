module.exports = {
    extends: [
        // Override rules that would interfere with Prettier
        // https://github.com/shannonmoeller/stylelint-config-prettier
        'stylelint-prettier/recommended',
    ],
    plugins: [
        // Bring in some extra rules for SCSS
        'stylelint-scss',
        'stylelint-prettier',
    ],
    rules: {
        'prettier/prettier': true,
    },
};

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'airbnb-base',
    ],
    plugins: ['@typescript-eslint'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
    },
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-console': 'off',
        'no-bitwise': 'off',
        'no-tabs': 'off',
        'array-element-newline': ['warn', 'consistent'],
        indent: ['warn', 4, { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
        quotes: ['warn', 'single'],
        'comma-dangle': ['warn', 'always-multiline'],
        'object-curly-spacing': ['warn', 'always'],
        'max-len': ['warn', 120],
        'no-new': 'off',
        'linebreak-style': 'off',
        'import/extensions': 'off',
        'eol-last': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'warn',
        'import/no-cycle': 'off',
        'arrow-parens': 'off',
        semi: ['error', 'never'],
        eqeqeq: 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-continue': 'off',
        'prefer-destructuring': 'off',
        'no-plusplus': 'off',
        'prefer-const': 'off',
        'global-require': 'off',
        'no-prototype-builtins': 'off',
        'consistent-return': 'off',
        'vue/require-component-is': 'off',
        'prefer-template': 'off',
        'one-var-declaration-per-line': 'off',
        'one-var': 'off',
        'import/named': 'off',
        'object-curly-newline': 'off',
        'default-case': 'off',
        'import/order': 'off',
        'no-trailing-spaces': 'off',
        'func-names': 'off',
        radix: 'off',
        'no-unused-expressions': 'off',
        'no-underscore-dangle': 'off',
        'no-nested-ternary': 'off',
        'no-restricted-syntax': 'off',
        'no-mixed-operators': 'off',
        'no-await-in-loop': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'no-case-declarations': 'off',
        'template-curly-spacing': 'off',
        'vue/valid-v-for': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-empty': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'guard-for-in': 'off',
        '@typescript-eslint/ban-types': 'off',
        'class-methods-use-this': 'off',
        'no-return-await': 'off',
        'no-multiple-empty-lines': 'warn', // 最多空一行
        'no-multi-spaces': 'warn', // 单行多余空格警告
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'semi-style': ['warn', 'first'],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/v-on-event-hyphenation': [
            'warn',
            'never',
            {
                autofix: true,
                ignore: [],
            },
        ],
        'vue/attribute-hyphenation': [
            'warn',
            'never',
            {
                ignore: [],
            },
        ],
        'vue/html-indent': ['warn', 4],
        'vue/html-quotes': ['warn', 'single'],
        'vue/max-attributes-per-line': ['warn', {
            singleline: {
                max: 3,
            },      
            multiline: {
                max: 1,
            },
        }],
        'vue/html-self-closing': ['warn', {
            html: {
                void: 'always',
                normal: 'never',
                component: 'always',
            },
            svg: 'always',
            math: 'always',
        }],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
}
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

import sharedConfig from '../eslint.config.mjs';

// /. imports

export default defineConfig(sharedConfig, eslintConfigPrettier, {
    extends: [tseslint.configs.recommended],
    plugins: {
        prettier: prettierPlugin
    },
    languageOptions: {
        parserOptions: {
            project: './tsconfig.json',
            tsconfigRootDir: import.meta.dirname
        },
        globals: {
            ...globals.node,
            ...globals.jest
        }
    },
    rules: {
        'prettier/prettier': ['warn', { endOfLine: 'auto' }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
});

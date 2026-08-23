import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

import sharedConfig from '../eslint.config.mjs';

// /. imports

export default defineConfig(
    sharedConfig,
    eslintConfigPrettier,
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            import: importPlugin,
            prettier: prettierPlugin
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser
            },
            parserOptions: {
                ecmaFeatures: { jsx: true }
            }
        },
        settings: {
            react: {
                version: 'detect'
            },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    paths: ['src']
                }
            }
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...importPlugin.configs.errors.rules,
            ...importPlugin.configs.warnings.rules,
            ...importPlugin.configs.typescript.rules,

            'prettier/prettier': ['warn', { endOfLine: 'auto' }],
            'jsx-quotes': ['warn', 'prefer-double'],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type'
                    ],
                    'newlines-between': 'always-and-inside-groups'
                }
            ],
            'react-hooks/exhaustive-deps': 'warn',
            'react/react-in-jsx-scope': 'off'
        }
    }
);

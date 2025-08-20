import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import configPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const compat = new FlatCompat();

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  prettierRecommended,
  ...compat.extends('eslint-config-standard'),
  {
    name: 'baseOptions',
    ignores: ['eslint.config.mjs', 'node_modules/', 'build/', 'dist/'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        env: {
          node: true,
          jest: true,
        },
      },
      globals: {
        ...globals.commonjs,
      },
    },
  },
  {
    name: 'simple-import-sort',
    plugins: { 'simple-import-sort': simpleImportSort, import: importPlugin },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000', '^@?\\w'],
            // Parent imports. Put `..` last.
            ['^@/.*$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\.(?!/?$)', '^\\./(?=.*/)(?!/?$)', '^\\./?$'],
            // Style imports.
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    name: 'general-rules',
    rules: {
      'require-await': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: ['error', 'single'],
      complexity: ['error', { max: 15 }],
      'no-empty-function': ['error', { allow: ['constructors'] }],
      camelcase: 'off',
      'no-useless-constructor': 'off',
      'dot-notation': [1, { allowPattern: '^[a-zA-Z]+(_[a-zA-Z]+)*$' }],
    },
  },
  {
    name: 'prettier',
    rules: {
      'prettier/prettier': [
        'error',
        {},
        { usePrettierrc: true, endOfLine: 'auto', parser: 'flow' },
      ],
    },
  },
  configPrettier,
];

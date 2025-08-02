// /** @format */

// import playwright from "eslint-plugin-playwright";
// import typescriptParser from "@typescript-eslint/parser";
// import typescriptPlugin from "@typescript-eslint/eslint-plugin";

// export default [
// 	{
// 		files: ["**/tests/**/*.ts", "**/src/**/*.ts", "eslint.config.mjs"],

// 		// Set the parser for TypeScript
// 		languageOptions: {
// 			parser: typescriptParser,
// 			ecmaVersion: "latest",
// 			sourceType: "module",
// 		},

// 		// Explicitly define the plugins used
// 		plugins: {
// 			"@typescript-eslint": typescriptPlugin,
// 			playwright,
// 		},

// 		// Include both Playwright and TypeScript rules
// 		rules: {
// 			...typescriptPlugin.configs.recommended.rules, // TypeScript rules
// 			...playwright.configs["flat/recommended"].rules, // Playwright rules

// 			// Disable the no-explicit-any rule globally
// 			"@typescript-eslint/no-explicit-any": "off",
// 			// "@typescript-eslint/no-unused-vars": "warn",

// 			// Additional Playwright-specific rules (or overrides)
// 			"playwright/expect-expect": "off",
// 			"playwright/max-expects": ["warn", { max: 5 }],
// 			"playwright/max-nested-describe": ["error", { max: 2 }],
// 			"playwright/missing-playwright-await": "error",
// 			"playwright/no-commented-out-tests": "warn",
// 			"playwright/no-conditional-expect": "off",
// 			"playwright/no-conditional-in-test": "off",
// 			"playwright/no-duplicate-hooks": "warn",
// 			"playwright/no-element-handle": "error",
// 			"playwright/no-eval": "error",
// 			"playwright/no-focused-test": "error",
// 			"playwright/no-force-option": "error",
// 			"playwright/no-get-by-title": "warn",
// 			"playwright/no-hooks": "off",
// 			"playwright/no-nested-step": "error",
// 			"playwright/no-networkidle": "error",
// 			"playwright/no-nth-methods": "off",
// 			"playwright/no-page-pause": "error",
// 			"playwright/no-raw-locators": "off",
// 			"playwright/no-restricted-matchers": "warn",
// 			"playwright/no-skipped-test": "error",
// 			"playwright/no-standalone-expect": "error",
// 			"playwright/no-unsafe-references": "error",
// 			"playwright/no-useless-await": "warn",
// 			"playwright/no-useless-not": "warn",
// 			"playwright/no-wait-for-selector": "warn",
// 			"playwright/no-wait-for-timeout": "warn",
// 			"playwright/prefer-comparison-matcher": "warn",
// 			"playwright/prefer-equality-matcher": "warn",
// 			"playwright/prefer-hooks-in-order": "warn",
// 			"playwright/prefer-hooks-on-top": "warn",
// 			"playwright/prefer-native-locators": "warn",
// 			"playwright/prefer-locator": "warn",
// 			"playwright/prefer-strict-equal": "warn",
// 			"playwright/prefer-to-be": "warn",
// 			"playwright/prefer-to-contain": "warn",
// 			"playwright/prefer-to-have-count": "warn",
// 			"playwright/prefer-to-have-length": "warn",
// 			"playwright/prefer-web-first-assertions": "error",
// 			"playwright/require-hook": "warn",
// 			"playwright/require-soft-assertions": "warn",
// 			"playwright/require-to-throw-message": "warn",
// 			"playwright/require-top-level-describe": "warn",
// 			"playwright/valid-describe-callback": "error",
// 			"playwright/valid-expect-in-promise": "error",
// 			"playwright/valid-expect": "error",
// 			"playwright/valid-title": "warn",

// 			semi: ["error", "always"],

// 			// "no-unused-vars": [
// 			// 	"warn",
// 			// 	{
// 			// 		vars: "all",
// 			// 		args: "after-used",
// 			// 		ignoreRestSiblings: false,
// 			// 		caughtErrors: "all",
// 			// 	},
// 			// ],

// 			"no-unused-vars": "off", // Disable built-in rule
// 			"@typescript-eslint/no-unused-vars": [
// 				"warn",
// 				{
// 					vars: "all",
// 					args: "after-used",
// 					ignoreRestSiblings: false,
// 					caughtErrors: "all",
// 				},
// 			],

// 			// "@typescript-eslint/no-unused-vars-experimental": "warn",

// 			quotes: ["error", "double"], // Require double quotes for strings
// 			// "comma-dangle": ["error", "always"],
// 			curly: ["error", "all"],
// 			"prefer-const": "warn",
// 			"arrow-parens": ["error", "always"],
// 			"no-var": "error",
// 			"default-case": ["error"],
// 			"no-unused-expressions": "error",
// 			"no-dupe-args": "error",
// 			"no-dupe-class-members": "error",
// 			"no-dupe-else-if": "error",
// 			"no-dupe-keys": "error",
// 			"no-duplicate-case": "error",
// 		},

// 		settings: {
// 			"import/resolver": {
// 				node: {
// 					paths: ["."], // Resolves imports from the repo root
// 				},
// 			},
// 		},
// 	},
// ];

// /** @format */

// import typescriptParser from "@typescript-eslint/parser";
// import typescriptPlugin from "@typescript-eslint/eslint-plugin";
// import playwright from "eslint-plugin-playwright";

// export default [
// 	// TypeScript rule set
// 	{
// 		files: ["**/*.ts", "eslint.config.mjs"],

// 		ignores: ["node_modules/**", "dist/**"],
// 		// files: ["**/src/**/*.ts", "eslint.config.mjs"],
// 		languageOptions: {
// 			parser: typescriptParser,
// 			ecmaVersion: "latest",
// 			sourceType: "module",
// 		},
// 		plugins: {
// 			"@typescript-eslint": typescriptPlugin,
// 		},
// 		rules: {
// 			// TypeScript-specific rules
// 			"@typescript-eslint/no-explicit-any": "off",
// 			"@typescript-eslint/no-unused-vars": [
// 				"warn",
// 				{
// 					vars: "all",
// 					args: "after-used",
// 					ignoreRestSiblings: false,
// 					caughtErrors: "all",
// 				},
// 			],
// 			"no-unused-vars": "off",

// 			// Generic JS rules
// 			semi: ["error", "always"],
// 			quotes: ["error", "double"],
// 			curly: ["error", "all"],
// 			"prefer-const": "warn",
// 			"arrow-parens": ["error", "always"],
// 			"no-var": "error",
// 			"default-case": "error",
// 			"no-unused-expressions": "error",
// 			"no-dupe-args": "error",
// 			"no-dupe-class-members": "error",
// 			"no-dupe-else-if": "error",
// 			"no-dupe-keys": "error",
// 			"no-duplicate-case": "error",
// 		},
// 		settings: {
// 			"import/resolver": {
// 				node: {
// 					paths: ["."],
// 				},
// 			},
// 		},
// 	},

// 	// Playwright test rules
// 	{
// 		files: ["**/tests/**/*.ts"],
// 		languageOptions: {
// 			parser: typescriptParser,
// 			ecmaVersion: "latest",
// 			sourceType: "module",
// 		},
// 		plugins: {
// 			playwright,
// 			"@typescript-eslint": typescriptPlugin,
// 		},
// 		rules: {
// 			// Playwright rules
// 			"playwright/expect-expect": "off",
// 			"playwright/max-expects": ["warn", { max: 5 }],
// 			"playwright/max-nested-describe": ["error", { max: 2 }],
// 			"playwright/missing-playwright-await": "error",
// 			"playwright/no-commented-out-tests": "warn",
// 			"playwright/no-conditional-expect": "off",
// 			"playwright/no-conditional-in-test": "off",
// 			"playwright/no-duplicate-hooks": "warn",
// 			"playwright/no-element-handle": "error",
// 			"playwright/no-eval": "error",
// 			"playwright/no-focused-test": "error",
// 			"playwright/no-force-option": "error",
// 			"playwright/no-get-by-title": "warn",
// 			"playwright/no-hooks": "off",
// 			"playwright/no-nested-step": "error",
// 			"playwright/no-networkidle": "error",
// 			"playwright/no-nth-methods": "off",
// 			"playwright/no-page-pause": "error",
// 			"playwright/no-raw-locators": "off",
// 			"playwright/no-restricted-matchers": "warn",
// 			"playwright/no-skipped-test": "error",
// 			"playwright/no-standalone-expect": "error",
// 			"playwright/no-unsafe-references": "error",
// 			"playwright/no-useless-await": "warn",
// 			"playwright/no-useless-not": "warn",
// 			"playwright/no-wait-for-selector": "warn",
// 			"playwright/no-wait-for-timeout": "warn",
// 			"playwright/prefer-comparison-matcher": "warn",
// 			"playwright/prefer-equality-matcher": "warn",
// 			"playwright/prefer-hooks-in-order": "warn",
// 			"playwright/prefer-hooks-on-top": "warn",
// 			"playwright/prefer-native-locators": "warn",
// 			"playwright/prefer-locator": "warn",
// 			"playwright/prefer-strict-equal": "warn",
// 			"playwright/prefer-to-be": "warn",
// 			"playwright/prefer-to-contain": "warn",
// 			"playwright/prefer-to-have-count": "warn",
// 			"playwright/prefer-to-have-length": "warn",
// 			"playwright/prefer-web-first-assertions": "error",
// 			"playwright/require-hook": "warn",
// 			"playwright/require-soft-assertions": "warn",
// 			"playwright/require-to-throw-message": "warn",
// 			"playwright/require-top-level-describe": "warn",
// 			"playwright/valid-describe-callback": "error",
// 			"playwright/valid-expect-in-promise": "error",
// 			"playwright/valid-expect": "error",
// 			"playwright/valid-title": "warn",

// 			"no-debugger": "error",
// 		},
// 	},
// ];

/** @format */

/** @format */

//  Working!
// import typescriptParser from "@typescript-eslint/parser";
// import typescriptPlugin from "@typescript-eslint/eslint-plugin";
// import playwright from "eslint-plugin-playwright";

// export default [
// 	{
// 		files: ["**/*.ts", "eslint.config.mjs"],
// 		ignores: ["node_modules/**", "dist/**"],

// 		languageOptions: {
// 			parser: typescriptParser,
// 			ecmaVersion: "latest",
// 			sourceType: "module",
// 		},

// 		plugins: {
// 			"@typescript-eslint": typescriptPlugin,
// 			playwright,
// 		},

// 		rules: {
// 			// ✅ TypeScript-specific rules
// 			"@typescript-eslint/no-explicit-any": "off",
// 			"@typescript-eslint/no-unused-vars": [
// 				"warn",
// 				{
// 					vars: "all",
// 					args: "after-used",
// 					ignoreRestSiblings: false,
// 					caughtErrors: "all",
// 				},
// 			],
// 			"no-unused-vars": "off",

// 			// ✅ Core JS rules
// 			"no-debugger": "error",
// 			semi: ["error", "always"],
// 			quotes: ["error", "double"],
// 			curly: ["error", "all"],
// 			"prefer-const": "warn",
// 			"arrow-parens": ["error", "always"],
// 			"no-var": "error",
// 			"default-case": "error",
// 			"no-unused-expressions": "error",
// 			"no-dupe-args": "error",
// 			"no-dupe-class-members": "error",
// 			"no-dupe-else-if": "error",
// 			"no-dupe-keys": "error",
// 			"no-duplicate-case": "error",

// 			// ✅ Playwright rules (applied globally so they catch violations in src/ too)
// 			"playwright/expect-expect": "off",
// 			"playwright/max-expects": ["warn", { max: 5 }],
// 			"playwright/max-nested-describe": ["error", { max: 2 }],
// 			"playwright/missing-playwright-await": "error",
// 			"playwright/no-commented-out-tests": "warn",
// 			"playwright/no-conditional-expect": "off",
// 			"playwright/no-conditional-in-test": "off",
// 			"playwright/no-duplicate-hooks": "warn",
// 			"playwright/no-element-handle": "error",
// 			"playwright/no-eval": "error",
// 			"playwright/no-focused-test": "error",
// 			"playwright/no-force-option": "error",
// 			"playwright/no-get-by-title": "warn",
// 			"playwright/no-hooks": "off",
// 			"playwright/no-nested-step": "error",
// 			"playwright/no-networkidle": "error",
// 			"playwright/no-nth-methods": "off",
// 			"playwright/no-page-pause": "error",
// 			"playwright/no-raw-locators": "off",
// 			"playwright/no-restricted-matchers": "warn",
// 			"playwright/no-skipped-test": "error",
// 			"playwright/no-standalone-expect": "error",
// 			"playwright/no-unsafe-references": "error",
// 			"playwright/no-useless-await": "warn",
// 			"playwright/no-useless-not": "warn",
// 			"playwright/no-wait-for-selector": "warn",
// 			"playwright/no-wait-for-timeout": "warn",
// 			"playwright/prefer-comparison-matcher": "warn",
// 			"playwright/prefer-equality-matcher": "warn",
// 			"playwright/prefer-hooks-in-order": "warn",
// 			"playwright/prefer-hooks-on-top": "warn",
// 			"playwright/prefer-native-locators": "warn",
// 			"playwright/prefer-locator": "warn",
// 			"playwright/prefer-strict-equal": "warn",
// 			"playwright/prefer-to-be": "warn",
// 			"playwright/prefer-to-contain": "warn",
// 			"playwright/prefer-to-have-count": "warn",
// 			"playwright/prefer-to-have-length": "warn",
// 			"playwright/prefer-web-first-assertions": "error",
// 			"playwright/require-hook": "warn",
// 			"playwright/require-soft-assertions": "warn",
// 			"playwright/require-to-throw-message": "warn",
// 			"playwright/require-top-level-describe": "warn",
// 			"playwright/valid-describe-callback": "error",
// 			"playwright/valid-expect-in-promise": "error",
// 			"playwright/valid-expect": "error",
// 			"playwright/valid-title": "warn",
// 		},

// 		settings: {
// 			"import/resolver": {
// 				node: {
// 					paths: ["."],
// 				},
// 			},
// 		},
// 	},
// ];

// Prettier fix
/** @format */

import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import prettierPlugin from "eslint-plugin-prettier";

import yamlParser from "yaml-eslint-parser";
import eslintPluginYml from "eslint-plugin-yml";

import jsoncPlugin from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";

import unusedImportsPlugin from "eslint-plugin-unused-imports";

export default [
    {
        files: ["**/*.ts", "eslint.config.mjs"],
        ignores: ["node_modules/**", "dist/**"],

        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig.json", // ✅ Point to your tsconfig
                tsconfigRootDir: process.cwd(), // ✅ Required for resolving correctly
            },
        },

        plugins: {
            "@typescript-eslint": typescriptPlugin,
            playwright,
            prettier: prettierPlugin,
            "unused-imports": unusedImportsPlugin,
        },

        rules: {
            // ✅ Prettier enforced via ESLint
            "prettier/prettier": "error",

            // ✅ TypeScript-specific rules
            "@typescript-eslint/no-explicit-any": "off",

            // Commenting this to add new block - to avoid conflict
            // "@typescript-eslint/no-unused-vars": [
            //     "warn",
            //     {
            //         vars: "all",
            //         args: "after-used",
            //         ignoreRestSiblings: false,
            //         caughtErrors: "all",
            //     },
            // ],
            // "no-unused-vars": "off",

            "@typescript-eslint/no-unused-vars": "off", // Disable to avoid conflict

            "unused-imports/no-unused-imports": "warn", // Auto-remove unused imports

            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            // ✅ Enforce awaiting Promises
            "@typescript-eslint/no-floating-promises": "error",

            // ✅ Core JS rules
            "no-debugger": "error",
            semi: ["error", "always"],
            quotes: ["error", "double"],
            curly: ["error", "all"],
            "prefer-const": "warn",
            "arrow-parens": ["error", "always"],
            "no-var": "error",
            "default-case": "error",
            "no-unused-expressions": "error",
            "no-dupe-args": "error",
            "no-dupe-class-members": "error",
            "no-dupe-else-if": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",

            "comma-dangle": ["error", "always-multiline"],

            // ✅ Playwright rules (global)
            "playwright/expect-expect": "off",
            "playwright/max-expects": ["warn", { max: 5 }],
            "playwright/max-nested-describe": ["error", { max: 2 }],
            "playwright/missing-playwright-await": "error",
            "@typescript-eslint/await-thenable": "error",
            "playwright/no-commented-out-tests": "off",
            "playwright/no-conditional-expect": "off",
            "playwright/no-conditional-in-test": "off",
            "playwright/no-duplicate-hooks": "warn",
            "playwright/no-element-handle": "error",
            "playwright/no-eval": "error",
            "playwright/no-focused-test": "error",
            "playwright/no-force-option": "error",
            "playwright/no-get-by-title": "warn",
            "playwright/no-hooks": "off",
            "playwright/no-nested-step": "error",
            "playwright/no-networkidle": "error",
            "playwright/no-nth-methods": "off",
            "playwright/no-page-pause": "error",
            "playwright/no-raw-locators": "off",
            "playwright/no-restricted-matchers": "warn",
            "playwright/no-skipped-test": "error",
            "playwright/no-standalone-expect": "error",
            "playwright/no-unsafe-references": "error",
            "playwright/no-useless-await": "warn",
            "playwright/no-useless-not": "warn",
            "playwright/no-wait-for-selector": "warn",
            "playwright/no-wait-for-timeout": "warn",
            "playwright/prefer-comparison-matcher": "warn",
            "playwright/prefer-equality-matcher": "warn",
            "playwright/prefer-hooks-in-order": "warn",
            "playwright/prefer-hooks-on-top": "warn",
            "playwright/prefer-native-locators": "warn",
            "playwright/prefer-locator": "warn",
            "playwright/prefer-strict-equal": "warn",
            "playwright/prefer-to-be": "warn",
            "playwright/prefer-to-contain": "warn",
            "playwright/prefer-to-have-count": "warn",
            "playwright/prefer-to-have-length": "warn",
            "playwright/prefer-web-first-assertions": "error",
            "playwright/require-hook": "warn",
            "playwright/require-soft-assertions": "warn",
            "playwright/require-to-throw-message": "warn",
            "playwright/require-top-level-describe": "warn",
            "playwright/valid-describe-callback": "error",
            "playwright/valid-expect-in-promise": "error",
            "playwright/valid-expect": "error",
            "playwright/valid-title": "warn",
        },

        settings: {
            "import/resolver": {
                node: {
                    paths: ["."],
                },
            },
        },
    },
    // ✅ Strict JSON files
    {
        files: ["*.json", "**/*.json"],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            jsonc: jsoncPlugin,
        },
        rules: {
            "jsonc/indent": ["error", 4],
            "jsonc/key-spacing": [
                "error",
                { beforeColon: false, afterColon: true },
            ],
            "jsonc/object-curly-spacing": ["error", "always"],
            "jsonc/quotes": ["error", "double"],
            "jsonc/comma-dangle": ["error", "never"], // <-- NO trailing commas
            "jsonc/no-dupe-keys": "error",
            // "jsonc/no-comments": "warn", // 🚫 Comments are invalid in .json
        },
    },

    // ✅ JSONC (e.g., tsconfig.json or ESLint config files that allow comments)
    {
        files: ["*.jsonc", "**/*.jsonc"],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            jsonc: jsoncPlugin,
        },
        rules: {
            "jsonc/indent": ["error", 4],
            "jsonc/key-spacing": [
                "error",
                { beforeColon: false, afterColon: true },
            ],
            "jsonc/object-curly-spacing": ["error", "always"],
            "jsonc/quotes": ["error", "double"],
            "jsonc/comma-dangle": ["error", "always-multiline"],
            "jsonc/no-dupe-keys": "error",
            // no "jsonc/no-comments" here, since comments are allowed in .jsonc
        },
    },
    // // YAML linting config
    ...eslintPluginYml.configs["flat/recommended"], // or use "flat/standard" for more rules
    {
        // files: ["**/*.yaml", "**/*.yml"],
        files: ["*.yaml", "*.yml", "**/*.yaml", "**/*.yml"],
        languageOptions: {
            parser: yamlParser,
        },

        plugins: {
            yml: eslintPluginYml,
        },

        // YAML linting config
        // ...eslintPluginYml.configs["flat/recommended"], // or use "flat/standard" for more rules
        rules: {
            // 🟩 BLOCK STYLE RULES
            "yml/block-mapping-colon-indicator-newline": "error", // enforce newline after colon in mappings
            "yml/block-mapping-question-indicator-newline": "error", // enforce newline after question mark in mappings
            "yml/block-mapping": ["error", "always"], // enforce block style mappings (not flow style)
            "yml/block-sequence-hyphen-indicator-newline": "error", // enforce newline after hyphen in sequences
            "yml/block-sequence": ["error", "always"], // enforce block style sequences (not inline)

            // 🟩 FILE AND INDENTATION
            "yml/indent": ["error", 4], // enforce 2-space indentation
            // "yml/no-tab-indent": "error", // disallow tab-based indentation

            // 🟩 KEYS AND STRUCTURE
            "yml/require-string-key": "error", // keys must be strings
            // "yml/sort-keys": "warn", // suggest keys be sorted alphabetically
            "yml/no-empty-key": "error", // disallow empty keys

            // 🟩 SEQUENCES
            "yml/no-empty-sequence-entry": "error", // disallow empty list items
            // "yml/sort-sequence-values": ["warn", { order: "asc" }],
            // suggest list values be sorted

            // 🟩 VALUES AND STYLE
            "yml/no-empty-mapping-value": "error", // disallow key: with no value
            // "yml/plain-scalar": ["error", "never"], // disallow plain values (force quoted if needed)
            "yml/quotes": ["error", { prefer: "double" }],
            // enforce double quotes for scalars
            "yml/no-trailing-zeros": "warn", // disallow trailing `.0` in floats

            // 🟩 DOCUMENT-LEVEL RULES
            "yml/no-empty-document": "error", // disallow completely empty YAML files

            // 🟩 WHITESPACE AND COMMENTS
            "yml/no-irregular-whitespace": "error", // disallow invisible or irregular space
            "yml/no-multiple-empty-lines": ["error", { max: 1 }], // limit empty lines
            "yml/spaced-comment": ["error", "always"], // require space after `#`

            // 🟩 FLOW STYLE RULES
            "yml/flow-mapping-curly-newline": ["error", { consistent: true }],
            // enforce consistent line breaks in flow mappings
            "yml/flow-mapping-curly-spacing": ["error", "never"], // enforce spacing inside `{ }`
            "yml/flow-sequence-bracket-newline": ["error", "consistent"], // enforce line breaks inside `[ ]`
            "yml/flow-sequence-bracket-spacing": ["error", "never"], // enforce spacing inside `[ ]`

            // 🟩 KEY SPACING
            "yml/key-spacing": [
                "error",
                { beforeColon: false, afterColon: true },
            ], // spacing around `:`
        },
    },
];

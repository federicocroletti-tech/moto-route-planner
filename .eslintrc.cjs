module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.app.json", "./tsconfig.node.json"],
    extraFileExtensions: [".vue"],
  },
  plugins: ["@typescript-eslint", "vue"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "vue/no-v-html": "off",
    "vue/attribute-hyphenation": "off",
  },
  ignorePatterns: ["dist/", "node_modules/", "*.js", "*.cjs"],
};

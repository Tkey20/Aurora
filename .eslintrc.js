module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    semi: 0,
    "space-before-function-paren": 0,
    "comma-spacing": 0,
    quotes: 0,
    "no-trailing-spaces": 0,
    indent: 0,
    // 驼峰命名法
    camelcase: [0, { properties: "always" }],
    "object-curly-spacing": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

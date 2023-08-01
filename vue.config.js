const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// commonjs导出并不是es6的导出
// 因为vue会将这个文件交给webpack打包，webpack是基于nodejs的打包系统
module.exports = {
  lintOnSave: false,
  devServer: {
    hot: true,
    clientLogLevel: "warning",
    disableHostCheck: true
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/styles/variables.less")]
    }
  },
  // 设置别名 路径的
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"));
  }
};

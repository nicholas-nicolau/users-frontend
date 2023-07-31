import { Configuration } from "webpack";

module.exports = {
  chainWebpack: (config: Configuration) => {
    config.module
      .rule("vue-svg-loader")
      .test(/\.svg$/)
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};

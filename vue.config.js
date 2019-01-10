module.exports = {
  // 输出文件目录
  outputDir: 'dist',

  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 75
          })
        ]
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {},

  lintOnSave: undefined
}

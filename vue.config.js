module.exports = {
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {}
}

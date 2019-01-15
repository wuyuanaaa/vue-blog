module.exports = {
  // 输出文件目录
  outputDir: 'dist',

  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 56
          })
        ]
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {},

  lintOnSave: undefined
}

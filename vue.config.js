const path = require('path');

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
      '/': {
        target: 'http://101.132.109.246:3000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/css/variable.less'),
      ]
    }
  },

  lintOnSave: undefined
}

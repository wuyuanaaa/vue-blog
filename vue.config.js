const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // 输出文件目录
  outputDir: 'dist',

  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
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
        target: 'https://blog.yuanaaa.top',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          // '^/api': ''
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

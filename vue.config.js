const path = require('path')
const webpack = require('webpack')

const { NODE_ENV } = process.env

module.exports = {
  lintOnSave: 'error',

  productionSourceMap: false, // 禁用生产环境 source-map

  devServer: {
    port: 5660,
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  configureWebpack: () => {
    const conf = {
      resolve: {
        modules: [process.cwd(), 'node_modules'],
        alias: {
          vue$: 'vue/dist/vue.common.js',
          '@': path.resolve(__dirname, './src'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          $api: path.resolve(__dirname, './src/api'),
          $app: path.resolve(__dirname, './src/utils/app'),
          $const: path.resolve(__dirname, './src/utils/const'),
        }),
      ],
    }

    return conf
  },
}

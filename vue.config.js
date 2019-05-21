const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const publicPath =
  process.env.NODE_ENV === 'production' ? '/crypto-weddings-dapp/' : '/'

module.exports = {
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()]
  },
  publicPath
}

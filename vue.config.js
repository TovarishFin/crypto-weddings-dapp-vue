const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const publicPath =
  process.env.NODE_ENV === 'production' ? '/rps-ethereum/' : '/'

module.exports = {
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()]
  },
  publicPath
}

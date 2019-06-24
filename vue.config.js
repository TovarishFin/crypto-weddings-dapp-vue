const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()]
  },

  publicPath,

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'eu-central-1',
      bucket: 'crypto-weddings',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'error.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: true,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0',
      cloudfrontId: 'E15IUUCLDQ4JRZ',
      cloudfrontMatchers: '/*'
    }
  }
}

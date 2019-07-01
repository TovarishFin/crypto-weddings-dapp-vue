const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/'
const prodBucket = process.env.VUE_APP_S3D_BUCKET_PROD
const stagingBucket = process.env.VUE_APP_S3D_BUCKET_STAGING
const prodCloudfrontId = process.env.VUE_APPS3D_CLOUDFRONT_ID_PROD
const stagingCloudfrontId = process.env.VUE_APPS3D_CLOUDFRONT_ID_STAGING

const bucket =
  process.env.NODE_ENV === 'production' ? prodBucket : stagingBucket

const cloudfrontId =
  process.env.NODE_ENV === 'production' ? prodCloudfrontId : stagingCloudfrontId

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
      bucket,
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'error.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      //enableCloudfront: true,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0',
      cloudfrontId,
      cloudfrontMatchers: '/*'
    }
  }
}

const TerserPlugin = require("terser-webpack-plugin");

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LineONE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'LineONE.dev' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/index',
    '~/assets/css/landing',
    '~/assets/css/editor',
    '~/assets/css/header',
    '~/assets/css/panel',
    '~/assets/css/xicara',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  robots: {
    UserAgent: '*',
    Allow:'*',
    Disallow:[
      '/_nuxt',
    ],
    Sitemap:'https://lineone.dev/sitemap.xml'
  },
  sitemap: {
    hostname: 'https://lineone.app',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
              })
            ]
      },

      extend (config, ctx) {

        config.module.rules.push({
          enforce: 'pre',
          test: /\.txt$/,
          loader: 'raw-loader',
          exclude: /(node_modules)/
        });
  
      }      

  },
}

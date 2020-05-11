
export default {
  server: {
    port: 3000, // default: 3000
    host: '192.168.1.54' // default: localhost
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { property: "og:type", content: "website"},
      { property: "og:site_name", content: "Ostie.ru"},
      { property: "og:title", content: "Ostie"},
      { property: "og:description", content: "Ищем саундрэки и фильмы к ним"},
      { property: "og:url", content: "http://ostie.ru"},
      { property: "og:locale", content: "ru_RU"},
      { property: "og:image", content: "/img-social-share.png"},
      { property: "og:image:width", content: "1024"},
      { property: "og:image:height", content: "512"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap&subset=cyrillic'}
    ]
    
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/directives.js'
  
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {
    baseURL:  process.env.NODE_ENV === 'production'? 'api' : 'http://localhost:5000/api',
    // proxy: true // Can be also an object with default options
},

// proxy: {
//   '/apiItunes/': { target: 'https://itunes.apple.com/search?', pathRewrite: {'^/apiItunes/': ''} }
// },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

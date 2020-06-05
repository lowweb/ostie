
export default {
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
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
      { name: 'keywords', content: 'саундтрек, саундтрек к фильму, найти фильм по саундтреку, фильм, какой саундтрек, где играла песня, какой фильм, поиск фильма, найти по саундтреку, узнать фильм, саундтреки в кино, саундтреки к сериалам, что за фильм, в каком фильме играл саундтрек, музыка к фильмам, музыка из фильма, музыка к сериалам, песни из кино'},
      { property: "og:url", content: "https://ostie.org"},
      { property: "og:type", content: "website"},
      { property: "og:title", content: "Ostie.org – ищем фильмы и сериалы по саундтреку. Узнай в каком фильме звучит любимая песня!"},
      { property: "og:description", content: "В хорошем кино – хороший саундтрек. Ostie помогает найти фильмы и сериалы по имени артиста или названию композиции. Если вам хочется узнать, в каком фильме звучала та самая песня или в создании саундтрека к какому сериалу принимала участие ваша любимая группа – Ostie поможет."},
      { property: "og:image", content: "/img-social-share.png"},
      { property: "og:site_name", content: "ostie.org"},
      { property: "og:locale", content: "ru_RU"},
      { property: "og:image:width", content: "968"},
      { property: "og:image:height", content: "504"}
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
    ['@nuxtjs/google-analytics', {
      id: 'UA-60588310-3'
    }]
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
    baseURL:  process.env.NODE_ENV === 'production'? 'https://ostie.org/api' : 'http://localhost:5000/api',
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

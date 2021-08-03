export default {
  env: {
//  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
 baseUrl: process.env.BASE_URL || 'https://api.result.app'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Resultapp - The best survey platform",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "The best survey platform, with live responses " }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/img/faviconR.png' }, 
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
      {rel: 'preconnect', href: 'https://fonts.gstatic.com'}, 

      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat&family=Varela+Round&display=swap' },
    ], 
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/css/poll.css',
    '~/static/css/reacciones.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vueworldcloud", ssr: false }, 
    { src: "~/plugins/vueloading", ssr: false }, 
    { src: '@/plugins/vue-html2pdf', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-sweetalert2', 
    'nuxt-socket-io',
    'nuxt-buefy',
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: 'G-4PTD2NXJTQ'
  },

  io: {
    // module options
    sockets: [{
      name: 'main',
   // url: 'http://localhost:5000', 
     url: 'https://api.result.app'
    }]
  },

  axios: {
  baseURL: 'https://api.result.app/api/',
 // baseURL: 'http://127.0.0.1:5000/api/',
    credentials: true
    },

    

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

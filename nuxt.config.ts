// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  modules: ['@pinia/nuxt', '@nuxtjs/supabase'],

  build: {
    transpile: ['vuetify', 'ts-invariant/process'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  // @ts-ignore
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
})

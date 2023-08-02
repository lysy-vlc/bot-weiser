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
  app: {
    head: {
      script: [
        {
          src:
            process.env.NODE_ENV === 'development'
              ? 'knibble.js'
              : 'https://s3.amazonaws.com/knibble.ai.assets/package.js',
          body: true,
          type: 'module',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      STACK_AI_TOKEN: process.env.STACK_AI_TOKEN, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },

  // @ts-ignore
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
})

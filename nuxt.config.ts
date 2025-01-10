import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Fotheby Auction',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/bidgen-logo.svg' }],
      meta: [
        {
          name: 'og:site_name',
          content: 'Fotheby Auction',
        },
        {
          name: 'keywords',
          content: 'Fotheby Auction',
        },
      ],
    },
  },

  devtools: { enabled: true },

  vite: {
    plugins: [eslintPlugin()],
  },

  css: ['~/assets/tailwind.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/fonts'],
  fonts: {
    families: [{ name: 'Nunito', provider: 'google' }],
  },
  compatibilityDate: '2024-12-11',
})

<template>
  <header
    :class="{
      'bg-transparent': !isScrolled,
      'bg-black': isScrolled,
      'fixed !w-full': isHomeRoute,
      relative: !isHomeRoute,
    }"
    class="z-10 transition-all duration-300"
  >
    <div class="container">
      <div class="flex justify-between items-center py-4">
        <NuxtLink class="flex items-center gap-3" to="/">
          <img src="/bidgen-logo.svg" alt="logo" />
          <h1 class="text-3xl font-bold text-white">Fotheby Auction</h1>
        </NuxtLink>
        <div>
          <ul class="flex gap-4 text-white">
            <li
              v-for="(link, index) in quickLinks"
              :key="'quick-' + index"
              class="mb-2"
            >
              <NuxtLink
                :to="link?.links"
                class="hover:text-orange text-[#efefef] duration-300"
                >{{ link?.name }}</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div>
          <div class="relative">
            <!-- Search Input -->
            <div class="flex items-center gap-3">
              <input
                v-model="search"
                placeholder="Search your items"
                class="!bg-transparent w-72 !border !border-orange !text-orange placeholder-orange px-3 py-2 rounded-lg focus:outline-none"
              />
              <template v-if="isAuthenticated">
                <NuxtLink to="/profile" class="text-white">
                  <i class="icon-user1 text-xl" />
                </NuxtLink>
              </template>
              <template v-else>
                <i class="icon-user1 text-xl" @click="login" />
              </template>

              <NuxtLink to="/like" class="text-white">
                <i class="icon-heart text-xl" />
              </NuxtLink>
            </div>

            <!-- Search Dropdown -->
            <div
              v-if="searchResults.length > 0 && search"
              class="absolute top-12 bg-white w-full rounded-lg shadow-lg z-50"
            >
              <ul>
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  class="flex items-center gap-4 px-4 py-2 group duration-300 cursor-pointer"
                  @click="navigateToDetail(result.id)"
                >
                  <img
                    :src="result.image1 ?? defaultImage"
                    alt="Auction Item"
                    class="w-12 h-12 object-cover rounded-lg"
                  />
                  <span class="text-sm text-gray-800 group-hover:text-orange">
                    <span class="font-bold">{{ result.name }}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import axios from 'axios'

import { useNuxtApp, useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()
const isScrolled = ref(false)
const search = ref('')
const searchResults = ref([])
const defaultImage = '/images/default-image.webp'

const isHomeRoute = computed(() => route.path === '/')

const isAuthenticated = computed(() => {
  return (
    !!localStorage.getItem('access_token') &&
    !!localStorage.getItem('refresh_token' || 'refresh')
  )
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const fetchSearchResults = async (query: string) => {
  if (!query) {
    searchResults.value = []
    return
  }
  try {
    const response = await axios.get(
      `https://aristoback.ikramovna.me/api/v1/auction/search?name=${query}`,
    )
    searchResults.value = response.data
  } catch (error) {
    console.error('Error fetching search results:', error)
  }
}

const onSearch = debounce((query: string) => {
  fetchSearchResults(query)
}, 500)

watch(search, (value) => {
  onSearch(value)
})

const navigateToDetail = (id: number) => {
  router.push(`/auction/${id}`)
  setTimeout(() => {
    search.value = ''
    searchResults.value = []
  }, 300)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const quickLinks = [
  {
    name: 'Home',
    links: '/',
  },
  {
    name: 'Auction',
    links: '/auction',
  },
  {
    name: 'About Us',
    links: '/about-us',
  },
  {
    name: 'Contact',
    links: '/contact',
  },
]

const nuxtApp = useNuxtApp()

const login = () => {
  nuxtApp.vueApp.config.globalProperties.$emitter.emit('open-auth', 'login')
}
</script>

<style scoped>
li {
  @apply text-white;
}

header {
  top: 0;
  z-index: 10000;
}
</style>

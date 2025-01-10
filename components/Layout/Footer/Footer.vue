<template>
  <footer
    class="bg-[#161313] text-white pt-6 md:pt-10 border-[rgba(196,196,196,0.2)] border-t"
  >
    <div
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 pb-6 md:pb-10"
    >
      <div>
        <h3 class="font-bold text-[20px] text-white inline-block pb-2">
          Quick Links
        </h3>
        <ul>
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
        <NuxtLink class="flex items-center gap-3" to="/">
          <img src="/bidgen-logo.svg" alt="logo" />
          <h1 class="text-3xl font-bold text-white">Fotheby Auction</h1>
        </NuxtLink>
        <p class="text-[#adadad] mt-5 leading-8">
          Auction Lab is one of the most amazing companies ever for painting all
          over the world.
        </p>
        <CommonSocials class="mt-8" :socials="socialsData" />
      </div>
    </div>
    <div
      class="container space-x-2 flex justify-center border-[rgba(196,196,196,0.2)] border-t py-4 text-sm"
    >
      <p>
        © {{ currentYear }} <span class="font-bold">Fotheby Auction.</span> All
        rights reserved.
      </p>
      <span class="hidden md:block">|</span>
      <p>Developed by <span>Muslima</span></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
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

const socialsData = {
  instagram: 'https://www.instagram.com/tmc.uz/',
  facebook: 'https://www.facebook.com/tmc.uz/',
  telegram: 'https://t.me/tmc_uz',
  pinterest: 'https://www.pinterest.com/tmc.uz/',
}
</script>

<style scoped></style>

<template>
  <div class="overflow-x-hidden">
    <div
      class="hidden md:flex items-center gap-2 md:overflow-hidden py-3 md:py-4"
    >
      <NuxtLink
        to="/"
        class="flex-y-center gap-2 text-black cursor-pointer leading-130 text-sm font-semibold transition-300 hover:text-orange group"
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 21.3252V15.3252C9 14.7948 9.21071 14.2861 9.58579 13.911C9.96086 13.5359 10.4696 13.3252 11 13.3252H13C13.5304 13.3252 14.0391 13.5359 14.4142 13.911C14.7893 14.2861 15 14.7948 15 15.3252V21.3252M5 12.3252H3L12 3.3252L21 12.3252H19V19.3252C19 19.8556 18.7893 20.3643 18.4142 20.7394C18.0391 21.1145 17.5304 21.3252 17 21.3252H7C6.46957 21.3252 5.96086 21.1145 5.58579 20.7394C5.21071 20.3643 5 19.8556 5 19.3252V12.3252Z"
            stroke="#354052"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p>Home</p>
      </NuxtLink>
      <div
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="flex-y-center gap-2 group shrink-0"
      >
        <div class="size-1 bg-gray-600 rounded-full" />
        <NuxtLink
          :to="item?.link"
          :class="{
            'pointer-events-none !text-gray-700 ':
              index === breadcrumb?.length - 1,
          }"
          class="transition-300 flex cursor-pointer items-center text-black leading-130 text-sm font-semibold min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap hover:text-primary"
        >
          {{ item?.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IBreadcrumb } from '~/types'

interface Props {
  breadcrumb?: IBreadcrumb[]
}
defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/category/${to}`"
    class="min-w-[195px] min-h-[160px] justify-between flex flex-col items-center bg-gray shadow-[0_2px_5px_rgba(0,0,0,0.2),0_-2px_5px_rgba(0,0,0,0.2)] rounded-[10px] p-5 pb-6 text-center relative transition ease-[cubic-bezier(0.25,0.8,0.25,1)] duration-400"
  >
    <img class="w-[70px] h-[70px]" :src="image" alt="image" />

    <p class="text-white text-lg font-semibold">
      {{ title }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to?: string
  title?: string
  image?: string
}
defineProps<Props>()
</script>

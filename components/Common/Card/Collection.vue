<template>
  <div>
    <div class="bg-gray rounded-[10px] overflow-hidden relative inline-block">
      <div class="!h-[135px]">
        <img class="!h-[135px] w-full" :src="data?.image1" alt="image" />
      </div>
      <div class="px-5 pb-5">
        <div
          class="absolute w-20 h-20 top-[32%] left-1/2 transform -translate-x-1/2"
        >
          <img
            class="rounded-[50%] w-full h-full"
            :src="data?.image2"
            alt="image"
          />
        </div>
        <p
          class="font-bold text-xl text-center tracking-[0.2em] mt-[50px] line-clamp-1"
        >
          {{ data?.name }}
        </p>
        <div class="mt-5 flex items-center justify-between">
          <p class="font-medium text-xs uppercase">{{ data?.status }}</p>
          <p class="font-medium text-xs">{{ data?.view }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    image1: string
    id: number
    image2: string
    name?: string
    price: number
    status: string
    view: number
  }
}
defineProps<Props>()
</script>

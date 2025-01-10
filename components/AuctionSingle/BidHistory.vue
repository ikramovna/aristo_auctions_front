<template>
  <div class="flex gap-5 items-center">
    <div class="w-[50px] h-[50px]">
      <img
        class="w-full h-full rounded-[50%]"
        :src="data?.user_image"
        alt="image"
      />
    </div>
    <div>
      <p class="font-bold text-gray-100">{{ data?.user }}</p>
      <p class="text-[#5C5C5C] font-normal">{{ data?.bid_time }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    user: string
    bid_time: string
    user_image: string
  }
}

defineProps<Props>()
</script>

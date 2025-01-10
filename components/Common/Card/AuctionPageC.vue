<template>
  <div class="rounded-t overflow-hidden inline-block group relative">
    <div
      class="bg-[#fafafa] p-4 text-gray-100 text-center group-hover:bg-gray-100 group-hover:text-white duration-300"
    >
      <p class="font-bold text-lg mb-2 h-max line-clamp-1">{{ data?.name }}</p>
      <p class="font-extrabold text-2xl">$ {{ data?.price }}</p>
    </div>
    <div class="w-full sm:w-[416px] h-[258px] relative">
      <img
        class="w-full h-full duration-300 group-hover:scale-[1.02]"
        :src="data?.image1"
        alt="image"
      />
    </div>
    <div
      class="font-extrabold text-xs text-gray-100 bg-white absolute top-[21%] left-[-14px] px-4 py-1.5 rounded-tr-[28px] rotate-90"
    >
      ID {{ data?.id }}
    </div>
    <div
      class="bg-white p-5 text-gray-100 text-center border border-[#eee] rounded-b"
    >
      <div class="flex justify-between items-center">
        <div v-if="data?.current_bid">
          <p class="font-semibold">Current Bid</p>
          <p class="font-extrabold text-2xl">$ {{ data?.current_bid }}</p>
        </div>
        <div v-if="data?.remaining_time ?? data.auction_end_date">
          <CommonCountdown
            :target-date="data.remaining_time ?? data.auction_end_date"
            hide-days
          />
          <p class="font-bold text-lg">Current Bid</p>
        </div>
      </div>
      <NuxtLink :to="`/auction/${data?.id}`">
        <BaseButton variant="grayBorder" class="mt-6" :text="`Submit a bid`" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  data: {
    image1: string
    id: number
    name: string
    current_bid?: number
    price: number
    remaining_time: string
    owner_full_name: string
    owner_image: string
    auction_end_date: string
  }
}
defineProps<Props>()
</script>

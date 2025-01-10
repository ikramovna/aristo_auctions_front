<template>
  <div
    class="bg-gray shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-[10px] py-6 px-5 pt-8 relative z-2"
  >
    <CommonCountdown
      class="absolute top-[15px] left-1/2 transform -translate-x-1/2 z-[10]"
      :target-date="data?.remaining_time"
      :hide-days="false"
      main-class="bg-orange w-max px-4 py-2 rounded-[35px] font-bold text-[15px]"
    />
    <img
      class="w-full rounded-10 h-full max-h-[248px]"
      :src="data?.image1"
      alt="image"
    />

    <p
      class="pt-[20px] font-semibold text-[20px] leading-[30px] capitalize text-white line-clamp-1"
    >
      {{ data?.name }}
    </p>
    <div class="flex mt-5 items-center justify-between">
      <AuctionSingleUser
        :user-img="data?.owner_image"
        :text="data?.owner_full_name"
      />
      <p class="font-semibold text-xl capitalize text-orange mr-4">
        $ {{ data?.price }}
      </p>
    </div>
    <div class="flex items-center justify-between mt-7">
      <NuxtLink :to="`/auction/${data?.id}`">
        <BaseButton
          size="sm"
          variant="orange"
          text-class="!text-white"
          main-class="!text-white"
          >Bid Now</BaseButton
        >
      </NuxtLink>

      <BaseButtonLike :auction-id="data?.id" :model-value="trigger" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  data: {
    image1: string
    id: number
    name: string
    price: number
    remaining_time: string
    owner_full_name: string
    owner_image: string
  }
}
defineProps<Props>()

const trigger = ref(false)
</script>

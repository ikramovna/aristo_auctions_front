<template>
  <div>
    <AuctionSingleTime :data="data" class="mb-6" />
    <CommonProductsSingleSwiper :images="data?.images" />
    <CommonCTab
      class="mt-7"
      v-model="activeTab"
      main-class="!border-none"
      item-class="!rounded-[46px] text-center !font-semibold bg-white text-dark-100 !text-sm shadow-[5px_7px_35px_0px_rgba(113,113,113,0.1)]"
      active-items-class="!bg-gray-100 text-white"
      :list="tabs"
    />

    <div class="text-black mt-6">
      <div
        v-if="activeTab === '0'"
        class="font-medium leading-7 text-[#5C5C5C]"
      >
        {{ data?.description }}
      </div>
      <div v-else-if="activeTab === '1'">
        <CommonPlayer :video="data?.video" />
      </div>
    </div>
    <CommonCardShareNow />
  </div>
</template>
<script setup lang="ts">
interface Props {
  data: {
    images: string
    id: number
    name: string
    bid?: number
    price: number
    remaining_time: string
    owner_full_name: string
    owner_image: string
    video: string
    description: string
  }
}
defineProps<Props>()
const activeTab = ref('0')

const tabs = ref([
  { id: 0, title: 'Description', value: '0' },
  { id: 1, title: 'About Video', value: '1' },
])
</script>

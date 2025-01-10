<template>
  <div class="bg-white pb-10 md:pb-16">
    <div class="relative container">
      <BaseBreadcrumb :breadcrumb="menu" />

      <div class="md:flex justify-between gap-3 pt-6 md:pt-0">
        <div class="md:w-2/4">
          <AuctionSingleLeft :data />
        </div>
        <div class="md:w-2/4 mt-6 md:mt-0">
          <AuctionSingleRight :data />
        </div>
      </div>
      <div>
        <h3 class="section-title !text-black mt-5 md:mt-9 mb-6">
          Best Related Auction
        </h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
        >
          <CommonCardAuctionPageC
            v-for="(item, index) in data?.best_related_auctions"
            :key="index"
            :data="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = useAsyncData('news-single', () =>
  useApi()
    .$get<any>(`auction/${route.params.id}`)
    .catch((err) => {
      console.log(err)
    }),
)

const menu = computed(() => {
  return [
    {
      title: 'Auction',
      link: '/auction',
    },
    {
      title: 'Auction',
      link: '/auction',
    },
  ]
})
</script>

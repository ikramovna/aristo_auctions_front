<template>
  <div class="container">
    <div class="flex justify-between items-center mb-8">
      <h3 class="section-title">Live Auction</h3>
      <BaseButton
        size="sm"
        :text-class="'text-white'"
        :variant="'orange'"
        :text="'Explore Now'"
        @click="$router.push('/auction')"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CommonCardAuction
        v-for="(item, index) in auction"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const auction = ref<any>([])

function getCategory() {
  useApi()
    .$get('auction/list')
    .then((res) => {
      auction.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getCategory()
</script>

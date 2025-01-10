<template>
  <div class="container max-h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CommonCardAuction
        v-for="(item, index) in data"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = useAsyncData('news-single', () =>
  useApi()
    .$get<any>(`auction/category/${route.params.id}`)
    .catch((err) => {
      console.log(err)
    }),
)
</script>

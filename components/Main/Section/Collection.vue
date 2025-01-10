<template>
  <div class="container py-6 md:py-16">
    <div class="section-title mb-7">Top Auction</div>
    <ClientOnly>
      <Swiper class="!w-full" v-bind="settings">
        <SwiperSlide
          v-for="(item, index) in auction"
          :key="index"
          class="!w-[196px]"
        >
          <CommonCardCollection :data="item" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'

import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Autoplay]
const settings = computed(() => ({
  loop: true,
  spaceBetween: 20,
  slidesPerView: 6,
  autoplay: {
    delay: 3000,
  },
  modules,
}))

const auction = ref<any>([])
function getTopAuction() {
  useApi()
    .$get('auction/top')
    .then((res) => {
      auction.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getTopAuction()
</script>

<style></style>

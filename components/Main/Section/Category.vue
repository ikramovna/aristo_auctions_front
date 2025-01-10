<template>
  <div class="relative container py-16">
    <h3 class="section-title mb-7">Category</h3>
    <div class="flex justify-between gap-6">
      <ClientOnly>
        <Swiper class="!w-full" v-bind="settings">
          <SwiperSlide
            v-for="(item, index) in category"
            :key="index"
            class="!w-[196px]"
          >
            <CommonCardCategory
              :title="item?.name"
              :to="item?.id"
              :image="item?.image"
            />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
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

const category = ref<any>([])

function getCategory() {
  useApi()
    .$get('auction/category')
    .then((res) => {
      category.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getCategory()
</script>

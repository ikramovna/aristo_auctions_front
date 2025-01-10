<template>
  <section class="relative min-h-screen overflow-x-hidden flex items-center">
    <Swiper v-bind="settings" :modules="modules" @slide-change="onSlideChange">
      <SwiperSlide v-for="(item, i) in list" :key="i">
        <img
          class="!w-full !h-full object-cover pointer-events-none"
          :src="item?.image"
          alt="image"
        />
      </SwiperSlide>
    </Swiper>

    <div class="container">
      <div class="relative z-2 lg:pl-3 w-[47%]">
        <p class="text-[54px] font-extrabold mb-5">
          Discover Best
          <span class="text-orange">Painting Art</span>
          Design.
        </p>
        <p>
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Nam at iaculis felis. Etiam quis velit ac
          augue pretium vulputate ut et mi. Vivamus posuere ut ante non euismod.
          Phasellus ullamcorper justo tortor, at porta nulla tempor at. Fusce
          sed ipsum ligula. Praesent tincidunt tortor quis dignissim cursus.
        </p>
        <div class="flex gap-5 max-w-[340px] w-full mt-8">
          <BaseButton
            :variant="'orange'"
            :text="'Explore Now'"
            @click="$router.push('/apply')"
          />
          <BaseButton
            :variant="'border'"
            :text="'See More'"
            @click="$router.push('/applys')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref } from 'vue'

const thumbsSwiper = ref(null)

const modules = [Thumbs, Navigation, Pagination, Autoplay, EffectFade]
const settings = computed(() => ({
  loop: true,
  thumbs: { swiper: thumbsSwiper.value },
  class: '!absolute inset-0 z-0 !w-full',
  autoplay: {
    delay: 3000,
  },
  modules,
}))
const list = [
  {
    id: 1,
    image: './images/hero1.png',
  },
  {
    id: 2,
    image: './images/hero2.png',
  },
]

const activeIndex = ref(0)
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
}
</script>

<style scoped></style>

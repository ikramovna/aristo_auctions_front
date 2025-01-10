<template>
  <client-only>
    <div class="rounded-lg overflow-hidden relative">
      <ClientOnly>
        <yandex-map
          v-model="activeCoord"
          :behaviors="behaviors"
          :coords="markers.coords"
          :settings="settings"
          :zoom="16"
          :controls="['zoomControl']"
          class="w-full h-[500px] rounded-lg"
        >
          <ymap-marker
            :coords="markers?.coords"
            :hint-content="markers?.name"
            :icon="markerIcon"
            cluster-name="1"
          />
        </yandex-map>
      </ClientOnly>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

interface Props {
  markers: {
    name?: string
    coords: number[]
    location: string
  }
}

const behaviors = ref('drag')
defineProps<Props>()

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
}
const activeCoord = ref<{ lat?: number; lng?: number; location?: number }>({})
const markerIcon = {
  layout: 'default#image',
  imageSize: [30, 42],
  imageOffset: [-15, -42],
}
</script>

<style>
.ymaps-2-1-79-map-copyrights-promo {
  display: none !important;
}
</style>

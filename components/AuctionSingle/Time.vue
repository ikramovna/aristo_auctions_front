<template>
  <div
    class="bg-gray-100 rounded text-white flex justify-between flex-row flex-wrap items-center p-6"
  >
    <div>
      <p class="font-semibold mb-1">Current Bid</p>
      <p class="font-extrabold text-2xl">$ {{ data?.current_bid ?? 209000 }}</p>
    </div>
    <CommonCountdown :target-date="data?.time_remaining" :hide-days="false" />
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types'

interface Props {
  data?: IProduct[]
}
defineProps<Props>()
</script>

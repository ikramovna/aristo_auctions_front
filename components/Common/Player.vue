<template>
  <div class="h-[300px] relative">
    <div v-if="video" class="relative">
      <iframe
        width="100%"
        :src="`https://www.youtube.com/embed/${convertToEmbed(
          video,
        )}?autoplay=0&mute=1&controls=0`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full h-[300px] rounded-2xl"
      ></iframe>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">No video source provided</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertToEmbed } from '~/utils/embed'

interface Props {
  video?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2.5 items-center">
    <img class="w-9 h-9 rounded-[50%]" :src="userImg" alt="image" />
    <p class="font-medium text-xs capitalize text-white inline-block">
      {{ text }}
    </p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  userImg?: string
  text?: string
}
defineProps<Props>()
</script>

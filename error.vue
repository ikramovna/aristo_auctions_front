<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}
defineProps<Props>()
</script>

<template>
  <div
    class="h-screen flex flex-col items-center justify-center text-white text-center"
  >
    <!-- Error Code -->
    <h1 class="font-bold text-[80px] text-white pb-4">404</h1>

    <!-- Error Message -->
    <p class="text-[20px] text-white pb-4">
      Oops! The page you're looking for doesn't exist.
    </p>

    <!-- Return to Home Button -->
    <NuxtLink to="/">
      <BaseButton variant="orange"> Go Back Home</BaseButton>
    </NuxtLink>
    <pre>{{ error }}</pre>
  </div>
</template>

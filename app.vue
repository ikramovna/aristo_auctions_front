<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ModalAuth :key="state" v-bind="{ show, state }" @close="show = false" />
  </div>
</template>
<script setup lang="ts">
import mitt from 'mitt'
import { onMounted } from 'vue'
const nuxtApp = useNuxtApp()
const state = ref('login')
const show = ref(false)

nuxtApp.vueApp.config.globalProperties.$emitter = mitt()

onMounted(() => {
  nuxtApp.vueApp.config.globalProperties.$emitter.on('open-auth', (e) => {
    state.value = e
    show.value = true
  })
})
</script>

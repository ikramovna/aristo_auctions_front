<template>
  <div
    id="countdown"
    class="relative h-7 w-7 text-center bg-transparent rounded-full flex items-center justify-center"
  >
    <div id="countdown-number" class="text-xl p-1 leading-6 text-gray-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 26 26"
      >
        <path
          fill="currentColor"
          d="m8.054 16.673l-.727-.727L11.273 12L7.327 8.079l.727-.727L12 11.298l3.921-3.946l.727.727L12.702 12l3.946 3.946l-.727.727L12 12.727z"
        />
      </svg>
    </div>

    <svg>
      <circle r="18" cx="20" cy="20" />
    </svg>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Props {
  isCancelled?: boolean
}

const props = defineProps<Props>()
interface Emits {
  (e: 'finished'): void
}

const timer = ref()

const number = ref(5)

const emit = defineEmits<Emits>()
setInterval(() => {
  if (number.value > 0) {
    number.value--
  }
}, 1000)

onMounted(() => {
  timer.value = setTimeout(() => {
    emit('finished')
  }, 5000)
})

watch(
  () => props.isCancelled,
  () => {
    clearTimeout(timer.value)
  }
)
</script>

<style scoped>
svg {
  position: absolute;
  top: -9px;
  right: -7px;
  width: 44px;
  height: 44px;
  transform: rotateY(-180deg) rotateZ(-90deg) scale(0.6);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: #eaeaea;
  fill: none;
  animation: countdown 5s linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>

<template>
  <div :class="mainClass">
    <div class="flex-x-center gap-x-1">
      <div v-if="!hideDays" class="flex flex-col gap-y-1">
        <div class="flex gap-x-1">
          <div
            v-for="(digit, idx) of formatTimer(timeParts.days).split('')"
            :key="idx"
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
          >
            {{ digit }}
          </div>
          <span
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
            >:</span
          >
        </div>
      </div>

      <div class="flex flex-col gap-y-1">
        <div class="flex gap-x-1">
          <div
            v-for="(digit, idx) of formatTimer(timeParts.hours).split('')"
            :key="idx"
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
          >
            {{ digit }}
          </div>
          <span
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
            >:</span
          >
        </div>
      </div>

      <div class="flex flex-col gap-y-1">
        <div class="flex gap-x-1">
          <div
            v-for="(digit, idx) of formatTimer(timeParts.minutes).split('')"
            :key="idx"
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
          >
            {{ digit }}
          </div>
          <span
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
            >:</span
          >
        </div>
      </div>

      <div class="flex flex-col gap-y-1">
        <div class="flex gap-x-1">
          <div
            v-for="(digit, idx) of formatTimer(timeParts.seconds).split('')"
            :key="idx"
            :class="[hideDays ? 'text-gray-100' : 'text-white']"
            class="capitalize"
          >
            {{ digit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface TimerProps {
  targetDate: Date | string
  hideDays: boolean
  mainClass?: string
}

const props = defineProps<TimerProps>()

// Reactive state for time parts
const timeParts = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

// Utility function to format time
function formatTimer(time: number): string {
  return time < 10 ? `0${time}` : time.toString()
}

// Function to calculate remaining time
const calculateTime = () => {
  const now = new Date()
  const target = new Date(props.targetDate)
  const distance = target.getTime() - now.getTime()

  if (distance > 0) {
    timeParts.days = Math.floor(distance / (1000 * 60 * 60 * 24))
    timeParts.hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    timeParts.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    timeParts.seconds = Math.floor((distance % (1000 * 60)) / 1000)
  } else {
    // Reset to zero when time has passed
    timeParts.days = 0
    timeParts.hours = 0
    timeParts.minutes = 0
    timeParts.seconds = 0
  }
}

// Watch for changes in the targetDate prop
watch(
  () => props.targetDate,
  () => {
    calculateTime()
  },
  { immediate: true },
)

// Initialize the timer
onMounted(() => {
  calculateTime()
  setInterval(calculateTime, 1000)
})
</script>

<template>
  <div
    class="main-tab bg-white/12 flex gap-2 transition-all duration-200 border-b border-solid border-transparent dark:border-gray-300/10"
    :class="mainClass"
  >
    <div
      v-if="isScrollAnimate"
      :class="activeClass"
      :style="{ width: `${active.width}`, left: `${active.left}px` }"
      class="absolute h-[2px] bg-red-500 w-full -bottom-px transition-all duration-200"
    ></div>
    <button
      v-for="(tab, idx) in list"
      :id="`item_${tab.value}`"
      :key="idx"
      :class="[
        itemClass,
        localeValue === tab.value
          ? activeItemsClass
          : 'text-gray-700 hover:text-gray',
      ]"
      class="p-3 py-2 relative transition-all whitespace-nowrap border border-solid border-transparent rounded-lg text-left duration-200 text-base font-medium z-10 bg-gray-300 w-full"
      @click="changeActive(tab.value, $event)"
    >
      {{ tab.title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
// import type { ITabItem } from './CTab.types'

interface Props {
  modelValue: string | number
  list: any[]
  mainClass?: string
  itemClass?: string
  activeClass?: string
  activeItemsClass?: string
  isScrollAnimate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'complain',
  activeItemsClass: 'text-dark bg-purple/10 !border-purple',
})

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}
const emit = defineEmits<Emits>()

const localeValue = ref(props?.modelValue)

const active = ref({ left: 0, width: '0px' })

function changeActive(tab: string | number, e: { target: HTMLButtonElement }) {
  pick(tab, e)
  emit('change', tab)
}
const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e.target as HTMLButtonElement
  active.value = {
    left: target?.offsetLeft,
    width: target?.offsetWidth + 'px',
  }
  localeValue.value = tab
  emit('update:modelValue', tab)
}

onMounted(() => {
  const item = document.getElementById(
    `item_${props.modelValue}`,
  ) as HTMLButtonElement
  setTimeout(() => {
    pick(props.modelValue, { target: item })
  }, 10)
})
</script>

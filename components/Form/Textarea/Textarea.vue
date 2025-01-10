<template>
  <div
    class="bg-gray-300 border border-transparent transition-300 focus-within:border-blue focus-within:border-primary flex flex-col items-end justify-between rounded-10"
    :class="[
      { '!border-red-500 !bg-red/5': error },
      { '!bg-transparent': isTransparent },
    ]"
  >
    <textarea
      v-bind="{ type, maxlength, minlength, rows }"
      :id="id"
      :key="placeholder.length"
      v-model="inputValue"
      :placeholder="placeholder"
      class="w-full h-full rounded-10 text-base sm:text-sm p-3 bg-transparent outline-none placeholder:text-gray-700 resize-none"
      :class="inputClass"
      @blur="$emit('blur', $event)"
      @input="handleInput"
    />
    <span v-if="maxlength" class="text-gray-100 text-xs mb-1 mr-2 mt-0.5">
      {{ inputValue.length }} / {{ maxlength }}</span
    >
  </div>
</template>
<script lang="ts" setup>
import type { TClassName } from '~/types'

interface Props {
  inputClass?: TClassName
  type?: string
  placeholder?: string
  error?: boolean
  isTransparent?: boolean
  id?: string
  modelValue?: string
  maxlength?: number | string
  minlength?: number | string
  rows?: number
}
const props = withDefaults(defineProps<Props>(), {
  inputClass: '',
  type: 'text',
  placeholder: '',
  maxlength: '',
  minlength: '',
})
interface Emits {
  (e: 'blur', v: Event): void
  (e: 'update:modelValue', v: string): void
}
const $emit = defineEmits<Emits>()
watch(
  () => props.modelValue,
  (v) => {
    inputValue.value = v || ''
  },
)
const inputValue = ref<string>(props.modelValue || '')
function handleInput() {
  $emit('update:modelValue', inputValue.value)
}
</script>

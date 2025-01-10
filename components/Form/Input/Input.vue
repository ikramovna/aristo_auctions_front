<template>
  <div
    :id="id"
    class="!bg-[#F4F7F5] border border-transparent transition-300 focus-within:border-primary flex items-center rounded-10"
    :class="{
      '!border-red-500 !bg-red/5': error,
      '!bg-transparent': isTransparent,
    }"
  >
    <slot name="prefix" />
    <input
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
      }"
      :id="inputId"
      ref="Input"
      class="w-full h-full rounded-10 text-sm font-semibold p-3 text-dark bg-transparent outline-none placeholder:text-gray-700"
      :value="modelValue"
      :class="[
        inputClass,
        {
          '!cursor-not-allowed': disabled,
        },
      ]"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="handleFocus"
    />
    <slot name="suffix" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  type?: string
  placeholder?: string
  modelValue?: number | string | undefined
  disabled?: boolean
  error?: boolean
  focus?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  isTransparent?: boolean
  min?: number
  inputClass?: string | string[]
  prefixClass?: string
  suffixClass?: string
  autocomplete?: string
  inputId?: string
  readonly?: boolean
  id?: string
  wrapperClass?: string
}
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()
const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 99,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: 'new-password',
})
const handleFocus = () => {
  emit('focus')
}
watch(
  () => props?.focus,
  (value) => {
    if (value) {
      Input?.value?.focus()
    }
  },
  { deep: true, immediate: true },
)
</script>

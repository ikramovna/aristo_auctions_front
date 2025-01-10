<template>
  <FormInput
    :id="id"
    v-model="search"
    class="bg-gray-500 !text-orange"
    :input-class="[
      'sm:!text-2xs !py-2.5',
      ...[!noSearchIcon ? '!pl-0' : ''],
      inputClass,
    ]"
    :placeholder="placeholder"
    v-bind="{ inputId }"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
    <template v-if="!noSearchIcon" #prefix>
      <div
        class="h-max p-2 pl-3 pointer-events-none flex-center"
        :class="searchIconWrapper"
      >
        <i
          class="icon-search flex-center text-lg h-[18px] text-orange"
          :class="iconClass"
        />
      </div>
    </template>
    <template #suffix>
      <div
        v-if="!noClear"
        class="px-3 h-max flex-center cursor-pointer transition-300 opacity-0 scale-75 group invisible"
        :class="{ '!opacity-100 !scale-100 !visible': search?.length }"
        @click.stop="clearInput"
      >
        <slot name="suffix">
          <i
            class="icon-close text-xl text-gray-700 group-hover:text-red transition-300"
            :class="[iconClass, iconCloseStyles]"
          />
        </slot>
      </div>
    </template>
  </FormInput>
</template>
<script lang="ts" setup>
import type { TClassName } from '@/types'
// import { debounce } from '@/utils'

interface Props {
  noSearchIcon?: boolean
  placeholder?: string
  modelValue?: string
  inputClass?: string
  iconClass?: string
  inputId?: string
  searchIconWrapper?: string
  noClear?: boolean
  id?: string
  iconCloseStyles?: TClassName
}
const props = defineProps<Props>()
interface Emits {
  (e: 'search', v: string): void
  (e: 'clear'): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'update:modelValue', v: string): void
}
const emit = defineEmits<Emits>()
const search = ref<string>('')
// watch(
//   () => search.value,
//   (v) => {
//     debounce(
//       'search',
//       () => {
//         emit('search', v)
//       },
//       700,
//     )
//   },
// )
function clearInput() {
  search.value = ''
  emit('clear')
}
watch(
  () => props.modelValue,
  (val) => {
    search.value = val
  },
  { immediate: true },
)
watch(
  () => search.value,
  (v) => {
    emit('update:modelValue', v)
  },
)
</script>

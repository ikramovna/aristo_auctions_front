<template>
  <div ref="select" class="relative" :class="wrapperStyles">
    <!--  SELECTED OPTION  -->
    <div
      :class="selectedOptionStyles"
      class="bg-white rounded-lg px-3 py-2.5 cursor-pointer flex items-center justify-between"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <div class="flex-y-center gap-1.5">
          <slot name="prefix" />
          <div
            v-if="!value"
            class="text-gray text-sm leading-130 truncate"
            :class="placeholderClass"
          >
            {{ placeholder }}
          </div>
          <slot v-else name="selectedOptionInner" :value="value">
            <div>
              <div
                v-if="value?.status"
                class="text-dark text-sm leading-130"
                :class="displayValueLabelClass"
              >
                {{ $t(value[labelKey]) }}
              </div>
              <div
                v-else
                class="text-dark text-sm leading-130"
                :class="displayValueLabelClass"
              >
                {{ value[labelKey] || value }}
              </div>
            </div>
          </slot>
        </div>
        <span class="transition-300" :class="{ 'rotate-180': showOptions }">
          <slot name="chevron">
            <i-chevron-right
              class="transition-all duration-200 rotate-90 inline-block"
            />
          </slot>
        </span>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute w-full bg-white border border-white-100 rounded z-30 overflow-x-hidden max-h-[220px] scroll-style"
        :class="
          position === 'top'
            ? 'bottom-full -translate-y-0'
            : 'top-full translate-y-0'
        "
      >
        <slot name="options">
          <template v-if="options?.length">
            <div
              v-for="(option, idx) in options"
              :key="idx"
              class="transition-all duration-200 px-3 py-2.5 hover:bg-gray-300 cursor-pointer flex-center-between border-b border-white-100 last:border-[0px] group"
              @click="onSelect(option)"
            >
              <slot name="option" :option="option" :index="idx">
                <Highlighter
                  v-if="option?.status"
                  :text-to-highlight="$t(option[labelKey])"
                  class="text-dark text-2xs leading-130 select-none"
                  :class="{ 'font-medium': isActive(option) }"
                  highlight-class-name="bg-yellow-100 rounded-sm p-0.5"
                  :search-words="[searchText]"
                />
                <Highlighter
                  v-else
                  :text-to-highlight="option[labelKey]"
                  class="text-dark text-2xs leading-130 select-none"
                  :class="{ 'font-medium': isActive(option) }"
                  highlight-class-name="bg-yellow-100 rounded-sm p-0.5"
                  :search-words="[searchText]"
                />
              </slot>
              <i
                v-if="isActive(option)"
                class="icon-tick text-2xl text-blue block h-1"
              />
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            {{ $t(noDataText) }}
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'
import Highlighter from 'vue-highlight-words'

import type { IRegions, TClassName } from '~/types'

type TOption = string | number | { [key: string]: string | number }
export interface Props {
  modelValue?: TOption
  options: TOption[] | IRegions[]
  labelKey?: string
  valueKey?: string
  selectedOptionStyles?: string
  placeholder?: string
  infiniteScroll?: boolean
  searchText?: string
  loading?: boolean
  noDataText?: string
  wrapperStyles?: TClassName
  position?: 'top' | 'bottom'
  displayValueLabelClass?: boolean
  placeholderClass?: TClassName
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  labelKey: 'name',
  valueKey: 'id',
  selectedOptionStyles: '',
  searchText: '',
  placeholder: undefined,
  wrapperStyles: undefined,
  noDataText: 'no_search_data',
  position: 'bottom',
  placeholderClass: undefined,
})
const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'on-select', value: any): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
}>()
const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)
function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}
defineExpose({ toggleSelect })
function findOption(option: TOption) {
  return props.options?.find(
    (o) => o === option || o[props.valueKey] === option || o.id == option,
  )
}
let value = computed({
  get() {
    return findOption(props.modelValue)
  },
  set(newValue: TOption) {
    emit('update:modelValue', newValue?.[props.valueKey] ?? newValue)
  },
})
function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('on-select', option)
}
const select = ref()
onClickOutside(select, () => toggleSelect(false))
function isActive(option: TOption) {
  return (
    option === value.value ||
    (value.value &&
      value.value?.[props.valueKey] === option?.[props.valueKey]) ||
    option?.[props.valueKey] === value.value
  )
}
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
})
watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  },
)
watch(
  props,
  () => {
    value = computed({
      get() {
        return findOption(props.modelValue)
      },
      set(newValue: TOption) {
        emit('update:modelValue', newValue?.[props.valueKey] ?? newValue)
      },
    })
  },
  { deep: true },
)
</script>
<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}
.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>

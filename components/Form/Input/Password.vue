<template>
  <FormInput
    v-model="value"
    :placeholder="placeholderSearch"
    v-bind="{ type: currentType, error, inputId }"
  >
    <template #suffix>
      <div
        class="px-3 h-max flex-center cursor-pointer transition-300"
        @click="togglePasswordVisibility"
      >
        <span
          v-if="currentType === 'password'"
          class="icon-eye-slash text-xl text-gray font-bold"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.585 10.9122C10.21 11.2873 9.99936 11.7961 9.99945 12.3266C9.99954 12.857 10.2104 13.3657 10.5855 13.7407C10.9607 14.1157 11.4694 14.3263 11.9999 14.3263C12.5303 14.3262 13.039 14.1153 13.414 13.7402M16.681 16.9982C15.2782 17.8758 13.6547 18.3361 12 18.3252C8.4 18.3252 5.4 16.3252 3 12.3252C4.272 10.2052 5.712 8.6472 7.32 7.6512M10.18 6.50519C10.779 6.38393 11.3888 6.32362 12 6.32519C15.6 6.32519 18.6 8.3252 21 12.3252C20.334 13.4352 19.621 14.3922 18.862 15.1952M3 3.3252L21 21.3252"
              stroke="#354052"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span v-else class="icon-eye text-xl text-gray font-bold"> </span>
      </div>
    </template>
  </FormInput>
</template>

<script lang="ts" setup>
interface Props {
  error?: boolean
  type?: 'password' | 'text'
  inputId?: string
}
const props = defineProps<Props>()
interface Emits {
  (e: 'update:modelValue', v: string): void
  (e: 'change', v: string): void
}
const $emit = defineEmits<Emits>()

const placeholderSearch = computed(() => 'enter_search')

const value = ref<string>('')

// Reactive type state derived from props
const currentType = ref(props.type || 'password')

const togglePasswordVisibility = () => {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
  $emit('change', currentType.value)
}

// Emit changes when value updates
watch(
  () => value.value,
  (v) => {
    value.value = value.value.replace(/\s+/g, '')
    $emit('update:modelValue', v)
  },
)

// Keep `currentType` in sync with `props.type`
watch(
  () => props.type,
  (newType) => {
    currentType.value = newType || 'password'
  },
)
</script>

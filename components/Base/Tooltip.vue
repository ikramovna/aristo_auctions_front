<template>
  <div
    :class="[
      props.show
        ? 'visible opacity-100 !-translate-y-1/4 z-1'
        : 'invisible opacity-0',
      classStyle,
    ]"
    class="absolute w-max flex items-center z-20 bottom-full translate-y-0 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/3 px-4 py-2.5 bg-dark text-orange rounded-lg border border-white duration-300 text-sm leading-130"
  >
    <span class="shrink-0">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  show?: boolean
  classStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  classStyle: '',
})
</script>

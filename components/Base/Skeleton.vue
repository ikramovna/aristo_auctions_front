<template>
  <transition :key="loading" name="skeleton" mode="out-in">
    <div
      v-if="loading"
      key="loading"
      :class="preloaderClass"
      class="flex-shrink-0"
      :style="{
        height: height,
        width: width,
      }"
    >
      <span class="skeleton" :style="shimmerStyles" />
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </transition>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: '30px',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    line: {
      type: [String, Number],
      default: 1,
    },
    borderRadius: {
      type: [String, Number],
      default: 0,
    },
    preloaderClass: {
      type: [String, Array],
      default: () => '',
    },
    circle: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: 'https://picsum.photos/300/300',
    },
  },
  computed: {
    shimmerStyles() {
      return {
        '--height': this.height,
        '--border-radius': this.circle ? '50%' : this.borderRadius,
      }
    },
  },
}
</script>

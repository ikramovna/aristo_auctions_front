<template>
  <div :class="mainClass ? mainClass : 'flex flex-col gap-1 w-full'">
    <div class="flex-center-between">
      <p
        :class="labelClass"
        class="text-sm leading-130 font-medium text-[#ffffff99]"
      >
        {{ label }}
        <span v-if="isRequired" class="text-red">*</span>
      </p>
      <transition-group name="fade-sm">
        <div :key="true">
          <p
            v-for="error in errors"
            :key="error.$uid"
            class="text-sm leading-130 font-normal text-red"
          >
            {{ error?.$message }}
          </p>
        </div>
      </transition-group>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

import type { TClassName } from '~/types'

interface Props {
  label?: string
  mainClass?: TClassName
  labelClass?: TClassName
  errors?: ErrorObject[]
  errorLabel?: TClassName
  isRequired?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'Label',
  labelClass: '',
})
</script>

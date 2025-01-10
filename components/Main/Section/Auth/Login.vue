<template>
  <div>
    <div class="flex flex-col gap-4">
      <FormGroup label="Username" for-id="username">
        <FormInput
          v-model="values.username"
          input-id="username"
          placeholder="Enter username"
          input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
          :error="form.$v.value.username.$error"
        />
      </FormGroup>
      <FormGroup label="Password" for-id="password">
        <FormInputPassword
          v-model="values.password"
          input-id="password"
          placeholder="Enter password"
          input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
          :error="form.$v.value.password.$error"
        />
      </FormGroup>
      <div>
        <button
          class="text-sm leading-20 font-medium underline text-blue text-left w-auto inline-block transition-300 hover:text-dark"
          @click="$emit('password')"
        >
          Forgot Password
        </button>
      </div>
    </div>

    <BaseButton
      class="w-full mt-5"
      :text="'Login'"
      variant="orange"
      :disabled="isDisabled"
      :loading="isLoading"
      @click="submit"
    />
    <div class="flex-center gap-2 mt-3">
      <p class="text-dark/50 leading-20 text-sm font-medium">
        Don't have an account?
      </p>
      <button
        class="text-sm leading-20 font-medium text-dark hover:text-blue transition-300"
        @click="$emit('register')"
      >
        Registration
      </button>
    </div>
    <p v-if="errorMessage" class="mt-4 text-red-500 text-sm">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import type { TForm } from '~/composables/useForm'

// Props and emits
interface Props {
  form: TForm<any>
}
const props = defineProps<Props>()
const emit = defineEmits(['on-submit', 'password', 'register'])

// Destructure form values and validation
const { form } = unref(props)
const { values, $v } = form

// State
const isDisabled = ref(true)
const isLoading = ref(false)
const errorMessage = ref('')

// Submit the login form
async function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    isLoading.value = true
    errorMessage.value = '' // Reset error message
    try {
      const response = await axios.post(
        'https://aristoback.ikramovna.me/api/v1/users/login',
        {
          username: values.username,
          password: values.password,
        },
      )

      // Save tokens in localStorage
      const { access, refresh } = response.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      // Emit success event
      emit('on-submit')
    } catch (err) {
      // Handle error response
      errorMessage.value =
        err.response?.data?.error ||
        'Login failed. Please check your credentials.'
    } finally {
      isLoading.value = false
    }
  } else {
    errorMessage.value = 'Please fill in all required fields.'
  }
}

// Watch for form changes to enable/disable button
watch(
  () => values,
  () => {
    isDisabled.value = !(values?.username?.length && values?.password?.length)
  },
  { deep: true, immediate: true },
)
</script>

<style scoped>
/* Add custom styles if needed */
</style>

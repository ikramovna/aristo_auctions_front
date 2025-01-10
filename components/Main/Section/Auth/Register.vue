<template>
  <div>
    <div class="flex flex-col gap-4 mb-5">
      <FormGroup label="Full name" for-id="full_name">
        <FormInput
          v-model="values.full_name"
          input-id="full_name"
          placeholder="Enter full name"
          input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
          :error="form.$v.value.full_name.$error"
        />
      </FormGroup>
      <FormGroup label="User name" for-id="user_name">
        <FormInput
          v-model="values.username"
          input-id="username"
          placeholder="Enter user name"
          input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
          :error="form.$v.value.username.$error"
        />
      </FormGroup>
      <FormGroup label="Email" for-id="email">
        <FormInput
          v-model="values.email"
          input-id="email"
          input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
          placeholder="Enter email"
          :error="form.$v.value.email.$error"
        />
      </FormGroup>
      <FormGroup label="Password" for-id="password">
        <FormInputPassword
          v-model="values.password"
          class="!bg-[#F4F7F5] !font-medium text-black"
          input-id="password"
          placeholder="Enter password"
          v-bind="{ type }"
          :error="form.$v.value.password.$error"
          @change="type = $event"
        />
      </FormGroup>
    </div>

    <BaseButton
      v-if="!showActivation"
      class="w-full mt-5"
      v-bind="{ loading }"
      variant="orange"
      text="Verify Email"
      @click="submitRegistration"
    />

    <div v-if="showActivation" class="flex flex-col gap-4">
      <FormGroup label="Activation Code" for-id="activation_code">
        <FormInput
          v-model="activationCode"
          input-id="activation_code"
          placeholder="Enter activation code"
          input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
        />
      </FormGroup>
      <BaseButton
        class="w-full mt-3"
        v-bind="{ loading }"
        variant="orange"
        text="Submit Activation Code"
        @click="submitActivationCode"
      />
    </div>

    <div class="flex-center gap-2 mt-3">
      <p class="text-dark/50 leading-20 text-sm font-medium">
        Already have an account?
      </p>
      <button
        class="text-sm leading-20 font-medium text-dark hover:text-blue transition-300"
        @click="$emit('login')"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['on-register', 'load-more', 'login'])
const { form } = unref(props)
const { values, $v } = form

const type = ref('password')
const showActivation = ref(false)
const activationCode = ref('')

async function submitRegistration() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    try {
      await axios.post(
        'https://aristoback.ikramovna.me/api/v1/users/register',
        values,
      )

      showActivation.value = true
    } catch (error) {
      // showToast('error', 'Registration failed. Please try again.')
    }
  }
}

async function submitActivationCode() {
  try {
    const response = await axios.post(
      'https://aristoback.ikramovna.me/api/v1/users/register-activate-code',
      {
        email: values.email,
        activate_code: activationCode.value,
      },
    )
    const accessToken = response.data.access_token
    emit('activation-success', accessToken)
    localStorage.setItem('access_token', accessToken)
    emit('on-register')
  } catch (error) {
    // showToast('error', 'Invalid activation code. Please try again.')
  }
}
</script>

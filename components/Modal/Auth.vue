<template>
  <Modal
    v-bind="{ show }"
    :title="titles?.[innerState]"
    body-class="!max-w-[378px]"
    disable-outer-close
    @close="
      () => {
        $emit('close')
        innerState = 'login'
      }
    "
  >
    <div class="p-5 pt-4">
      <MainSectionAuthLogin
        v-if="innerState === ESTATE.login"
        :form="loginForm"
        :loading="loginBtnLoading"
        @on-submit="onLogin"
        @register="innerState = ESTATE.register"
        @password="toReset"
      />
      <MainSectionAuthRegister
        v-if="innerState === ESTATE.register"
        :form="registerForm"
        :loading="regLoading"
        @on-register="onRegister"
        @login="innerState = ESTATE.login"
        @activation-success="onActivationSuccess"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { email, minLength, required } from '@vuelidate/validators'

interface Props {
  show?: boolean
  state?: 'login' | 'register' | 'password'
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const innerState = ref(props.state)
const regLoading = ref(false)
const loginBtnLoading = ref(false)
enum ESTATE {
  login = 'login',
  register = 'register',
  password = 'password',
}

const titles = {
  login: 'Login',
  register: 'Registration',
  password: 'Reset password',
}

const loginForm = useForm(
  {
    username: '',
    password: '',
  },
  {
    username: {
      required,
    },
    password: {
      required,
    },
  },
)

const registerForm = useForm(
  {
    full_name: '',
    username: '',
    email: '',
    password: '',
    verify_email: '',
  },
  {
    full_name: {
      required,
    },

    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    verify_email: {},
  },
)

function toReset() {
  clearLogin()
  innerState.value = ESTATE.password
}

async function onLogin() {
  loginBtnLoading.value = true
  useApi()
    .$post('/users/login', {
      body: {
        ...loginForm.values,
      },
    })
    .then((res) => {
      console.log(res, 'Login successful')
      emit('close')
      clearLogin()
      // showToast('success', 'Login successful')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loginBtnLoading.value = false
    })
}

function onRegister() {
  const obj = { ...registerForm.values }
  regLoading.value = true
  useApi()
    .$post('/users/register', {
      body: {
        ...obj,
      },
    })
    .then((res) => {
      console.log(res, 'Registration successful')
      clearRegister()
      // showToast('registration_success', 'Registration successful')
      loginForm.values.email = obj.email
      loginForm.values.password = obj.password
      innerState.value = ESTATE.login
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      regLoading.value = false
    })
}

function onActivationSuccess(accessToken: string) {
  localStorage.setItem('access_token', accessToken)
  emit('close')
}

function clearRegister() {
  for (const key in registerForm.values) {
    registerForm.values[key] = ''
  }
  registerForm.values.checked = false
  registerForm.$v.value.$reset()
}

function clearLogin() {
  loginForm.values.email = ''
  loginForm.values.password = ''
  loginForm.$v.value.$reset()
}

function resetDone(e: { email: string; password: string }) {
  loginForm.values.email = e.email
  loginForm.values.password = e.password
  innerState.value = ESTATE.login
}
</script>

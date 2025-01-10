<template>
  <div class="bg-white">
    <div class="relative container">
      <BaseBreadcrumb :breadcrumb="menu" />
      <div class="w-full lg:w-[782px] mx-auto">
        <div
          class="flex md:items-center md:justify-center flex-col pt-4 pb-10 gap-4"
        >
          <h3 class="section-title !text-black">Contact us</h3>

          <form class="grid grid-cols-2 gap-6 w-full" @submit.prevent>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              label="Your name"
              label-class="!text-[#454545] text-sm font-medium leading-140 mb-1"
            >
              <FormInput
                v-model="form.values.name"
                class="!font-medium"
                is-transparent
                :error="form.$v.value.name?.$error"
                placeholder="Enter your name"
                input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
              />
            </FormGroup>
            <FormGroup
              label="Email"
              label-class="!text-[#454545] text-sm font-medium leading-140 mb-1"
              main-class="col-span-2"
            >
              <FormInput
                v-model="form.values.email"
                is-transparent
                :error="form.$v.value.email?.$error"
                placeholder="Enter your email"
                input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black"
                class="!font-medium"
              />
            </FormGroup>

            <FormGroup
              label="Message"
              main-class="flex flex-col gap-1 col-span-2 "
              label-class="!text-[#454545] text-sm font-medium leading-140 mb-1 "
            >
              <FormTextarea
                v-model="form.values.message"
                is-transparent
                :error="form.$v.value.message?.$error"
                placeholder="Enter your message"
                input-class="pl-3 py-2.5 !h-[140px] !bg-[#F4F7F5] font-semibold leading-140 !text-dark !font-medium"
                class="!text-[#454545] !font-medium"
              />
            </FormGroup>

            <div class="col-span-2 md:col-span-1">
              <vue-recaptcha
                :key="trigger"
                size="large"
                :sitekey="key"
                @verify="verifyMethod"
                @expired="expiredMethod"
              />
            </div>
            <div class="flex-y-center justify-end col-span-2 md:col-span-1">
              <BaseButton
                class="w-full !text-sm md:w-[270px] !font-bold !leading-none !py-3 !px-6 !text-white hover:!text-black"
                variant="orange"
                :text="'Send'"
                :disabled="!captchaToken"
                :loading="buttonLoading"
                @click="sendMail"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { email, required } from '@vuelidate/validators'
import vueRecaptcha from 'vue3-recaptcha2'

const captchaToken = ref()
const trigger = ref(false)
const key = computed(() => import.meta.env.VITE_RECAPTCHA_KEY)

const menu = computed(() => {
  return [
    {
      title: 'Contact us',
      link: '/contact',
    },
  ]
})
const buttonLoading = ref(false)
const form = useForm(
  {
    name: '',
    email: '',
    message: '',
  },
  {
    email: { required, email },
    name: { required },
    message: { required },
  },
)

const sendMail = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true
    try {
      useApi()
        .$post('auction/contact', {
          body: {
            name: form.values.name,
            message: form.values.message,
            email: form.values.email,
          },
        })
        .then(() => {
          form.$v.value.$reset()
          form.values.name = ''
          form.values.message = ''
          form.values.email = ''
          trigger.value = true
        })
    } catch (e) {
      console.log(e)
    } finally {
      buttonLoading.value = false
    }
  }
}

function verifyMethod(response: any) {
  captchaToken.value = response
}
function expiredMethod() {
  captchaToken.value = null
}
</script>

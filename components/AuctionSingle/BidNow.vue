<template>
  <div class="shadow-[5px_7px_35px_0px_rgba(113,113,113,0.1)] rounded p-4 mt-6">
    <h3
      class="text-[20px] font-extrabold text-gray-100 inline-block uppercase mb-2.5"
    >
      Bid Now
    </h3>
    <div class="flex items-center">
      <!-- Bid Input -->
      <FormInput
        v-model="form.values.bid_amount"
        is-transparent
        type="number"
        :error="form.$v.value.bid_amount?.$error"
        placeholder="Enter your bid amount"
        input-class="pl-3 py-2.5 !bg-[#F4F7F5] !font-medium text-black w-full"
        class="!font-medium !w-full rounded-tl-[5px] rounded-bl-[5px] rounded-tr-[0px] rounded-br-[0px]"
      />
      <!-- Send Bid Button -->
      <BaseButton
        class="w-max !text-sm !font-bold !leading-none p-5 !text-white hover:!text-black rounded-none rounded-tr-[5px] rounded-br-[5px] rounded-tl-[0px] rounded-bl-[0px]"
        variant="orange"
        :text="'Send'"
        @click="sendBid"
      />
    </div>
    <!-- Message Display -->
    <p v-if="message" class="mt-3 text-sm font-semibold" :class="messageClass">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { minValue, required } from '@vuelidate/validators'
import axios from 'axios'
import { ref } from 'vue'

// Define form and validation rules
const form = useForm(
  {
    bid_amount: '',
  },
  {
    bid_amount: {
      required,
      minValue: minValue(1), // Ensure bid amount is greater than 0
    },
  },
)

// Props for auction ID
interface Props {
  auction: {
    id: number
  }
}
const props = defineProps<Props>()

// State for success/error message
const message = ref('')
const messageClass = ref('text-green-500') // Green for success, red for error

// Axios instance with Authorization header
const apiClient = axios.create({
  baseURL: 'https://aristoback.ikramovna.me/api/v1',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Include token
  },
})

// Handle sending the bid
const sendBid = async () => {
  form.$v.value.$touch() // Trigger validation
  if (!form.$v.value.$invalid) {
    try {
      const response = await apiClient.post('/auction/bid', {
        bid_amount: form.values.bid_amount,
        auction: props.auction.id, // Auction ID from props
      })

      // Handle success response
      message.value = response.data.message || 'Bid placed successfully!'
      messageClass.value = 'text-green-500'
      form.$v.value.$reset()
      form.values.bid_amount = ''
      window.location.reload() // Refresh the page
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response?.data?.error || 'Failed to place bid. Please try again.'
      message.value = errorMessage
      messageClass.value = 'text-red-500'
    }
  } else {
    // Validation errors
    message.value = 'Please enter a valid bid amount.'
    messageClass.value = 'text-red-500'
  }
}
</script>

<style scoped>
/* Additional styling for feedback messages */
.text-green-500 {
  color: #10b981; /* Tailwind green color */
}
.text-red-500 {
  color: #ef4444; /* Tailwind red color */
}
</style>

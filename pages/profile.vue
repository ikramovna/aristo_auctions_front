<template>
  <div class="min-h-[70vh]">
    <div
      class="flex container flex-col lg:flex-row items-center lg:items-start justify-between mx-auto bg-[#1a1a1a] rounded-lg shadow-md p-8 mt-10"
    >
      <!-- Left Section: User Image and Basic Info -->
      <div
        class="flex flex-col items-center w-full lg:w-1/3 bg-[#333333] p-6 rounded-lg"
      >
        <div class="w-40 h-40 mb-4 relative">
          <img
            :src="previewImage || profileData.image || defaultImage"
            alt="User Image"
            class="w-full h-full object-cover rounded-full border-4 border-orange-500"
          />
          <label
            v-if="isEditing"
            for="image-upload"
            class="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 21.3252V19.3252C6 18.2643 6.42143 17.2469 7.17157 16.4968C7.92172 15.7466 8.93913 15.3252 10 15.3252H14C14.342 15.3252 14.674 15.3682 14.99 15.4492M19 16.3252V22.3252M19 22.3252L22 19.3252M19 22.3252L16 19.3252M8 7.3252C8 8.38606 8.42143 9.40348 9.17157 10.1536C9.92172 10.9038 10.9391 11.3252 12 11.3252C13.0609 11.3252 14.0783 10.9038 14.8284 10.1536C15.5786 9.40348 16 8.38606 16 7.3252C16 6.26433 15.5786 5.24691 14.8284 4.49677C14.0783 3.74662 13.0609 3.3252 12 3.3252C10.9391 3.3252 9.92172 3.74662 9.17157 4.49677C8.42143 5.24691 8 6.26433 8 7.3252Z"
                stroke="#354052"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
        </div>
        <h2 class="text-2xl font-bold text-white mb-1">
          {{ profileData.full_name }}
        </h2>
        <p class="text-sm text-gray-400">
          {{ profileData.address || 'No address provided' }}
        </p>
      </div>

      <!-- Right Section: Profile Details -->
      <div
        class="flex flex-col w-full lg:w-2/3 mt-6 lg:mt-0 bg-[#1a1a1a] p-6 rounded-lg"
      >
        <h3 class="text-2xl font-bold text-white mb-6">
          {{ isEditing ? 'Edit Profile' : 'User Profile' }}
        </h3>

        <!-- Profile Details -->
        <div v-if="!isEditing" class="space-y-4">
          <p class="flex justify-between text-gray-400 text-sm">
            <span class="font-semibold text-orange-500">Phone:</span>
            <span>{{ profileData.phone || 'N/A' }}</span>
          </p>
          <p class="flex justify-between text-gray-400 text-sm">
            <span class="font-semibold text-orange-500">Email:</span>
            <span>{{ profileData.email }}</span>
          </p>
          <p class="flex justify-between text-gray-400 text-sm">
            <span class="font-semibold text-orange-500">Username:</span>
            <span>{{ profileData.username }}</span>
          </p>
          <p class="flex justify-between text-gray-400 text-sm">
            <span class="font-semibold text-orange-500">Bio:</span>
            <span>{{ profileData.bio || 'No bio available' }}</span>
          </p>
          <button
            class="mt-4 w-max bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            @click="toggleEdit"
          >
            Edit Profile
          </button>
        </div>
        <!-- Edit Profile Form -->
        <form v-else class="space-y-4" @submit.prevent="updateProfile">
          <div>
            <label for="full_name" class="text-gray-400">Full Name</label>
            <input
              id="full_name"
              v-model="editData.full_name"
              type="text"
              class="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
          <div>
            <label for="email" class="text-gray-400">Email</label>
            <input
              id="email"
              v-model="editData.email"
              type="email"
              class="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
          <div>
            <label for="phone" class="text-gray-400">Phone</label>
            <input
              id="phone"
              v-model="editData.phone"
              type="text"
              class="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
          <div>
            <label for="username" class="text-gray-400">Username</label>
            <input
              id="username"
              v-model="editData.username"
              type="text"
              class="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
          <div>
            <label for="bio" class="text-gray-400">Bio</label>
            <textarea
              id="bio"
              v-model="editData.bio"
              rows="3"
              class="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            ></textarea>
          </div>
          <div class="flex space-x-4">
            <button
              type="submit"
              class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              @click="toggleEdit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

const profileData = ref({
  id: null,
  full_name: '',
  email: '',
  phone: null,
  username: '',
  bio: '',
  address: null,
  image: '',
})

const editData = reactive({
  full_name: '',
  email: '',
  phone: '',
  username: '',
  bio: '',
})

const isEditing = ref(false)
const loading = ref(false)
const error = ref('')
const defaultImage = '/images/default-image.webp'
const previewImage = ref('')

const fetchUserProfile = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get(
      'https://aristoback.ikramovna.me/api/v1/users/profile',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    )
    profileData.value = response.data
    Object.assign(editData, response.data) // Initialize edit form with profile data
  } catch (err) {
    error.value = 'Failed to load profile data. Please try again later.'
  } finally {
    loading.value = false
  }
}

const updateProfile = async () => {
  loading.value = true
  error.value = ''
  try {
    const formData = new FormData()
    formData.append('full_name', editData.full_name)
    formData.append('email', editData.email)
    formData.append('phone', editData.phone)
    formData.append('username', editData.username)
    formData.append('bio', editData.bio)
    if (editData.image) {
      formData.append('image', editData.image)
    }
    const response = await axios.put(
      'https://aristoback.ikramovna.me/api/v1/users/profile',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    profileData.value = response.data
    isEditing.value = false // Exit edit mode
  } catch (err) {
    error.value = 'Failed to update profile. Please try again later.'
  } finally {
    loading.value = false
  }
}

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    editData.image = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
/* Custom styles for profile image and spacing */
</style>

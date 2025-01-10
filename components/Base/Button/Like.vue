<template>
  <div class="flex-y-center gap-1">
    <!-- Like Button -->
    <p class="text-gray-500">Likes: {{ likesCount }}</p>
    <button class="flex-center" aria-label="like" @click="toggleLike">
      <svg
        :class="{ 'animation-like': liked }"
        :width="iconWidth"
        :height="iconHeight"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="transition-300"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32.5 22.62L20 35L7.5 22.62M7.5 22.62C5.25216 20.4326 4.42288 17.1684 5.35413 14.1734C6.28538 11.1784 8.81942 8.95991 11.9113 8.43283C15.0031 7.90576 18.129 9.15935 20 11.6767C21.8788 9.17798 24.998 7.94102 28.0787 8.47303C31.1593 9.00503 33.683 11.2165 34.615 14.2006C35.5469 17.1847 34.7303 20.4393 32.5 22.63"
          :class="liked ? 'fill-red-500' : 'fill-transparent'"
        />
        <path
          class="transition-300 main__like"
          d="M32.5 22.62L20 35L7.5 22.62C5.25216 20.4326 4.42288 17.1684 5.35413 14.1734C6.28538 11.1784 8.81942 8.95991 11.9113 8.43283C15.0031 7.90576 18.129 9.15935 20 11.6767C21.8788 9.17798 24.998 7.94102 28.0787 8.47303C31.1593 9.00503 33.683 11.2165 34.615 14.2006C35.5469 17.1847 34.7303 20.4393 32.5 22.63"
          :class="[mainClass, liked ? 'stroke-red-500' : 'stroke-gray-600']"
          stroke-width="3px"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

// Props for auction ID and icon dimensions
interface Props {
  auctionId: number
  iconWidth?: string
  iconHeight?: string
  mainClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  iconWidth: '24',
  iconHeight: '24',
})

// State for "liked" status and likes count
const liked = ref(false)
const likesCount = ref<number | null>(null)

// Function to get authentication token
const getAuthToken = () => {
  return localStorage.getItem('access_token') || ''
}

// Axios instance with Authorization header
const apiClient = axios.create({
  baseURL: 'https://aristoback.ikramovna.me/api/v1',
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
})

// Fetch initial liked status from the API
const fetchLikedStatus = async () => {
  try {
    const response = await apiClient.get('/auction/favorites')
    const favoriteItem = response.data.find(
      (item: any) => item.auction === props.auctionId,
    )
    if (favoriteItem) {
      liked.value = favoriteItem.liked
      likesCount.value = favoriteItem.likes_count
    }
  } catch (error) {
    console.error('Failed to fetch liked status:', error)
  }
}

// Toggle like status
const toggleLike = async () => {
  try {
    const response = await apiClient.post('/auction/favorites', {
      auction: props.auctionId,
      liked: !liked.value, // Toggle liked status
    })
    liked.value = response.data.liked
    likesCount.value = response.data.likes_count
  } catch (error) {
    console.error('Failed to update like status:', error)
  }
}

// Fetch initial status when component is mounted
onMounted(fetchLikedStatus)
</script>

<style scoped>
.animation-like {
  animation: like 500ms ease-in-out forwards;
}
@keyframes like {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
.fill-red-500 {
  fill: #ef4444;
}
.stroke-red-500 {
  stroke: #ef4444;
}
.fill-transparent {
  fill: transparent;
}
.stroke-gray-600 {
  stroke: #4b5563;
}
.transition-300 {
  transition: all 300ms ease-in-out;
}
</style>

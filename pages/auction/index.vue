<template>
  <div class="bg-white pb-10 md:pb-16">
    <div class="relative container">
      <BaseBreadcrumb :breadcrumb="menu" />
      <h3 class="section-title !text-black mb-6">Auction</h3>
      <!-- Filters Section -->
      <div class="flex">
        <aside class="w-1/4 pr-6 space-y-8">
          <!-- Price Filter -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-orange">Price</h4>
            <div class="flex items-center space-x-4">
              <input
                v-model="filters.min_price"
                type="number"
                placeholder="от"
                class="w-full border-gray-300 border rounded-lg p-2 text-black"
              />
              <input
                v-model="filters.max_price"
                type="number"
                placeholder="до"
                class="w-full border-gray-300 border rounded-lg p-2 text-black"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-orange">Status</h4>
            <ul>
              <li v-for="status in statuses" :key="status">
                <label class="flex items-center space-x-2">
                  <input
                    v-model="filters.status"
                    type="checkbox"
                    :value="status"
                  />
                  <span class="text-black capitalize">{{ status }}</span>
                </label>
              </li>
            </ul>
          </div>

          <!-- Auction Period Filter -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-orange">
              Auction Period
            </h4>
            <ul>
              <li v-for="period in auctionPeriods" :key="period">
                <label class="flex items-center space-x-2">
                  <input
                    v-model="filters.auction_period"
                    type="checkbox"
                    :value="period"
                  />
                  <span class="text-black capitalize">{{ period }}</span>
                </label>
              </li>
            </ul>
          </div>

          <!-- Date Filter -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-orange">Date</h4>

            <input
              v-model="filters.start_date"
              type="date"
              class="w-full border-gray-300 border rounded-lg p-2 text-black"
            />
            <input
              v-model="filters.end_date"
              type="date"
              class="w-full border-gray-300 border rounded-lg p-2 text-black mt-2"
            />
          </div>

          <!-- Apply Filters Button -->
          <button
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
            @click="applyFilters"
          >
            Apply Filters
          </button>
        </aside>

        <!-- Auction List Section -->
        <main class="w-3/4">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 md:gap-5"
          >
            <CommonCardAuctionPageC
              v-for="(item, index) in auctions"
              :key="index"
              :data="item"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const auctions = ref([])
const filters = ref({
  min_price: '',
  max_price: '',
  status: [],
  auction_period: [],
  start_date: '',
  end_date: '',
})

const statuses = ['upcoming', 'live', 'completed', 'cancelled']
const auctionPeriods = ['morning', 'afternoon', 'evening']

function fetchAuctions() {
  useApi()
    .$get('/auction/filter', { params: filters.value })
    .then((res) => {
      auctions.value = res
    })
    .catch((err) => {
      console.error('Failed to fetch auctions:', err)
    })
}

function applyFilters() {
  fetchAuctions()
}

fetchAuctions()

const menu = computed(() => {
  return [
    {
      title: 'Auction',
      link: '/auction',
    },
  ]
})
</script>

<style scoped>
aside {
  flex-shrink: 0;
}
main {
  flex-grow: 1;
}
</style>

<template>
  <div>
    <p class="text-2xl font-bold text-gray-100 mb-2.5">
      {{ data?.name }}
    </p>
    <p class="font-medium text-[#212529] leading-7 mb-5">
      {{ data?.description }}
    </p>
    <div class="shadow-[5px_7px_35px_0px_rgba(113,113,113,0.1)] rounded p-7">
      <h3
        class="text-[20px] font-extrabold text-gray-100 inline-block uppercase mb-6"
      >
        Your content here
      </h3>

      <div>
        <div class="w-full">
          <div class="divide-y divide-[#d1d1d1]">
            <div
              v-for="(detail, index) in formattedDetails"
              :key="index"
              class="flex justify-between py-2 text-[#454545]"
            >
              <span class="font-medium whitespace-nowrap"
                >{{ detail.label }} :</span
              >
              <span>{{ detail.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AuctionSingleBidNow :auction="data" />
    <div
      v-if="data?.bid_history.length"
      class="mt-6 shadow-[5px_7px_35px_0px_rgba(113,113,113,0.1)] rounded p-4"
    >
      <h3
        class="text-[20px] font-extrabold text-gray-100 inline-block uppercase mb-2.5"
      >
        Bidding History
      </h3>
      <AuctionSingleBidHistory
        v-for="(item, idx) in data?.bid_history"
        :key="idx"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    name: string
    description: string
    bid_history: string[]
    additional_details: Record<string, string | number>[]
  }
}

const props = defineProps<Props>()

// Map the keys of each detail object to user-friendly labels
const formattedLabels: Record<string, string> = {
  lot_ref_num: 'Lot Reference Number',
  lot_num_two: 'Lot Number',
  piece_title: 'Piece Title',
  price: 'Price',
  dimensions: 'Dimensions',
  framed_text: 'Framed Text',
  body_style: 'Body Style',
  medium: 'Medium',
  color_scheme: 'Color Scheme',
  condition: 'Condition',
  warranty: 'Warranty',
  date_prod: 'Date Produced',
  artist_name: 'Artist Name',
  artist_birth_date: 'Artist Birth Date',
  artist_death_date: 'Artist Death Date',
  artist_address: 'Artist Address',
  artist_image: 'Artist Image',
  artist_bio: 'Artist Bio',
}

const formattedDetails = computed(() =>
  props?.data?.additional_details?.flatMap((detail) =>
    Object.entries(detail).map(([key, value]) => ({
      label: formattedLabels[key] || key,
      value,
    })),
  ),
)
</script>

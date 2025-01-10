<template>
  <div
    class="rounded-[5px] shadow-[5px_7px_35px_0px_rgba(113,113,113,0.1)] p-7 mt-7 flex-col"
  >
    <p
      class="text-[20px] font-extrabold text-gray-100 relative inline-block uppercase mb-6"
    >
      Share Now
    </p>
    <CommonSocials
      bg-class="!bg-[#00152b1a]"
      icon-class="!text-gray-100"
      :socials="socialsData"
    />
  </div>
</template>

<script setup lang="ts">
const socialsData = {
  instagram: 'https://www.instagram.com/tmc.uz/',
  facebook: 'https://www.facebook.com/tmc.uz/',
  telegram: 'https://t.me/tmc_uz',
  pinterest: 'https://www.pinterest.com/tmc.uz/',
}
</script>

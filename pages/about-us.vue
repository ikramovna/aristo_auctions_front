<template>
  <div class="bg-white">
    <div class="container py-24">
      <div class="flex items-center gap-5 justify-between">
        <img src="/images/about-image-group.png" alt="image" />
        <div class="w-[40%]">
          <h2
            class="font-extrabold text-[35px] capitalize text-gray-100 font-primary relative inline-block mb-5"
          >
            About us
            <span
              class="absolute w-7 h-0.5 bg-gray-100 top-1/2 -translate-y-1/2 -right-10"
            ></span>
          </h2>
          <p
            class="font-bold font-primary text-2xl leading-[35px] capitalize text-[#454545] pl-[14px] relative before:content-[''] before:left-0 before:absolute before:w-[3px] before:h-[54px] before:bg-gray-100 before:rounded-tr-md before:rounded-br-md before:top-1/2 before:-translate-y-1/2"
          >
            The auction platform for artists, arts organisations and charities.
          </p>
          <p class="font-medium text-base leading-[25px] text-[#5c5c5c] mb-5">
            An auction is an exciting day out, and you might find something
            special to take home. It's quite a specialist method of buying, so
            it's good to know the ins and outs in advance. it to make a type
            specimen book.
          </p>

          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex items-center gap-2 mb-3"
          >
            <img src="/images/arrow-right-fancy.svg" alt="arrow icon" />
            <p class="font-semibold text-gray-100">{{ item }}</p>
          </div>
        </div>
      </div>

      <div class="py-10 w-full lg:w-[782px] mx-auto">
        <h3 class="section-title !text-black md:text-center">F.A.Q</h3>
        <CommonFaq clas="py-6" :faq="faq" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  'Unrivaled Auction Service',
  ' Extensive Marketing',
  'Existing Corporate Client Database',
]

const faq = [
  {
    id: 1,
    question: 'What is the difference between the two types of registration?',
    answer:
      'There are two types of registration: free and paid. The free registration is for those who want to register for the event without paying any fees. The paid registration is for those who want to register for the event and pay a fee for it.',
  },
  {
    id: 2,
    question: 'What is the deadline for registration?',
    answer:
      'The registration deadline is the date when the registration period ends. The registration period is the period during which you can register for the event.',
  },
]
</script>

<template>
  <div class="grid items-start gap-x-4">
    <div
      v-for="(item, index) in faq"
      :key="index"
      class="group transition-300 border-b last:border-b-[0px] border-white-400"
    >
      <div
        class="flex items-center justify-between cursor-pointer transition-300 rounded-2xl py-4"
        :class="[selectedItem === item.id ? '' : '']"
        @click="openItem(item.id)"
      >
        <h4
          class="font-medium text-lg text-gray-100 !leading-130 transition-colors duration-300 group-hover:text-orange"
        >
          {{ item.question }}
        </h4>
        <div
          class="plusminus flex-shrink-0 ml-1"
          :class="{ active: selectedItem === item.id }"
        ></div>
      </div>
      <CollapseTransition>
        <div v-if="selectedItem === item.id" class="pb-4">
          <p class="!leading-130 text-black" :class="answerClass">
            {{ item.answer }}
          </p>
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { ref } from 'vue'
const selectedItem = ref(0)

interface IFaq {
  id: number
  question: string
  answer: string
}

interface Props {
  faq: IFaq[]
  questionClass?: string
  answerClass?: string
}

defineProps<Props>()

const openItem = (id: number) => {
  if (selectedItem.value === id) {
    selectedItem.value = 0
    return
  }
  selectedItem.value = id
}
</script>

<style scoped>
.plusminus {
  position: relative;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.plusminus.active::before {
  transform: translatey(-50%) rotate(-90deg);
  opacity: 0;
}

.plusminus.active::after {
  transform: translatey(-50%) rotate(0);
}

.plusminus::before,
.plusminus::after {
  content: '';
  display: block;
  background-color: #00152b;
  position: absolute;
  top: 50%;
  left: 0;
  transition: 0.35s;
  width: 100%;
  height: 2px;
}

.plusminus::after {
  transform: translatey(-50%) rotate(90deg);
}

.plusminus::before {
  transform: translatey(-50%);
}
</style>

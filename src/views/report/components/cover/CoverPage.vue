<script setup lang="ts">
import { IBabyInfo } from '@/type/report'
const emits = defineEmits(['start'])
const props = defineProps(['info'])
const info = computed<IBabyInfo>(() => props.info)
</script>

<template>
  <div class="cover">
    <img :src="info.headImg" class="cover-head" />
    <div class="cover-name">{{ info.babyName }}</div>
    <div class="cover-class">{{ info.schoolName }}-{{ info.className }}</div>
    <div class="cover-start" @click="emits('start')">开启报告</div>
  </div>
</template>

<style scoped></style>

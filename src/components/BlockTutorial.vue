<template>
<div class="section-container">
  <h2 class="title">使用Zentro Tool</h2>
  <div class="content">
    <TutorialCard />
  </div>
</div>
</template>

<script setup>
import TutorialCard from './smallComponents/TutorialCard'
</script>

<style scoped>
.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title {
  position: relative;
  font-size: 3em;
  margin-bottom: 1.5em;
}
.content {
  display: flex;
  gap: 5em;
}
</style>

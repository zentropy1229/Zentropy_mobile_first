<template>
  <label v-for="item of options" :key="item">
    <input type="radio" name="item">
    <span>{{item}}</span>
  </label>
</template>

<script setup>
import { defineProps, toRef } from 'vue'
const props = defineProps({
  option: undefined
})
const options = toRef(props, 'option')
</script>

<style scoped>
  label span {
    margin-left: 1em;
    padding: .5em 1em;
    border-radius: 3em;
    background: var(--primary-color);
    color: var(--text-color-white);
    cursor: pointer;
  }
  label input {
    display: none;
  }
  label input:checked ~ span {
    background: rgb(170, 209, 255);
    color: var(--text-color-black);
  }
  label:hover {
    background: var(--text-color-white);
    color: var(--text-color-black);
  }
</style>

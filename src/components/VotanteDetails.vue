<template>
  <div id="container">
    <h3>{{ props.votante }}</h3>
    <!-- <p>{{ props.lider }}</p> -->

    <button @click="closeDetails">Cerrar</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({ votante: Object });

const emit = defineEmits(["close"]);

const closeDetails = () => {
  emit("close");
};
</script>

<style scoped lang="scss"></style>

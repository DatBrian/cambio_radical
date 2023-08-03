<template>
  <div id="container">
    <div class="filtro">
      <span>Lider</span>
      <input type="text" />
    </div>

    <div class="filtro">
      <span>Barrio</span>
      <input type="text" />
    </div>

    <div class="filtro">
      <span>Comuna</span>
      <input type="number" />
    </div>
    <div id="closeButton">
      <button id="close" @click="showMenuBtn">Cerrar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["showMenuBtn"]);

const showMenuBtn = () => {
  emit("showMenuBtn");
};
</script>

<style scoped lang="scss">
#container {
  padding: 5%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.filtro {
  display: flex;
  flex-direction: column;
  margin-block: em(1);
}

span {
  font-size: em(2);
  font-family: $font_title;
  margin-block-end: em(1);
  font-weight: 700;
}

input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 0.5em;
  background-color: $gray;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.15);
  transition: 300ms ease-in-out;
}

#closeButton {
  width: 100%;
  margin-top: em(2);
  display: flex;
}

#close {
  border: none;
  padding-block: em(1.2);
  width: 20%;
  border-radius: 5px;
  width: 20%;
  background-color: $red;
  cursor: pointer;
  margin: auto;
  color: white;
  transition-duration: 0.8s;
}

#close:hover {
  background-color: $white;
  color: black;
}
</style>

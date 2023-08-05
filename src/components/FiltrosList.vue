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

    <div class="total">
      <span>Total: </span>
      <span>12391</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
  margin-block-start: em(1);
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

input:focus {
  background-color: $__red;
  transform: scale(1.05);
}

.total {
  margin-top: em(2);
}
</style>

<template>
  <div id="container">
    <div id="form">
      <VotanteForm />
    </div>
    <div id="logo"></div>
  </div>
</template>

<script setup lang="ts">
import VotanteForm from "../components/VotanteForm.vue";
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  display: flex;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-inline: em(20);
}

#form::before {
  position: absolute;
  content: "";
  width: em(110);
  height: em(110);
  background-color: $_blue;
  transform: rotate(45deg);
  left: em(-45);
  bottom: em(-5);
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.082);
  opacity: 0;
  animation: fadeIn $fadeIn-duration forwards;
}

#form {
  margin-left: em(2);
  z-index: 3;
  opacity: 0;
  animation: fadeIn $fadeIn-duration forwards;
}

#logo {
  width: em(30);
  height: em(30);
  background-image: url(../resources/images/logo.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  animation: fadeIn $fadeIn-duration forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>

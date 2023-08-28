<template>
  <div id="container">
    <NavBar @showForm="toggleForm" />
    <transition name="slide-in">
      <div id="form" v-if="showForm">
        <RegisterForm />
      </div>
    </transition>
    <!-- <transition name="slide">
      <div id="SideBar">
        <FiltrosList />
      </div>
    </transition> -->
    <div id="votantes">
      <VotantesAll />
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
import NavBar from "../components/NavBar.vue";
import VotantesAll from "../components/VotantesAll.vue";
import { ref } from "vue";

const showForm = ref(false);

//Functions

const toggleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<style scoped lang="scss">

#form {
  justify-content: center;
  display: flex;
  margin: auto;
  width: 100%;
  position: absolute;
  z-index: 2;
}

#nav-Bar {
  width: 100%;
  height: em(15);
  background-color: white;
}


//* Animaciones
@keyframes slide {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.slide-enter-active {
  animation: slide 0.8s;
}

.slide-leave-active {
  animation: slide 0.5s reverse;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.slide-in-enter-active {
  animation: slideIn 0.8s;
}

.slide-in-leave-active {
  animation: slideIn 0.5s reverse;
}

@keyframes aparecer {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.aparecer-enter-active {
  animation: aparecer 2.5s;
}

.aparecer-leave-active {
  animation: aparecer 0s;
}
</style>

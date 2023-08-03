<template>
  <div id="container">
    <NavBar @showForm="toggleForm" />
    <transition name="slide-in">
      <div id="form" v-if="showForm">
        <RegisterForm />
      </div>
    </transition>
    <transition name="aparecer">
      <button @click="toggleSidebar" id="sidebar-button" v-if="showMenuBtn">
        Menú
      </button>
    </transition>
    <transition name="slide">
      <div id="SideBar" v-if="showSidebar">
        <FiltrosList @showMenuBtn="toggleSidebar" />
      </div>
    </transition>
    <div id="votantes">
      <VotantesAll />
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
import NavBar from "../components/NavBar.vue";
import FiltrosList from "../components/FiltrosList.vue";
import VotantesAll from "../components/VotantesAll.vue";
import { ref } from "vue";

const showForm = ref(false);
const showSidebar = ref(false);
const showMenuBtn = ref(true);

const toggleForm = () => {
  showForm.value = !showForm.value;
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
  showMenuBtn.value = !showMenuBtn.value;
};
</script>

<style scoped lang="scss">
#container {
  height: 100vh;
  width: 100%;
  background-color: $_blue;
}

#votantes {
  display: flex;
  margin-inline-start: 25%;
}

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
  background-color: $white;
}

#sidebar-button {
  position: fixed;
  top: 20%;
  left: 20px;
  padding: 8px 16px;
  background-color: $red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.8s;
  transition: color 0.8s;
}

#sidebar-button:hover {
  color: black;
  background-color: $white;
}

#SideBar {
  width: 25%;
  display: flex;
  height: 100%;
  background-color: $gray;
  position: fixed;
  z-index: 5;
}

#SideBar.active {
  left: 10;
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

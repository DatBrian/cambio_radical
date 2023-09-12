<template>
    <div id="container">
      <NavBar @showForm="toggleForm" @showBarrio="toggleBarrio" @showPuesto="togglePuesto" />
      <div class="background-layer" @click="closeModals" :class="{ 'visible': backgroundVisible }"></div>      <transition name="slide-in">
        <div id="form" v-if="showForm">
          <RegisterForm />
        </div>
      </transition>
      <transition name="slide">
        <div id="form" v-if="showBarrios">
          <BarrioForm />
        </div>
      </transition>
      <transition name="slide">
        <div id="form" v-if="showPuestos">
          <PuestoForm />
        </div>
      </transition>
      <div id="votantes">
        <VotantesAll />
      </div>
    </div>
  </template>


<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
import BarrioForm from "@/components/BarrioForm.vue";
import PuestoForm from "@/components/PuestoForm.vue";
import NavBar from "../components/NavBar.vue";
import VotantesAll from "../components/VotantesAll.vue";
import { ref } from "vue";

const showForm = ref(false);
const showBarrios = ref(false);
const showPuestos = ref(false);
const backgroundVisible = ref(false);

//Functions

const toggleForm = () => {
    showForm.value = !showForm.value;
    backgroundVisible.value = showForm.value;
};

const toggleBarrio = () => {
    showBarrios.value = !showBarrios.value;
    backgroundVisible.value = showBarrios.value;
}

const togglePuesto = () => {
    showPuestos.value = !showPuestos.value;
    backgroundVisible.value = showPuestos.value;
}

const closeModals = () => {
  showForm.value = false;
  showBarrios.value = false;
  showPuestos.value = false;
  backgroundVisible.value = false;
};

</script>

<style scoped lang="scss">

.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200vh;
  background-color: rgba(0, 0, 0, 0.5); /* Ajusta la opacidad aquí */
  opacity: 0; /* Inicialmente invisible */
  z-index: 15; /* Detrás de los modales */
  pointer-events: none; /* Evita que intercepte clics cuando está oculto */
  transition: opacity 0.3s ease; /* Agrega una transición de opacidad */
}

.background-layer.visible {
  opacity: 1;
  pointer-events: auto;
}

#form {
    justify-content: center;
    display: flex;
    margin: auto;
    width: 100%;
    position: absolute;
    z-index: 20;
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

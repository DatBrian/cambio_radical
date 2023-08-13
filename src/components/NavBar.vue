<template>
  <nav id="nav-Bar">
    <div id="logo"></div>
    <div id="buscador">
      <input
        type="text"
        autocomplete="off"
        name="text"
        class="input"
        placeholder="Nombre o Documento"
      />
    </div>
    <div id="buttons">
      <button class="Btn" id="register" @click="showForm">
        <div class="sign">+</div>
      </button>

      <button class="Btn" @click="logout">
        <div class="sign">
          <svg viewBox="0 0 512 512">
            <path
              d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import router from '@/router';


const emit = defineEmits(["showForm"]);

const showForm = () => {
  emit("showForm");
};

const logout = () =>{
  router.push('/login')
}
</script>

<style scoped lang="scss">
#nav-Bar {
  padding-inline: em(1);
  padding-inline-end: em(5);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

#logo {
  margin-left: em(1);
  width: 10%;
  height: 60%;
  background-image: url(../resources/images/logo.jpg);
  background-size: contain;
  background-repeat: no-repeat;
}

#buttons {
  display: flex;
  gap: em(2);
}

.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 1.5s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 77, 77);
  color: white;
  font-weight: bold;
  font-size: em(3);
}

.sign {
  width: 100%;
  transition-duration: 1s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
.Btn:hover {
  background-color: $_blue;
  transition-duration: 0.8s;
}

.Btn:hover .sign {
  transition-duration: 0.3s;
}
.Btn:hover .text {
  opacity: 1;
  transition-duration: 0.3s;
  font-size: em(1.2);
}

#buscador {
  width: 50%;
  margin: auto;
}
.input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 1em;
  background-color: $gray;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.15);
  transition: 300ms ease-in-out;
}

.input:focus {
  background-color: $__red;
  transform: scale(1.05);
}
</style>

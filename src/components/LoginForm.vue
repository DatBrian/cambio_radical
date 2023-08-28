<template>
  <form action="" class="form_main">
    <p class="heading">Login</p>
    <div class="inputContainer">
      <svg
        class="inputIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="22"
        fill="#2e2e2e"
        viewBox="0 0 16 16"
      >
        <path
          d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"
        ></path>
      </svg>
      <input
        type="text"
        class="inputField"
        id="username"
        placeholder="Username"
        v-model="username"
      />
    </div>

    <div class="inputContainer">
      <svg
        class="inputIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="22"
        fill="#2e2e2e"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
        ></path>
      </svg>
      <input
        type="password"
        class="inputField"
        id="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <button type="submit" id="button" @click.prevent="loginUser">Submit</button>
    <p>{{ feedback.value }}</p>
  </form>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import useAuth from "@/store/Auth";
import router from "@/router";

const store = useAuth();
const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const feedback = ref("");

const loginUser = async () => {
  const response: any = await store.login(username.value, password.value);
  if (response === false) {
    feedback.value = "Error Iniciando sesión";
  } else {
    if (store.role === "admin") {
      router.push({ name: "list" });
    } else if (store.role === "usuario") {
      router.push({ name: "votante" });
    }
  }
};
</script>

<style scoped lang="scss">
.form_main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: em(3), em(3), em(3), em(3);
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.062);
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn $fadeIn-duration forwards;
}

.form_main::before {
  position: absolute;
  content: "";
  width: em(110);
  height: em(110);
  background-color: $_blue;
  transform: rotate(45deg);
  left: em(-45);
  bottom: em(-5);
  z-index: 1;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.082);
  opacity: 0;
  animation: fadeIn $fadeIn-duration forwards;
}

.heading {
  font-size: em(5);
  color: black;
  font-weight: 900;
  margin: 5px 0 50px 0;
  z-index: 2;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.inputContainer {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.inputIcon {
  position: absolute;
  margin-left: -50%;
}

.inputField {
  width: 50%;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgb(173, 173, 173);
  margin: 10px 0;
  color: black;
  font-size: em(2);
  font-weight: 500;
  box-sizing: border-box;
  padding-left: 30px;
}

.inputField:focus {
  outline: none;
  border-bottom: 2px solid rgb(0, 0, 0);
}

.inputField::placeholder {
  color: rgb(80, 80, 80);
  font-size: 1em;
  font-weight: 500;
}

#button {
  z-index: 2;
  position: relative;
  width: 20%;
  border: none;
  background-color: $red;
  height: em(3);
  color: white;
  font-size: 0.8em;
  font-weight: 500;
  letter-spacing: 1px;
  margin: em(3);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.8s;
}

#button:hover {
  background-color: black;
}

.forgotLink {
  z-index: 2;
  font-size: 0.7em;
  font-weight: 500;
  color: rgb(44, 24, 128);
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
@/store/AuthStore

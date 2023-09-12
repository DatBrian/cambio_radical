<template>
    <form class="form">
      <p class="title">Nuevo Barrio</p>
      <p class="message">Añada un nuevo barrio.</p>
      <div class="flex">
        <label>
          <input
            v-model="barrio.name"
            required
            placeholder=""
            type="text"
            class="input"
          />
          <span>Nombre</span>
        </label>
      </div>
      <label>
        <select class="input" required v-model="barrio.comuna">
            <option disabled>Seleccione una comuna</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select>
        <span>Comuna</span>
      </label>
      <button class="submit" type="submit" @click.prevent="saveBarrio">
        Submit
      </button>
      <p>{{ feeedback }}</p>
    </form>
  </template>
  
  <script setup lang="ts">
  import useAuth from "@/store/Auth";
import Swal from "sweetalert2";
  import { ref } from "vue";
  
  const store = useAuth();
  const feeedback = ref("");
    const barrio = ref({
        name: "",
        comuna: "",
    });

  const saveBarrio = async () => {
    try {
        feeedback.value = "Comprobando...";

        const newBarrio = {
            name: barrio.value.name,
        };

        const barrioExist = await store.verifyBarrio(newBarrio);

        if (barrioExist) {
            Swal.fire({
                icon: "error",
                title: `El barrio ${newBarrio.name} ya existe`,
            });
            feeedback.value = `${newBarrio.name} ya existe`;
        } else {
            const response = await store.saveBarrio(barrio.value);

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Barrio guardado exitosamente!",
                });

                barrio.value = {
                    name: "",
                    comuna: "",
                };

                feeedback.value = "Barrio insertado Correctamente"
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al guardar el barrio.",
                });
                feeedback.value = "Error en el registro";
            }
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Error al enviar la petición.",
            text: error.message,
        });
        feeedback.value = "Error en el registro";
    }
};
  </script>
  
  <style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }
  
  .title {
    font-size: 28px;
    color: $blue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-family: $font-title;
  }
  
  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: $blue;
  }
  
  .title::before {
    width: 18px;
    height: 18px;
    background-color: $blue;
  }
  
  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }
  
  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }
  
  .signin {
    text-align: center;
  }
  
  .signin a {
    color: $blue;
  }
  
  .signin a:hover {
    text-decoration: underline $blue;
  }
  
  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }
  
  .form label {
    position: relative;
  }
  
  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }
  
  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }
  
  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }
  
  .form label .input:focus + span,
  .form label .input:valid + span {
    top: 30px;
    font-size: 1em;
    font-weight: 600;
  }
  
  .form label .input:valid + span {
    color: $green;
  }
  
  .submit {
    border: none;
    outline: none;
    background-color: $blue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
    cursor: pointer;
    transition: 0.6s;
  }
  
  .submit:hover {
    background-color: $red;
  }
  
  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }
  
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
  </style>
  @/store/AuthStore
  
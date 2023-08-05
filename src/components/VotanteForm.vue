<template>
  <form class="form" @submit.prevent="saveVotante()">
    <p class="title">Agregar votante</p>
    <p class="message">Ingresa los datos del nuevo votante</p>
    <div class="flex">
      <label>
        <input
          required
          placeholder=""
          type="text"
          class="input"
          v-model="votante.name"
        />
        <span>Nombre</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="text"
          class="input"
          v-model="votante.lider"
        />
        <span>Lider</span>
      </label>
    </div>

    <label>
      <input
        required
        placeholder=""
        type="number"
        class="input"
        v-model="votante.doc"
      />
      <span>Documento</span>
    </label>

    <label>
      <input
        required
        placeholder="nacimiento"
        type="date"
        class="input"
        v-model="votante.nacimiento"
      />
    </label>
    <label>
      <input
        required
        placeholder=""
        type="number"
        class="input"
        v-model="votante.celular"
      />
      <span>Celular</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="number"
        class="input"
        v-model="votante.telefono"
      />
      <span>Teléfono</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.direccion"
      />
      <span>Dirección</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.barrio"
      />
      <span>Barrio</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="number"
        class="input"
        v-model="votante.comuna"
      />
      <span>Comuna</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="email"
        class="input"
        v-model="votante.email"
      />
      <span>Email</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.profesion"
      />
      <span>Profesión</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.ocupacion"
      />
      <span>Ocupación</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.RS"
      />
      <span>Redes sociales</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.PuestoVotacion"
      />
      <span>Puesto de votación</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="number"
        class="input"
        v-model="votante.MesaVotacion"
      />
      <span>Mesa de votación</span>
    </label>
    <label>
      <input
        required
        placeholder=""
        type="text"
        class="input"
        v-model="votante.compromiso"
      />
      <span>Compromiso</span>
    </label>
    <button class="submit">Submit</button>
    <a target="_blank" href="https://wsp.registraduria.gov.co/censo/consultar"
      >Click aqui para obtener la información de votación
    </a>
  </form>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { IVotante } from "server/interfaces/VotanteInterface";
import Swal from "sweetalert2";

const votante: Ref<IVotante> = ref({
  name: "",
  lider: "",
  doc: "",
  nacimiento: "",
  calular: "",
  telefono: "",
  direccion: "",
  barrio: "",
  comuna: "",
  email: "",
  profesion: "",
  ocupacion: "",
  RS: "",
  PuestoVotacion: "",
  MesaVotacion: "",
  compromiso: "",
});

const saveVotante = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/votante/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(votante.value),
      }
    );

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Votante guardado exitosamente!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al guardar el votante.",
      });
    }
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error al enviar la petición.",
      text: error.message,
    });
  }
};
</script>

<style scoped lang="scss">
@import "~sweetalert2/dist/sweetalert2.min.css";

* {
  font-family: $font-title;
}
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
  border: 1px solid black;
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
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: $green;
}

.submit {
  border: none;
  outline: none;
  background-color: $red;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
}

.submit:hover {
  background-color: $blue;
  color: black;
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

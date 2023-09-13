<template>
  <form class="form" @submit.prevent="updateVotante()">
    <div id="header">
      <div id="text">
        <p class="title">Editar votante</p>
        <p class="message">Modifique los datos del votante</p>
      </div>
      <div id="close">
        <button id="closeButton" @click.prevent="closeEdit">X</button>
      </div>
    </div>
    <div class="flex">
      <label>
        <input
          placeholder=""
          type="text"
          class="input"
          v-model="editedVotante.name"
        />
        <span>Nombre</span>
      </label>

      <label>
        <input
          placeholder=""
          type="text"
          class="input"
          v-model="editedVotante.lider"
        />
        <span>Lider</span>
      </label>
    </div>

    <label>
      <input
        placeholder=""
        type="number"
        class="input"
        v-model="editedVotante.doc"
      />
      <span>Documento</span>
    </label>

    <label>
      <select class="input" v-model="editedVotante.genero">
        <option value="">Selecciona un género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
    </label>

    <label>
      <input
        placeholder="nacimiento"
        type="date"
        class="input"
        v-model="editedVotante.nacimiento"
      />
    </label>
    <label>
      <input
        placeholder=""
        type="number"
        class="input"
        v-model="editedVotante.celular"
      />
      <span>Celular</span>
    </label>
    <label>
      <input
        placeholder=""
        type="number"
        class="input"
        v-model="editedVotante.telefono"
      />
      <span>Teléfono</span>
    </label>
    <label>
      <input
        placeholder=""
        type="text"
        class="input"
        v-model="editedVotante.direccion"
      />
      <span>Dirección</span>
    </label>
    <label>
      <select
        class="input"
        v-model="editedVotante.comuna"
        @change="handleComunaChange"
      >
        <option disabled value="">Selecciona una comuna</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </label>
    <label>
      <select class="input" v-model="editedVotante.barrio">
        <option disabled value="">Selecciona un barrio</option>
        <option v-for="barrio in barriosComuna" :key="barrio">
          {{ barrio.name }}
        </option>
      </select>
    </label>
    <label>
      <input
        placeholder=""
        type="email"
        class="input"
        v-model="editedVotante.email"
      />
      <span>Email</span>
    </label>
    <label>
      <input
        placeholder=""
        type="text"
        class="input"
        v-model="editedVotante.profesion"
      />
      <span>Profesión</span>
    </label>
    <label>
      <input
        placeholder=""
        type="text"
        class="input"
        v-model="editedVotante.ocupacion"
      />
      <span>Ocupación</span>
    </label>
    <fieldset class="redes-container">
      <legend>Redes Sociales</legend>
      <button
        @click="addRedSocial"
        class="add-button"
        style="margin-bottom: 1em"
      >
        <span class="button-text">Agregar Red Social</span>
        <i class="fas fa-plus-circle"></i>
      </button>
      <label v-for="(red, index) in redesSociales" :key="index">
        <input
          placeholder="Red Social"
          type="text"
          class="input rs"
          v-model="red.red"
        />
        <input
          placeholder="Username"
          type="text"
          class="input rs"
          v-model="red.usuario"
        />
        <button
          v-if="index > 0"
          @click="removeRedSocial(index)"
          class="remove-button"
        >
          <span class="button-text">Eliminar</span>
          <i class="fas fa-trash-alt"></i>
        </button>
      </label>
    </fieldset>

    <label>
      <select class="input" v-model="editedVotante.PuestoVotacion">
        <option disabled value="">Selecciona un puesto de votación</option>
        <option v-for="puesto in puestoVotacion" :key="puesto">
          {{ puesto.name }}
        </option>
      </select>
    </label>
    <label>
      <input
        placeholder=""
        type="number"
        class="input"
        v-model="editedVotante.MesaVotacion"
      />
      <span>Mesa de votación</span>
    </label>
    <label>
      <input
        placeholder=""
        type="text"
        class="input"
        v-model="editedVotante.compromiso"
      />
      <span>Compromiso</span>
    </label>
    <label>
      <select name="fidelidad" class="input" v-model="editedVotante.fidelidad">
        <option value="fidelizado">Fidelizado</option>
        <option value="sin fidelizar">Sin Fidelizar</option>
        <option value="en espera">En Espera</option>
      </select>
      <span>Fidelidad</span>
    </label>
    <label>
      <input
        placeholder=""
        type="text"
        class="input"
        v-model="editedVotante.observaciones"
      />
      <span>Observaciones</span>
    </label>
    <button type="submit" class="submit">Submit</button>
    <a target="_blank" href="https://wsp.registraduria.gov.co/censo/consultar"
      >Click aqui para obtener la información de votación
    </a>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, defineEmits } from "vue";
import useAuth from "@/store/Auth";

const store = useAuth();
const props = defineProps({
  votante: Object,
});
const emit = defineEmits(["close", "updated"]);

const puestoVotacion = ref([]);
const editedVotante: any = ref({});
const redesSociales = ref([{ red: "", usuario: "" }]);
const barriosComuna = ref([]);

onMounted(async () => {
  puestoVotacion.value = await store.getPuestos();
  editedVotante.value = { ...props.votante };
  await handleComunaChange();
});

//Functions

const updateVotante = async () => {
  await store.updateVotante(editedVotante.value);
  emit("close");
  emit("updated");
};

const addRedSocial = () => {
  redesSociales.value.push({ red: "", usuario: "" });
};

const removeRedSocial = (index) => {
  redesSociales.value.splice(index, 1);
};

const handleComunaChange = async () => {
  const barrios = await store.getBarrios();
  const comuna = editedVotante.value.comuna;
  barriosComuna.value = await barrios.filter(
    (barrio) => barrio.comuna == comuna
  );
};

const closeEdit = () => {
  emit("close");
};
</script>

<style scoped lang="scss">
@import "~sweetalert2/dist/sweetalert2.min.css";

* {
  font-family: $font-title;
}

#header {
  display: flex;
}

#close {
  margin-inline-start: em(8);
}

#closeButton {
  font-weight: bold;
  border: none;
  padding: em(1);
  background-color: $red;
  cursor: pointer;
  border-radius: 5px;
  transition-duration: 0.8s;
}

#closeButton:hover {
  background-color: black;
  color: white;
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
  background-color: black;
  color: white;
}

select {
  margin-bottom: em(1);
}

.redes-container {
  margin-top: 0px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.red-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.red-input-group {
  display: flex;
  gap: 10px;
  flex-grow: 1;
}

.remove-button {
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: $red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.add-button {
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: $blue;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: $__red;
}
.add-button:hover {
  background-color: #2980b9;
}

.button-text {
  font-size: 14px;
}

.fa-trash-alt,
.fa-plus-circle {
  font-size: 18px;
}

.rs {
  margin-bottom: em(1);
}

//* Animaciones

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

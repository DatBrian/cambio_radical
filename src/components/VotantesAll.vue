<template>
  <div id="main">
    <div id="sidebar">
      <div id="container2">
        <div id="total">
          <span id="totalT">Total: </span>
          <span id="count">{{ count }} Votantes</span>
        </div>

        <div class="filter">
          <label for="leader">Líder</label>
          <input id="leader" v-model="filters.lider" />
        </div>

        <div class="filter">
          <label for="gender">Género</label>
          <select id="gender" v-model="filters.genero">
            <option value="">Todos</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div class="filter">
          <label for="votingPlace">Puesto de Votación</label>
          <select id="votingPlace" v-model="filters.puestoVotacion">
            <option disabled value="">Selecciona un puesto de votación</option>
            <option v-for="puesto in puestoVotacion" :key="puesto">
              {{ puesto.name }}
            </option>
          </select>
        </div>

        <div class="filter">
          <label for="district">Comuna</label>
          <select
            id="district"
            v-model="filters.comuna"
            @change="handleComunaChange"
          >
            <option value="">Todas</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>

        <div class="filter">
          <label for="neighborhood">Barrio</label>
          <select id="neighborhood" v-model="filters.barrio">
            <option disabled value="">Selecciona un barrio</option>
            <option v-for="barrio in barriosComuna" :key="barrio">
              {{ barrio.name }}
            </option>
          </select>
        </div>

        <div class="filter">
          <label for="ages">Edades</label>
          <input id="young" type="checkbox" v-model="filters.jovenes" />
          <label for="young">18-28</label>
          <input id="senior" type="checkbox" v-model="filters.terceraEdad" />
          <label for="senior">Tercera Edad</label>
        </div>

        <div id="buttons">
          <button class="apply-button" @click="applyFilters">Apply</button>
          <button
            @click="getAllVotantes"
            class="apply-button"
            style="width: 30%; background-color: rgba(251, 88, 88, 0.686)"
          >
            Ver Todos
          </button>
        </div>
      </div>
    </div>
    <div id="votantes">
      <div id="container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Líder</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Celular</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Dirección</th>
              <th>Comuna</th>
              <th>Barrio</th>
              <th>Email</th>
              <th>Profesión</th>
              <th>Ocupación</th>
              <th>Puesto de Votación</th>
              <th>Mesas de Votación</th>
              <th>Compromiso</th>
              <th>Fidelidad</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="votante in votantes"
              :key="votante.id"
              @click="showDetails(votante)"
            >
              <td>{{ votante.name }}</td>
              <td>{{ votante.lider }}</td>
              <td>{{ votante.doc }}</td>
              <td>{{ votante.telefono }}</td>
              <td>{{ votante.Celular }}</td>
              <td>{{ votante.genero }}</td>
              <td>{{ calcularEdad(votante.nacimiento) }}</td>
              <td>{{ votante.direccion }}</td>
              <td>{{ votante.comuna }}</td>
              <td>{{ votante.barrio }}</td>
              <td>{{ votante.email }}</td>
              <td>{{ votante.profesion }}</td>
              <td>{{ votante.ocupacion }}</td>
              <td>{{ votante.PuestoVotacion }}</td>
              <td>{{ votante.MesaVotacion }}</td>
              <td>{{ votante.compromiso }}</td>
              <td>{{ votante.fidelidad }}</td>
            </tr>
          </tbody>
        </table>
        <transition name="modal">
          <div id="modal-container" v-if="showDetailsFlag">
            <div class="modal-content">
              <VotanteDetails
                :votante="selectedVotante"
                @close="hideDetails"
                @edit="showEditForm"
              />
            </div>
          </div>
        </transition>
        <transition name="modal">
          <div id="modal-container" v-if="showEditFlag">
            <div class="modal-content edit">
              <VotanteEdit
                :votante="selectedVotante"
                @close="hideEdit"
                @updated="getAllVotantes"
              />
            </div>
          </div>
        </transition>
        <div id="buttons">
          <button
            id="prevButton"
            class="button"
            @click="obtainVotantes(data.prevPage)"
          >
            Anterior
          </button>
          <button
            id="nextButton"
            class="button"
            @click="obtainVotantes(data.nextPage)"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VotanteDetails from "./VotanteDetails.vue";
import VotanteEdit from "./VotanteEdit.vue";
import { Ref, ref, reactive, onMounted } from "vue";
import useAuth from "@/store/Auth";

const store = useAuth();
let count: any = ref();

const data: any = ref({
  docs: [],
  prevPage: null,
  nextPage: null,
  page: null,
  totalPages: null,
});

const currentPage = ref(1);
const filters = reactive({
  lider: "",
  barrio: "",
  genero: "",
  puestoVotacion: "",
  comuna: "",
  jovenes: false,
  terceraEdad: false,
});

const votantes: Ref<any[]> = ref([]);
const selectedVotante: Ref<any | null> = ref(null);
const barriosComuna = ref([]);
const puestoVotacion = ref([]);
const showEditFlag: Ref<boolean> = ref(false);
const showDetailsFlag: Ref<boolean> = ref(false);

onMounted(async () => {
  const votantesList = await store.getVotantes(currentPage.value);
  data.value = votantesList;
  votantes.value = data.value.docs;
  puestoVotacion.value = await store.getPuestos();
  await store.getCount();
  count.value = store.total;
});

//functions

const showDetails = (votante: any) => {
  selectedVotante.value = votante;
  showDetailsFlag.value = true;
};

const hideDetails = () => {
  selectedVotante.value = null;
  showDetailsFlag.value = false;
};

const hideEdit = () => {
  showEditFlag.value = false;
};

const showEditForm = async (votante) => {
  selectedVotante.value = votante;
  showEditFlag.value = true;
};

const getAllVotantes = async () => {
  data.value = await store.getVotantes(currentPage.value);
  votantes.value = await data.value.docs;
  currentPage.value = await data.value.page;
};

const obtainVotantes = async (page: any) => {
  data.value = await store.getVotantes(page);
  votantes.value = await data.value.docs;
  currentPage.value = await data.value.page;
};

const handleComunaChange = async () => {
  const barrios = await store.getBarrios();
  const comuna = filters.comuna;
  barriosComuna.value = await barrios.filter(
    (barrio) => barrio.comuna == comuna
  );
};

const calcularEdad = (fecha: string) => {
  const timestamp = new Date(fecha).getTime();
  const now = Date.now();

  const age = now - timestamp;
  const ageDate = new Date(age);

  const result = Math.abs(ageDate.getUTCFullYear() - 1970);
  return result;
};

const applyFilters = async () => {
  const query: any = {};
  if (filters.lider) query.lider = filters.lider;
  if (filters.barrio) query.barrio = filters.barrio;
  if (filters.genero) query.genero = filters.genero;
  if (filters.puestoVotacion) query.puestoVotacion = filters.puestoVotacion;
  if (filters.comuna) query.comuna = filters.comuna;

  const votantesF = await store.getVotantesF(query);
  if (filters.jovenes || filters.terceraEdad) {
    const votantesFiltrados: any[] = [];
    for (const votante of votantesF) {
      const edad = calcularEdad(votante.nacimiento);
      if (
        (filters.jovenes && edad >= 18 && edad <= 28) ||
        (filters.terceraEdad && edad >= 60)
      ) {
        votantesFiltrados.push(votante);
      }
    }
    votantes.value = votantesFiltrados;
  } else {
    votantes.value = votantesF;
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: $font-title;
  font-size: em(2);
  font-weight: 600;
}

#main {
  height: 100vh;
  width: 100%;
  background-color: $_blue;
}

#votantes {
  display: flex;
  height: 100vh;
  max-height: 100vh;
  margin-inline-start: 25%;
  overflow: scroll;
}

#container {
  width: 100%;
}

#sidebar {
  width: 25%;
  display: flex;
  height: 100%;
  background-color: $gray;
  position: absolute;
  z-index: 5;
}

#modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  overflow-y: scroll;
  animation: aparecer 0.5s forwards;
}

.modal-content {
  background-color: $red;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 80%;
}

.edit {
  background-color: $blue !important;
  margin-top: 50%;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.8s ease;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

@keyframes aparecer {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  thead th {
    background-color: $red;
    border: 1px solid #ddd;
    padding: 10px;
    color: white;
    font-size: em(1.5);
  }
  tbody td {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
    font-size: em(1) !important;
  }
  tbody tr {
    border: 1px solid black;
    background-color: $white;
  }
}

table tbody tr {
  transition-duration: 0.6s;
}

table tbody tr:hover {
  background-color: rgb(255, 77, 77);
}

#buttons {
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: center;
  margin-block-start: em(1);
}

.button {
  padding: em(1);
  margin-inline: em(2);
  cursor: pointer;
  transition-duration: 1s;
  font-size: em(1);
}

.button:hover {
  background-color: black !important;
  color: white;
}

#prevButton {
  background-color: $red;
}

#nextButton {
  background-color: $_blue;
}

#buttons {
  display: flex;
}

#container2 {
  padding: 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

#total {
  margin-bottom: 20px;
  font-size: 18px;
}

#totalT {
  font-weight: bold;
}
#count {
  padding: em(1);
  border-radius: 5px;
  background-color: $gray;
}

.filter {
  display: flex;
  align-items: center;
  margin-bottom: em(2);
  flex-wrap: wrap;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

select,
input[type="checkbox"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 10px;
  margin-right: 10px;
}

.apply-button {
  margin-inline: auto;
  width: 20%;
  padding: em(1);
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.apply-button:hover {
  background-color: #0056b3;
}
</style>

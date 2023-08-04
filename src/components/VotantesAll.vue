<template>
  <div id="container">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Líder</th>
          <th>Documento</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Puesto de Votación</th>
          <th>Mesas de Votación</th>
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
          <td>{{ votante.direccion }}</td>
          <td>{{ votante.PuestoVotacion }}</td>
          <td>{{ votante.MesaVotacion }}</td>
        </tr>
      </tbody>
    </table>
    <transition name="modal">
      <div id="modal-container" v-if="showDetailsFlag">
        <div class="modal-content">
          <VotanteDetails :votante="selectedVotante" @close="hideDetails" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import VotanteDetails from "./VotanteDetails.vue";
import { Ref, ref, onMounted } from "vue";
import { IVotante } from "server/interfaces/VotanteInterface";

const votantes: Ref<IVotante[]> = ref([]);
const selectedVotante: Ref<IVotante | null> = ref(null);
const showDetailsFlag: Ref<boolean> = ref(false);

onMounted(async () => {
  const response = await fetch(`http://localhost:5000/api/v1/votante/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  votantes.value = await response.json();
});

const showDetails = (votante: IVotante) => {
  selectedVotante.value = votante;
  showDetailsFlag.value = true;
};

const hideDetails = () => {
  selectedVotante.value = null;
  showDetailsFlag.value = false;
};
</script>

<style scoped lang="scss">
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
  animation: aparecer 0.5s forwards;
}

.modal-content {
  background-color: $red;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 80%;
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
    background-color: rgb(255, 77, 77);
    border: 1px solid #ddd;
    padding: 10px;
  }
  tbody td {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
  }
  tbody tr {
    border: 1px solid black;
    background-color: #f9f9f9;
  }
}

table tbody tr {
  transition-duration: 0.6s;
}

table tbody tr:hover {
  background-color: $gray;
}
</style>

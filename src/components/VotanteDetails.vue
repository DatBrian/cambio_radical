<template>
    <div id="container">
        <div id="title">
            <h2>Detalles del votante</h2>
        </div>
        <div id="details">
            <h3>Nombre: {{ props.votante.name }}</h3>
            <h3>Líder: {{ props.votante.lider }}</h3>
            <h3>Documento: {{ props.votante.doc }}</h3>
            <h3>Fecha de nacimiento: {{ props.votante.nacimiento }}</h3>
            <h3>Teléfono: {{ props.votante.telefono }}</h3>
            <h3>Dirección: {{ props.votante.direccion }}</h3>
            <h3>Barrio: {{ props.votante.barrio }}</h3>
            <h3>Comuna: {{ props.votante.comuna }}</h3>
            <h3>Correo: {{ props.votante.email }}</h3>
            <h3>Redes Sociales: {{ props.votante.RS[0] }}</h3>
            <h3>Puesto de votación: {{ props.votante.PuestoVotacion }}</h3>
            <h3>Mesa de votación: {{ props.votante.MesaVotacion }}</h3>
            <h3>Compromiso: {{ props.votante.compromiso }}</h3>
            <h3>Observaciones: {{ props.votante.observaciones }}}</h3>
        </div>
        <div id="buttons">
            <button @click="closeDetails">Cerrar</button>
            <button @click="deleteUser(props.votante)">Eliminar</button>
            <button @click="editUser(props.votante)">Actualizar</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { defineProps, defineEmits } from "vue";
import useAuth from "@/store/Auth";

console.log(props.votante.RS.value);
const store = useAuth();
const props = defineProps({ votante: Object });
const emit = defineEmits(["close", "edit"]);

const closeDetails = () => {
    emit("close");
};

const deleteUser = async (votante) => {
    const votanteID = {
        id: votante.id,
    };

    emit("close");

    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el votante. ¿Estás seguro de continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        store.deleteVotante(votanteID);
    }
};

const editUser = async (votante: any) => {
    emit("edit", votante);
};
</script>

<style scoped lang="scss">
* {
    font-family: $font-title;
}

#container {
    padding: em(5);
    background-color: $white;
    height: max-content;
}

#title {
    margin: em(3);
}

#title h2 {
    font-family: $font-title;
}

#buttons {
    display: flex;
    margin: em(4) auto;
    width: fit-content;
}

button {
    margin-inline: em(1);
    padding-inline: em(3.5);
    padding-block: em(0.7);
    border: none;
    border-radius: 5px;
    background-color: $blue;
    cursor: pointer;
    color: white;
    transition-duration: 0.8s;
    font-weight: 700;
}

button:hover {
    background-color: black;
    color: white;
}
</style>

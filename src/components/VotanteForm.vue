<template>
    <form class="form" @submit.prevent="saveVotante()">
        <p class="title">Agregar votante</p>
        <p class="message">Ingresa los datos del nuevo votante</p>
        <div class="flex">
            <label>
                <input
                    placeholder=""
                    type="text"
                    class="input"
                    v-model="votante.name"
                />
                <span>Nombre</span>
            </label>

            <label>
                <input
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
                placeholder=""
                type="number"
                class="input"
                v-model="votante.doc"
            />
            <span>Documento</span>
        </label>

        <label>
            <select class="input" v-model="votante.genero">
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
                v-model="votante.nacimiento"
            />
        </label>
        <label>
            <input
                placeholder=""
                type="number"
                class="input"
                v-model="votante.celular"
            />
            <span>Celular</span>
        </label>
        <label>
            <input
                placeholder=""
                type="number"
                class="input"
                v-model="votante.telefono"
            />
            <span>Teléfono</span>
        </label>
        <label>
            <input
                placeholder=""
                type="text"
                class="input"
                v-model="votante.direccion"
            />
            <span>Dirección</span>
        </label>
        <label>
            <select
                class="input"
                v-model="votante.comuna"
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
            <select class="input" v-model="votante.barrio">
                <option disabled value="">Selecciona un barrio</option>
                <option v-for="barrio in barriosComuna" :key="barrio">
                    {{ barrio.name }}
                </option>
            </select>
            <button @click="handleBarrio" type="button" class="add-button">
                Agregar Barrio
            </button>
            <div class="crearBarrio" v-if="addBarrio">
                <label for="">
                    <input
                        class="input"
                        v-model="barrio.name"
                        type="text"
                        placeholder="Nombre"
                    />
                </label>
                <label>
                    <select class="input" v-model="barrio.comuna">
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
                <button type="button" class="add-button" @click="saveBarrio">
                    Crear
                </button>
            </div>
        </label>
        <label>
            <input
                placeholder=""
                type="email"
                class="input"
                v-model="votante.email"
            />
            <span>Email</span>
        </label>
        <label>
            <input
                placeholder=""
                type="text"
                class="input"
                v-model="votante.profesion"
            />
            <span>Profesión</span>
        </label>
        <label>
            <input
                placeholder=""
                type="text"
                class="input"
                v-model="votante.ocupacion"
            />
            <span>Ocupación</span>
        </label>
        <fieldset class="redes-container">
            <legend>Redes Sociales</legend>
            <button
                type="button"
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
                    type="button"
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
            <select class="input" v-model="votante.PuestoVotacion">
                <option disabled value="">
                    Selecciona un puesto de votación
                </option>
                <option v-for="puesto in puestoVotacion" :key="puesto">
                    {{ puesto.name }}
                </option>
            </select>
            <button @click="handlePuesto" type="button" class="add-button">
                Agregar Puesto
            </button>
            <div class="crearBarrio" v-if="addPuesto">
                <label for="">
                    <input
                        class="input"
                        v-model="puesto.name"
                        type="text"
                        placeholder="Nombre"
                    />
                </label>

                <label for="">
                    <input
                        class="input"
                        v-model="puesto.zona"
                        type="text"
                        placeholder="Zona"
                    />
                </label>

                <button type="button" class="add-button" @click="savePuesto">
                    Crear
                </button>
            </div>
        </label>
        <label>
            <input
                placeholder=""
                type="number"
                class="input"
                v-model="votante.MesaVotacion"
            />
            <span>Mesa de votación</span>
        </label>
        <label>
            <input
                placeholder=""
                type="text"
                class="input"
                v-model="votante.compromiso"
            />
            <span>Compromiso</span>
        </label>
        <label>
            <select name="fidelidad" class="input" v-model="votante.fidelidad">
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
                v-model="votante.observaciones"
            />
            <span>Observaciones</span>
        </label>
        <button class="submit">Submit</button>
        <a
            target="_blank"
            href="https://wsp.registraduria.gov.co/censo/consultar"
            >Click aqui para obtener la información de votación
        </a>
    </form>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import useAuth from "@/store/Auth";

const store = useAuth();
const puestoVotacion = ref([]);

onMounted(async () => {
    puestoVotacion.value = await store.getPuestos();
});

const addBarrio = ref(false);
const addPuesto = ref(false);

const handleBarrio = () => {
    addBarrio.value = !addBarrio.value;
};

const handlePuesto = () => {
    addPuesto.value = true;
};

const redesSociales = ref([{ red: "", usuario: "" }]);

const votante: Ref<any> = ref({
    name: "",
    lider: "",
    doc: "",
    genero: "",
    nacimiento: "",
    calular: "",
    telefono: "",
    direccion: "",
    barrio: "",
    comuna: "",
    email: "",
    profesion: "",
    ocupacion: "",
    RS: redesSociales.value,
    PuestoVotacion: "",
    MesaVotacion: "",
    compromiso: "",
    fidelidad: "",
    observaciones: "",
});

const barrio = ref({
    name: "",
    comuna: "",
});

const puesto = ref({
    name: "",
    zona: "",
});

const barriosComuna = ref([]);

//*Functions

const savePuesto = async () => {
    try {
        const newPuesto = {
            name: puesto.value.name,
        };

        const puestoExist = await store.verifyPuesto(newPuesto);

        if (puestoExist) {
            Swal.fire({
                icon: "error",
                title: `El puesto ${newPuesto.name} ya existe`,
            });
        } else {
            const response = await store.savePuesto(puesto.value);

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Puesto guardado exitosamente!",
                });

                puesto.value = {
                    name: "",
                    zona: "",
                };

                handlePuesto();
                puestoVotacion.value = await store.getPuestos(); 
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al guardar el puesto.",
                });
            }
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Error al enviar la petición.",
            text: error.message,
        });
    }
};

const saveBarrio = async () => {
    try {
        const newBarrio = {
            name: barrio.value.name,
        };

        const barrioExist = await store.verifyBarrio(newBarrio);

        if (barrioExist) {
            Swal.fire({
                icon: "error",
                title: `El barrio ${newBarrio.name} ya existe`,
            });
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

                handleBarrio();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al guardar el barrio.",
                });
            }
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Error al enviar la petición.",
            text: error.message,
        });
    }
};

const saveVotante = async () => {
    try {
        const doc = {
            doc: votante.value.doc,
        };
        const isVotanteExisting = await store.verifyDoc(doc);

        if (isVotanteExisting) {
            Swal.fire({
                icon: "error",
                title: `El votante con documento ${votante.value.doc} ya existe.`,
            });
        } else {
            const confirmationResult = await Swal.fire({
                icon: "info",
                title: "Confirmar Datos",
                html: `
          <p><strong>Nombre:</strong> ${votante.value.name}</p>
          <p><strong>Lider:</strong> ${votante.value.lider}</p>
          <p><strong>Documento:</strong> ${votante.value.doc}</p>
          <p><strong>Género:</strong> ${votante.value.genero}</p>
          <p><strong>Fecha de nacimiento:</strong> ${
              votante.value.nacimiento
          }</p>
          <p><strong>Celular:</strong> ${votante.value.celular}</p>
          <p><strong>Teléfono:</strong> ${votante.value.telefono}</p>
          <p><strong>Dirección:</strong> ${votante.value.direccion}</p>
          <p><strong>Comuna:</strong> ${votante.value.comuna}</p>
          <p><strong>Barrio:</strong> ${votante.value.barrio}</p>
          <p><strong>Email:</strong> ${votante.value.email}</p>
          <p><strong>Profesión:</strong> ${votante.value.profesion}</p>
          <p><strong>Ocupación:</strong> ${votante.value.ocupacion}</p>
          <p><strong>Redes Sociales:</strong> ${JSON.stringify(
              votante.value.RS
          )}</p>
          <p><strong>Puesto de votación:</strong> ${
              votante.value.PuestoVotacion
          }</p>
          <p><strong>Mesa de votación:</strong> ${
              votante.value.MesaVotacion
          }</p>
          <p><strong>Compromiso:</strong> ${votante.value.compromiso}</p>
          <p><strong>Fidelidad:</strong> ${votante.value.fidelidad}</p>
          <p><strong>Observaciones:</strong> ${votante.value.observaciones}}</p>
        `,
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
            });

            if (confirmationResult.isConfirmed) {
                const response = await store.saveVotante(votante.value);

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Votante guardado exitosamente!",
                    });

                    // Restablecer los valores del formulario
                    votante.value = {
                        name: "",
                        lider: "",
                        doc: "",
                        genero: "",
                        nacimiento: "",
                        celular: "",
                        telefono: "",
                        direccion: "",
                        barrio: "",
                        comuna: "",
                        email: "",
                        profesion: "",
                        ocupacion: "",
                        RS: [{ red: "", usuario: "" }],
                        PuestoVotacion: "",
                        MesaVotacion: "",
                        compromiso: "",
                        fidelidad: "",
                        observaciones: "",
                    };
                    redesSociales.value = [{ red: "", usuario: "" }];
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al guardar el votante.",
                    });
                }
            }
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Error al enviar la petición.",
            text: error.message,
        });
    }
};

const addRedSocial = () => {
    redesSociales.value.push({ red: "", usuario: "" });
};

const removeRedSocial = (index) => {
    redesSociales.value.splice(index, 1);
};

const handleComunaChange = async () => {
    const barrios = await store.getBarrios();
    const comuna = votante.value.comuna;
    barriosComuna.value = await barrios.filter(
        (barrio) => barrio.comuna == comuna
    );
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

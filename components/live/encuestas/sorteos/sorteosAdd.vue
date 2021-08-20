<template>
  <div class="cubreEncuesta1">
    <div class="columns">
      <div class="column is-4">
        <div class="cubreNumber">
          <h4 class="titleEncuesta">Sorteo</h4>
          <div class="cubreLogoNumber">
            <div class="logotipo-copy">
              <div class="logotipo-fill-copy">
                <div class="numberTipeEncuesta">{{ numero + 1 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="container" v-if="ganadores.length == 0">
          <div class="hoverOpciones" style="margin-bottom: 20px">
            <a @click="guardar()"
              ><i class="fa fa-floppy-o" aria-hidden="true"></i
            ></a>
            <a @click="moverArriba(numero)"
              ><i class="fa fa-arrow-up" aria-hidden="true"></i
            ></a>
            <a @click="moverAbajo(numero)"
              ><i class="fa fa-arrow-down" aria-hidden="true"></i
            ></a>
            <a @click="eliminar()"
              ><i class="fa fa-trash" aria-hidden="true"></i
            ></a>
          </div>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="titulo"
              placeholder="Título del sorteo"
              v-debounce:400ms="guardar"
            />
          </div>
          <h3 class="headingM has-text-left">Lista de participantes</h3>
          <textarea
            class="textarea"
            v-model="participantes"
            id="participantes"
            placeholder="Participantes linea por linea"
            rows="10"
            @blur="guardar"
          ></textarea>
          <h3 class="headingM has-text-left mt-3">Número de Premios</h3>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="premios"
              placeholder="Cantidad de Premios"
                @change="guardar"
            />
          </div>
          <div class="button-group">
           
            <button class="buttonN blue" @click="sortear">Sortear</button>
            <button class="buttonN" @click="borrarNombres">
              Borrar Participantes
            </button>

          </div>
        </div>

        <!-- solo lectura -->
        <div style="min-height: 300px" v-if="ganadores.length > 0">
          <div class="hoverOpciones" style="margin-bottom: 20px">
            <a @click="guardar()"
              ><i class="fa fa-floppy-o" aria-hidden="true"></i
            ></a>
            <a @click="moverArriba(numero)"
              ><i class="fa fa-arrow-up" aria-hidden="true"></i
            ></a>
            <a @click="moverAbajo(numero)"
              ><i class="fa fa-arrow-down" aria-hidden="true"></i
            ></a>
            <a @click="eliminar()"
              ><i class="fa fa-trash" aria-hidden="true"></i
            ></a>
          </div>
          <h1
            style="
              margin-bottom: 20px;
              border-bottom: solid 1px #8080801f;
              display: flex;
              justify-content: space-between;
            "
          >
            <span> {{ titulo }} </span>
            <span style="font-size: 20px">Premios: {{ premios }}</span>
          </h1>
          <p class="panel-heading" style="margin: 0">
            Participantes : {{ participantesV.length }}
          </p>
          <div class="scrollSorteo">
            <a
              class="panel-block"
              v-for="(item, index) in participantesV"
              :key="index"
              v-text="item.value"
            ></a>
          </div>

          <div v-if="ganadores.length > 0">
            <p
              class="panel-heading"
              style="margin: 0; margin-top: 20px; font-size: 18px"
            >
              Ganadores:
            </p>
            <a
              class="panel-block"
              v-for="(item, index) in ganadores"
              :key="index"
              v-text="item.value"
            ></a>
          </div>
          <div
            v-if="ganadores.length == 0"
            class="button-group"
            style="margin: 0; margin-top: 30px"
          >
            <button class="buttonN blue" @click="sortear">Sortear</button>
            <button class="buttonN blue" @click="openModalEdit">Editar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "numero",
    "idEcuesta",
    "tituloP",
    "integrantes",
    "ganadoresP",
    "premiosP",
    "nuevo",
  ],
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
      },
    ],
  },
  data() {
    return {
      participantes: [],
      premios: this.premiosP,
      titulo: this.tituloP,
      ganadores: this.ganadoresP,
      isLoading: true,
      id_encuesta: this.idEcuesta,
      participantesV: this.integrantes,
    };
  },
  methods: {
    openModalEdit() {
      this.$emit("openModalEdit", this.id_encuesta);
    },
    eliminar() {
      this.$emit("eliminarEncuesta", {
        id_encuesta: this.id_encuesta,
        index: this.numero,
      });
    },
    moverArriba(index) {
      this.$emit("moverArriba", {
        id_encuesta: this.id_encuesta,
        index: index,
      });
    },
    moverAbajo(index) {
      this.$emit("moverAbajo", { id_encuesta: this.id_encuesta, index: index });
    },
    guardar() {
      console.log("guardando");
      this.guardarOpciones();
    },
    async sortear() {
      if (this.titulo == "") {
      this.$swal({
      type: "error",
      title: "Oops...",
      text: "Debes agregar un título",
      });
      return false;
      }
      if (this.participantes == "") {
      this.$swal({
      type: "error",
      title: "Oops...",
      text: "Debes agregar participantes",
      });
      return false;
      } 

      var lines = [];
      $.each($("#participantes").val().split(/\n/), function (i, line) {
      if (line) {
      lines.push(line);
      } 
      });
      if (lines.length <= 1) {
      this.$swal({
      type: "error",
      title: "Oops...",
      text: "Debes agregar al menos 2 participantes",
      });
      return false;
      }

      if (this.premios > lines.length) {
      this.$swal({
      type: "error",
      title: "Oops...",
      text: "El numero de premios no puede ser mayor que los participantes",
      });
      return false;
      }




      const response = await this.$axios.$post("sortear_sorteo_live", {
        participantes: JSON.stringify(lines),
        premios: this.premios,
        codigo: this.$route.params.cod,
        id_encuesta: this.id_encuesta,
      });
      console.log(response);

      let timerInterval;
      this.$swal({
        title: "Espere Por Favor",
        heightAuto: false,
        html: "Estamos generando los ganadores...",
        timer: 2000,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
        onClose: () => {
          clearInterval(timerInterval);
        },
      })
        .then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.timer
          ) {
            if (response.status == 1) {
              this.ganadores = response.ganadores;
              this.participantesV = response.participantes
            }
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    borrarNombres() {
      $("#participantes").val("");
      this.guardar()
    },
    async guardarOpciones() {
      var lines = [];
      $.each($("#participantes").val().split(/\n/), function (i, line) {
        if (line) {
          lines.push(line);
        }
      });

      if (this.id_encuesta == 0) {
        console.log("es nueva");
        await this.$axios
          .$post("create_sorteo_live", {
            titulo: this.titulo,
            participantes: JSON.stringify(lines),
            premios: this.premios,
            codigo: this.$route.params.cod,
            activar: 0,
            id_encuesta: this.id_encuesta,
          })
          .then((response) => {
            console.log(response);
            if (response.status == 1) {
              console.log("guardado con exito");
              this.id_encuesta = response.id;
              if (response.participantes.length > 0) {
                console.log("es mayo q cero");

                var participantesText="";
                for (var i = 0; i < response.participantes.length; i++) {
                 participantesText = participantesText +  response.participantes[i].value + "\n";
                }
                this.participantes = participantesText;
                //         this.participantesV = response.participantes;
              }
            } else {
              this.isLoading = false;
              this.$swal({
                type: "error",
                title: "Oops...",
                text: "Error en los datos ingresados",
                heightAuto: false,
                confirmButtonText: `OK`,
              });
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      } else {
        console.log("es editable");
        await this.$axios
          .$post("edit_sorteo_live_modal", {
            titulo: this.titulo,
            participantes: JSON.stringify(lines),
            premios: this.premios,
            codigo: this.$route.params.cod,
            activar: 0,
            id_encuesta: this.id_encuesta,
          })
          .then((response) => {
            console.log("no hubo error", response);
            if (response.status == 1) {
              if (response.participantes.length > 0) {
                console.log("es mayo q cero");

                var participantesText="";
                for (var i = 0; i < response.participantes.length; i++) {
                      participantesText = participantesText +  response.participantes[i].value + "\n";
                }
                console.log("participantes text", participantesText)
                this.participantes = participantesText;
                //         this.participantesV = response.participantes;
              }
            } else {
              this.isLoading = false;
              this.$swal({
                type: "error",
                title: "Oops...",
                text: "Error en los datos ingresados",
                heightAuto: false,
                confirmButtonText: `OK`,
              });
            }
          });
      }
    },
  },
  mounted() {
    if (this.nuevo == 1) {
      this.guardar();
    }
     var participantesText="";
                for (var i = 0; i < this.integrantes.length; i++) {
                  console.log(this.integrantes[i].value)
                  participantesText = participantesText +  this.integrantes[i].value + "\n";
                }
                console.log("participantes text", participantesText)
                this.participantes = participantesText;
  },
};
</script>

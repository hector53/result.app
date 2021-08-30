<template>
  <section
    class="section-hero"
    style="margin-top: 60px; border-radius: 20px; padding: 20px"
  >
    <div id="modalAddPalabra" class="modal">
      <div class="modal-background" @click="closeModalAddPalabra"></div>
      <div class="modal-content">
        <div class="box" style="text-align: left">
          <div class="container">
            <div class="div-block-4">
              <input
                type="text"
                class="text-field title w-input"
                maxlength="256"
                ref="addPalabra"
                v-model="addPalabra"
                placeholder="Introduzca una palabra"
                @keyup.enter="enviarPalabra"
              />
            </div>
            <div class="button-group-live" style="margin-top: 50px">
              <button class="buttonN blue" @click="enviarPalabra">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalAddPalabra"
      ></button>
    </div>
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <h1 style="text-align: left">{{ titulo_encuesta }}</h1>
    <hr />
    <client-only>
      <div v-if="palabras.length==0"  class="palabrasVacias"  >
      <h2>Sin palabras aún</h2>
      </div>
      <vue-word-cloud v-else
        style="height: 300px; "
        :words="palabras"
        :color="wordsColor"
        font-family="Roboto"
      >
        <template slot-scope="{ text, weight }">
          <div
            :title="'(' + weight + ')'"
            style="cursor: pointer; display: flex; align-items: center"
          >
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>
    </client-only>
    <div class="container">
      <button
        class="buttonN blue"
        @click="openModalAddPalabra"
        v-if="statusEvent == 1"
      >
        Agregar Palabra
      </button>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: [
    "titulo_encuesta",
    "id_encuesta",
    "id_evento",
    "modoLive",
    "statusEvent",
  ],
  data() {
    return {
      addPalabra: "",
      isLoading: false,
      abierto: 0,
      palabras: [],
      modoenVivo: 0,
    };
  },
  components: { Loading },
  methods: {
    async enviarPalabra() {
      if (this.addPalabra == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes introducir una palabra",
        });
        return false;
      }
      //aqui si enviar a guardar la encuesta
      this.isLoading = true;
      await this.$axios
        .$post("add_palabra_live_front", {
          palabra: this.addPalabra,
          id_evento: this.id_evento,
          id_encuesta: this.id_encuesta,
          p: this.$store.state.p,
          codigo: this.$route.params.cod,
          liveMode: this.modoenVivo,
        })
        .then((response) => {
          if (response.status != 0) {
            this.isLoading = false;
            this.closeModalAddPalabra();
            console.log("moodolive", this.modoLive);
            if (this.modoLive != 1) {
              console.log("estoy en undefined");
              this.getRespuestaByIdEncuesta(this.id_encuesta);
            }
            //
            console.log("no estoy actualziando nada ");
          } else {
            this.isLoading = false;
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Error en los datos ingresados",
              confirmButtonText: `OK`,
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    openModalAddPalabra() {
      this.addPalabra = "";
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document.getElementById("modalAddPalabra").classList.add("is-active");
    },
    closeModalAddPalabra() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document.getElementById("modalAddPalabra").classList.remove("is-active");
    },
    wordsColor: function (word) {
      var colors = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
      ];
      var getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
      };
      return colors[getRandomInt(50)];
    },
    async crearEncuesta(val) {
      if (this.preguntaEncuesta == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes realizar una pregunta",
        });
        return false;
      }
      //aqui si enviar a guardar la encuesta
      this.isLoading = true;
      await this.$axios
        .$post("create_poll_nube_palabras_live", {
          pregunta: this.preguntaEncuesta,
          codigo: this.$route.params.cod,
          activar: val,
        })
        .then((response) => {
          if (response.status == 1) {
            this.isLoading = false;
            this.$emit("cerrarModal");
          } else {
            this.isLoading = false;
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Error en los datos ingresados",
              confirmButtonText: `OK`,
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    async getRespuestaByIdEncuesta(id) {
      await this.$axios
        .$get(
          "get_respuestas_by_user_nube_palabras?id_evento=" +
            this.id_evento +
            "&p=" +
            this.$store.state.p +
            "&id_encuesta=" +
            id
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.$emit("ocultarLoader");
            this.palabras = response.palabras;
          }
          this.isLoading = false;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    detectaTecla(event) {
      console.log(event.keyCode);
      console.log(event.ctrlKey);
      if (event.keyCode === 39) {
        this.$emit("teclas", 39);
      }
      if (event.keyCode === 37) {
        this.$emit("teclas", 37);
      }
    },
  },
  mounted() {
    if (this.modoLive == 1) {
      this.modoenVivo = this.modoLive;
    }
    console.log(this.$store.state.mostrarEnMoLive);
    window.addEventListener("keyup", this.detectaTecla);
    //consultar si el usuario ya escribío algo
    this.getRespuestaByIdEncuesta(this.id_encuesta);
  },
  destroyed() {
    window.removeEventListener("keyup", this.detectaTecla);
  },
};
</script>

<template>
  <section class="section-hero">
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <div class="container">
      <h1 class="titleModalLive">Nube de Palabras</h1>
      <div class="div-block-4">
        <input
          type="text"
          class="text-field title w-input"
          maxlength="256"
          ref="pregunta"
          v-model="preguntaEncuesta"
          placeholder="¿Que te gustaría preguntar?"
        />
      </div>

      <div class="button-group-live" style="margin-top: 50px">
        <button class="buttonN blue" @click="crearEncuesta(0)">Guardar</button>
        <button class="buttonN play" @click="crearEncuesta(1)">
          <i class="fa fa-play" aria-hidden="true"></i> &nbsp;Activar
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      opcionEncuesta: ["", ""],
      cantidadOpciones: 2,
      preguntaEncuesta: "",
      codigoBuscador: "",
      isLoading: false,
      ipWeb: "",
    };
  },
  components: { Loading },
  methods: {
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
            if (val == 1) {
              this.$store.commit("seteventLiveMode", 1);
              this.$store.commit("setcandadoModoLive", 1);
            }
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
  },
  mounted() {},
};
</script>

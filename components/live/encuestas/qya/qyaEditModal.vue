<template>
  <div>
    <h1 class="headingM has-text-left">Encuesta Q&A</h1>
    <div class="control mt-5">
      <input
        class="input"
        type="text"
        v-model="preguntaEncuesta"
        placeholder="Título"
      />
    </div>

    <div class="button-group-live" style="margin-top: 50px">
      <button class="buttonN blue" @click="crearEncuesta(0)">Guardar</button>
      <button class="buttonN play" @click="crearEncuesta(1)">
        <i class="fa fa-play" aria-hidden="true"></i> &nbsp;Activar
      </button>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["id_encuesta"],
  data() {
    return {
      preguntaEncuesta: "",
      isLoading: false,
    };
  },
  components: { Loading },
  methods: {
    async getEncuestaById(id) {
      await this.$axios
        .$get("get_encuestas_by_id_live?id=" + id)
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.preguntaEncuesta = response.encuesta[0].titulo;
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
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
        .$post("edit_qya_live_modal", {
          pregunta: this.preguntaEncuesta,
          codigo: this.$route.params.cod,
          id: this.id_encuesta,
          modo: this.$store.state.eventLiveMode,
          activar: val,
        })
        .then((response) => {
          if (response.status == 1) {
            this.isLoading = false;
            this.$emit("cerrarModalEdit");
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
  mounted() {
    this.getEncuestaById(this.id_encuesta);
  },
};
</script>

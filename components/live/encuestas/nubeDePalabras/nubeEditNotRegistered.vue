<template>
  <section class="section-hero" style="padding-top: 20px">
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <div class="container">
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
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["id_encuesta", "id_evento"],
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
        .$get(
          "get_encuestas_by_id_user_not_registered_dashboard?id=" +
            id +
            "&p=" +
            this.$store.state.p
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.preguntaEncuesta = response.encuesta[0].titulo;
          }
        }).catch(({response}) => {
          console.log(response)
        })
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
 await this.$axios.$post(
        "edit_nube_palabras_user_not_registered",
        {
          pregunta: this.preguntaEncuesta,
          id_evento: this.id_evento,
          id: this.id_encuesta,
          p: this.$store.state.p,
        }
      ).then((response) => {
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
      }).catch(({response}) => {
        console.log(response)
      })
    
    },
  },
  mounted() {
    this.getEncuestaById(this.id_encuesta);
  },
};
</script>

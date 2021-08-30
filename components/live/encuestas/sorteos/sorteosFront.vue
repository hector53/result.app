<template>
  <div style="min-height: 300px">
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <section
      class="section-hero"
      style="margin-top: 60px; border-radius: 20px; padding: 20px"
      v-if="isLoading == false"
    >
      <h1
        style="
          margin-bottom: 20px;
          border-bottom: solid 1px #8080801f;
          display: flex;
          justify-content: space-between;
        "
      >
        <span> {{ titulo_encuesta }} </span>
        <span style="font-size: 20px">Premios: {{ premios }}</span>
      </h1>
      <p class="panel-heading" style="margin: 0">
        Participantes : {{ participantes.length }}
      </p>
      <div class="scrollSorteo">
        <a
          class="panel-block"
          v-for="(item, index) in participantes"
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
    </section>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento", "modoLive"],
  data() {
    return {
      participantes: [],
      premios: 0,
      isLoading: false,
      ganadores: [],
    };
  },
  components: { Loading },
  methods: {
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
    async generarGanador(id_encuesta, ganadores) {
      let timerInterval;
      this.$swal({
        title: "Espere Por Favor",
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
            this.ganadores = ganadores;
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    async getSorteoByIdEncuesta(id) {
      await this.$axios
        .$get(
          "get_datos_sorteo_by_id_encuesta?id_evento=" +
            this.id_evento +
            "&p=" +
            this.$store.state.p +
            "&id_encuesta=" +
            id
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.participantes = response.participantes;
            this.premios = response.premios;
            this.ganadores = response.ganadores;
            this.$emit("ocultarLoader");
            this.isLoading = false;
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
  mounted() {
      window.addEventListener("keyup", this.detectaTecla);
    this.getSorteoByIdEncuesta(this.id_encuesta);
  },
  destroyed() {
    window.removeEventListener("keyup", this.detectaTecla);
  },
};
</script>

<template>
  <div style="min-height: 300px">
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <div v-if="isLoading == false">
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
      <p class="panel-heading" style="margin: 0">Participantes : {{participantes.length }}</p>
      <a
        class="panel-block"
        v-for="(item, index) in participantes"
        :key="index"
        v-text="item.value"
      ></a>

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
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento"],
  data() {
    return {
      participantes: [],
      premios: 0,
      isLoading: true,
      ganadores: [],
    };
  },
  components: { Loading },
  methods: {
    editar(){
      alert("editar")
    },
    async sortear() {
      const response = await this.$axios.$post("sortear_sorteo_live", {
        participantes: JSON.stringify(this.participantes),
        premios: this.premios,
        codigo: this.$route.params.cod,
        id_encuesta: this.id_encuesta,
      });
      console.log(response);

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
      }).then((result) => {
        if (
          /* Read more about handling dismissals below */
          result.dismiss === this.$swal.DismissReason.timer
        ) {
          if (response.status == 1) {
            this.ganadores = response.ganadores;
          }
        }
      });
    },
    async getSorteoByIdEncuesta(id) {
      this.isLoading = true;
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
            this.isLoading = false;
          }
        });
    },
  },
  mounted() {
    this.getSorteoByIdEncuesta(this.id_encuesta);
  },
};
</script>

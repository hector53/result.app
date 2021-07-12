<template>
  <div>
    <h1 class="mb-5">{{ titulo_encuesta }}</h1>
    <div class="containerHec">
      <div class="rowHec">
        <div class="large-2-5" v-for="(item, index) in dias" :key="index">
          <div class="cubreDias">
            <h3 class="diaCalendario">{{ item.dia }}</h3>
            <p>{{ item.mes }}</p>
            <h4 class="horaCalendario active" v-for="(itemh, index2) in item.horas" :key="index2 + 1000">
              {{ itemh.hora }}:{{ itemh.minutos }} - 5
            </h4>
          </div>
        </div>
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
      dias: [],
      isLoading: true,
    };
  },
  components: { Loading },
  methods: {
    editar() {
      alert("editar");
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
    async getDiayHoraByIdEncuesta(id) {
      this.isLoading = true;
      await this.$axios
        .$get(
          "get_datos_diayhora_by_id_encuesta?id_evento=" +
            this.id_evento +
            "&p=" +
            this.$store.state.p +
            "&id_encuesta=" +
            id
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            //asdasd
            this.dias = response.dias;
          }
        });
    },
  },
  mounted() {
    this.getDiayHoraByIdEncuesta(this.id_encuesta);
  },
};
</script>

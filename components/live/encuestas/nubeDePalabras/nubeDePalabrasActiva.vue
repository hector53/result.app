<template>
  <div>
    <h1>{{ titulo_encuesta }}</h1>
    <vue-word-cloud v-if="mostrar"
      style="height: 300px"
      :words="palabras"
      :color="wordsColor"
      font-family="Roboto"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento"],
  data() {
    return {
      palabras: [],
      mostrar: false
    };
  },
  components: { Loading },
  methods: {
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

            this.palabras = response.palabras;
            this.mostrar = true
          }
        }).catch(({response}) => {
          console.log(response)
        })
    },
    wordsColor: function (word) {
      var colors = ["#ffd077", "#3bc4c7", "#3a9eea", "#ff4e69", "#461e47"];
      var getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
      };
      return colors[getRandomInt(5)];
    },
  },
  mounted() {
    this.getRespuestaByIdEncuesta(this.id_encuesta);
  },
};
</script>

<template>
  <div>
     <h5 class="has-text-right" >Nube de palabras</h5>
    <h1>{{ titulo_encuesta }}</h1>
 

      <div v-if="palabras.length==0"  class="palabrasVacias"  >
      <h2>Sin palabras aún</h2>
      </div>

         <vue-word-cloud v-else
      style="height: 300px"
      :words="palabras"
      :color="wordsColor"
      font-family="Roboto"
      :class="{'nubeModoPdf': modoPdf == 1}"
    >
       <template slot-scope="{ text, weight }">
          <div 
            :title="'(' + weight + ')'"
            style="cursor: pointer; display: flex; align-items: center"
          >
            
            <span>{{ text }}</span>
             <span style="font-size: 15px;">({{ weight }})</span>
          </div>
        </template>
    </vue-word-cloud>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento", "modoPdf"   ],
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
    console.log("mdodfsoidsfaoijdsfa", this.modoPdf)
    this.getRespuestaByIdEncuesta(this.id_encuesta);
  },
};
</script>

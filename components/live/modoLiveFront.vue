<template>
<div v-if="mostrar">

<multiple-choice-front v-if="arrayEncuesta[0].tipo == 1" :id_encuesta="arrayEncuesta[0].id" 
:titulo_encuesta="arrayEncuesta[0].titulo" :id_evento="id_evento"
></multiple-choice-front>
</div>
</template>

<script>
import multipleChoiceFront from '../encuestas/multipleChoiceFront.vue';
export default {
  components: { multipleChoiceFront },
  props:['id_evento'],
  data() {
    return {
     arrayEncuesta: [], 
     mostrar: false
	};
  },

  methods: {
          async getEncuestaByEventLive(cod){
              this.mostrar= false
              console.log("vengo desde el socket")
        await   this.$axios.$get("get_encuesta_event_live?codigo="+cod)
        .then((response) => {
                if(response.status == 1){
                    console.log("la respues fue igual a uno")
                    this.arrayEncuesta = response.tipoEncuesta
                    this.mostrar = true

                }
        })
    }, 
  },
  mounted() {

      this.getEncuestaByEventLive(this.$route.params.cod)
     
  },
};
</script>

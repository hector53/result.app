<template>
<div  >

<multiple-choice-front   ref="simpleFront" v-if="tipo == 1" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" :modoLive="modoLive"
></multiple-choice-front>

<nube-de-palabras-front ref="nubeFront" v-if="tipo == 2" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" ></nube-de-palabras-front>
</div>
</template>

<script>
import multipleChoiceFront from '../encuestas/multipleChoiceFront.vue';
import NubeDePalabrasFront from './encuestas/nubeDePalabras/nubeDePalabrasFront.vue';
export default {
  components: { multipleChoiceFront, NubeDePalabrasFront },
  props:['id_evento', 'modoLive'],
  data() {
    return {
     arrayEncuesta: [], 
     mostrar: false, 
     tipo: 0, 
     id: 0, 
     titulo: ''
	};
  },

  methods: {
          async getEncuestaByEventLive(cod){
              this.mostrar= false
              this.$store.commit("setmostrarEnMoLive", false);
              
              console.log("vengo desde el socket")
        await   this.$axios.$get("get_encuesta_event_live?codigo="+cod)
        .then((response) => {
          console.log(response)
                if(response.status == 1){
                    console.log("la respues fue igual a uno")
                    this.arrayEncuesta = response.tipoEncuesta
                    this.tipo = response.tipoEncuesta[0].tipo
                    this.id = response.tipoEncuesta[0].id
                    this.titulo =  response.tipoEncuesta[0].titulo
                    this.$store.commit("setmostrarEnMoLive", true);
                    console.log("id del ", response.tipoEncuesta[0].id)
                     if(response.tipoEncuesta[0].tipo == 1){
                        
                        this.$refs['simpleFront'].getEncuestaById(response.tipoEncuesta[0].id)
                    }

                    if(response.tipoEncuesta[0].tipo == 2){
                        this.$refs['nubeFront'].getRespuestaByIdEncuesta(response.tipoEncuesta[0].id)
                    }
                     

                }
        })
    }, 
  },
  mounted() {
      this.getEncuestaByEventLive(this.$route.params.cod)
     
  },
};
</script>

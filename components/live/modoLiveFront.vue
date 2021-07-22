<template>
<div  >

<multiple-choice-front   ref="simpleFront" v-if="tipo == 1" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" :modoLive="modoLive"  :statusEvent="1"
></multiple-choice-front>

<nube-de-palabras-front ref="nubeFront" v-if="tipo == 2" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" :modoLive="modoLive"  :statusEvent="1" ></nube-de-palabras-front>

<sorteos-front ref="sorteosFront" v-if="tipo == 3" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" :modoLive="modoLive" ></sorteos-front>

<dia-hora-front ref="diaHoraFront" v-if="tipo == 4" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" :modoLive="modoLive" statusEvent="1"  ></dia-hora-front>

<qya-front ref="qyaFront" v-if="tipo == 5" :id_encuesta="id" 
:titulo_encuesta="titulo" :id_evento="id_evento" :modoLive="modoLive" statusEvent="1"  ></qya-front>

</div>
</template>

<script>
import multipleChoiceFront from '../encuestas/multipleChoiceFront.vue';
import DiaHoraFront from './encuestas/diaHora/diaHoraFront.vue';
import NubeDePalabrasFront from './encuestas/nubeDePalabras/nubeDePalabrasFront.vue';
import QyaFront from './encuestas/qya/qyaFront.vue';
import SorteosFront from './encuestas/sorteos/sorteosFront.vue';
export default {
  components: { multipleChoiceFront, NubeDePalabrasFront, SorteosFront, DiaHoraFront, QyaFront },
  props:['id_evento', 'modoLive'],
  data() {
    return {
     arrayEncuesta: [], 
     mostrar: false, 
     tipo: 0, 
     id: 0, 
     titulo: '',
     contador:0
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

                    console.log("contador va en ", this.contador)
                    if(this.contador > 0){
                           if(response.tipoEncuesta[0].tipo == 1){
                            this.$refs['simpleFront'].getEncuestaById(response.tipoEncuesta[0].id)
                            }
                            if(response.tipoEncuesta[0].tipo == 2){
                            this.$refs['nubeFront'].getRespuestaByIdEncuesta(response.tipoEncuesta[0].id)
                            }
                            if(response.tipoEncuesta[0].tipo == 3){
                            this.$refs['sorteosFront'].getSorteoByIdEncuesta(response.tipoEncuesta[0].id)
                            }
                            if(response.tipoEncuesta[0].tipo == 4){
                            this.$refs['diaHoraFront'].getDiayHoraByIdEncuesta(response.tipoEncuesta[0].id)
                            }
                            if(response.tipoEncuesta[0].tipo == 5){
                            this.$refs['qyaFront'].getPreguntasByIdEncuesta(response.tipoEncuesta[0].id)
                            }
                    }
                           
                   
    

                         console.log("contador", this.contador)
                }
        })
    }, 
  },
  mounted() {
      
      this.getEncuestaByEventLive(this.$route.params.cod)
     
  },
};
</script>

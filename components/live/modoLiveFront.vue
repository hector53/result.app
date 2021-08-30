<template>
  <div v-if="arrayEncuesta.length > 0">
    
    <multiple-choice-front
      ref="simpleFront"
      v-if="tipo == 1"
      :id_encuesta="id"
      :key="keySimpleChoice"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      :statusEvent="1"
      :extra="extra"
      @ocultarLoader="ocultarLoader"
    ></multiple-choice-front>

    <nube-de-palabras-front
      ref="nubeFront"
      :key="keyAll"
      v-if="tipo == 2"
      :id_encuesta="id"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      :statusEvent="1"
      :extra="extra"
      @ocultarLoader="ocultarLoader"
    ></nube-de-palabras-front>

    <sorteos-front
      ref="sorteosFront"
      v-if="tipo == 3"
      :key="keyAll"
      :id_encuesta="id"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      :extra="extra"
      @ocultarLoader="ocultarLoader"
    ></sorteos-front>

    <dia-hora-front
      ref="diaHoraFront"
      v-if="tipo == 4"
      :key="keyAll"
      :id_encuesta="id"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      statusEvent="1"
       :extra="extra"
       @ocultarLoader="ocultarLoader"
    ></dia-hora-front>

    <qya-front
      ref="qyaFront"
       :key="keyAll"
      v-if="tipo == 5"
      :id_encuesta="id"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      statusEvent="1"
      :extra="extra"
      @ocultarLoader="ocultarLoader"
    ></qya-front>
  </div>
</template>

<script>
import multipleChoiceFront from "../encuestas/multipleChoiceFront.vue";
import DiaHoraFront from "./encuestas/diaHora/diaHoraFront.vue";
import NubeDePalabrasFront from "./encuestas/nubeDePalabras/nubeDePalabrasFront.vue";
import QyaFront from "./encuestas/qya/qyaFront.vue";
import SorteosFront from "./encuestas/sorteos/sorteosFront.vue";
export default {
  components: {
    multipleChoiceFront,
    NubeDePalabrasFront,
    SorteosFront,
    DiaHoraFront,
    QyaFront,
  },
  props: ["id_evento", "modoLive"],
  data() {
    return {
      arrayEncuesta: [],
      extra: 0,
      mostrar: false,
      tipo: 0,
      id: 0,
      titulo: "",
      keySimpleChoice: 0,
      keyEncuesta: 0, 
      keyAll: 0, 
      conta: 0
    };
  },

  methods: {
    ocultarLoader(){
      this.$emit("ocultarLoader")
    },
    async getEncuestaByEventLive(cod) {
      console.log("actualizando modo live front")
      this.mostrar = false;
      this.$store.commit("setmostrarEnMoLive", false);

      console.log("vengo desde el socket");
      await this.$axios
        .$get("get_encuesta_event_live?codigo=" + cod)
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.arrayEncuesta = [];
            console.log("la respues fue igual a uno");
            
            this.tipo = response.tipoEncuesta[0].tipo;
            this.extra = response.tipoEncuesta[0].extra;
             this.id = response.tipoEncuesta[0].id;
            this.titulo = response.tipoEncuesta[0].titulo;
            var idEncuesta = response.tipoEncuesta[0].id;

            this.arrayEncuesta = response.tipoEncuesta;

              for(var i = 0; i<this.$store.state.arrayEncuestaActiveLiveMode.length; i++){
                console.log("id array encuesta", this.$store.state.arrayEncuestaActiveLiveMode[i].id)
              if(this.$store.state.arrayEncuestaActiveLiveMode[i].id == response.tipoEncuesta[0].id){
                console.log("si es igual")
                    this.$store.commit("setencuestaLivePosicionActive", i+1);
              }
              }




            if(response.tipoEncuesta[0].tipo==1){
                this.keySimpleChoice++
            }

             if(response.tipoEncuesta[0].tipo==2 || response.tipoEncuesta[0].tipo==5){
                this.keyAll++
            }

          

            
           
            this.$store.commit("setmostrarEnMoLive", true);
            console.log("id del ", response.tipoEncuesta[0].id);
          }

        
        }).catch(({response}) => {
          console.log(response)
        })
    },
  },
  mounted() {
    this.getEncuestaByEventLive(this.$route.params.cod);
  },
};
</script>

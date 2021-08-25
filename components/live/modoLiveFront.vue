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
    ></nube-de-palabras-front>

    <sorteos-front
      ref="sorteosFront"
      v-if="tipo == 3"
      :id_encuesta="id"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      :extra="extra"
    ></sorteos-front>

    <dia-hora-front
      ref="diaHoraFront"
      v-if="tipo == 4"
      :id_encuesta="id"
      :titulo_encuesta="titulo"
      :id_evento="id_evento"
      :modoLive="modoLive"
      statusEvent="1"
       :key="keyEncuesta"
       :extra="extra"
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
            this.arrayEncuesta = response.tipoEncuesta;
            this.tipo = response.tipoEncuesta[0].tipo;
            this.extra = response.tipoEncuesta[0].extra;
            if(response.tipoEncuesta[0].tipo==1){
                this.keySimpleChoice++
            }

             if(response.tipoEncuesta[0].tipo==2 || response.tipoEncuesta[0].tipo==5){
                this.keyAll++
            }

            if(this.conta > 0){
                  if(response.tipoEncuesta[0].tipo == 4){
            this.$refs['diaHoraFront'].getDiayHoraByIdEncuesta(response.tipoEncuesta[0].id)
            }
            }
            this.conta++

            
            this.id = response.tipoEncuesta[0].id;
            this.titulo = response.tipoEncuesta[0].titulo;
            this.$store.commit("setmostrarEnMoLive", true);
            console.log("id del ", response.tipoEncuesta[0].id);
          }

          /*    console.log("contador va en ", this.contador)
                    if(this.$store.state.contadorModoLiveFront > 0){
                      console.log("pase el contador a 1")
                           if(response.tipoEncuesta[0].tipo == 1){
                         //    this.keySimpleChoice += 1;
                        //    this.$refs['simpleFront'].getEncuestaById(response.tipoEncuesta[0].id)
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
                }else{
                      this.arrayEncuesta = []
                }

                */
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

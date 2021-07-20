<template>
<div style="    min-height: 500px;">
 <loading :active="isLoading" color="#59b1ff" loader="dots" />
  <div class="cubreEventoFron" v-show="isLoading== false">
    <div class="navigationTab" v-if="encuestas.length>1">
      <div class="tabMia " v-for="index in tabs" :key="index"  >
        <div class="tabMia-content " 
        @click="tabActive = index "
        :class="{'active': tabActive == index}"></div>
      </div>
    </div>
    <div class="contentTab" v-for="(item, index) in encuestas" :key="index">
        <div v-if="tabActive == (index+1)" >
              <multiple-choice-front v-if="item.tipo == 1" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent"
              @teclas="moverTab" @closeLoading="closeLoading"
              ></multiple-choice-front>
              <nube-de-palabras-front @teclas="moverTab" v-if="item.tipo == 2" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent" ></nube-de-palabras-front>
              <sorteos-front @teclas="moverTab" v-if="item.tipo == 3" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent" ></sorteos-front>

              <dia-hora-front
               @teclas="moverTab" v-if="item.tipo == 4" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent"
              ></dia-hora-front>

              <qya-front @teclas="moverTab" v-if="item.tipo == 5" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent" ></qya-front>
        
        </div>
    </div>
  </div>
</div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import multipleChoiceFront from '../encuestas/multipleChoiceFront.vue';
import DiaHoraFront from '../live/encuestas/diaHora/diaHoraFront.vue';
import NubeDePalabrasFront from '../live/encuestas/nubeDePalabras/nubeDePalabrasFront.vue';
import QyaFront from '../live/encuestas/qya/qyaFront.vue';
export default {
  components: { multipleChoiceFront, Loading, NubeDePalabrasFront, DiaHoraFront, QyaFront },
  props:['id_evento', 'encuestas', 'statusEvent'],
  data() {
    return {
      tabs: this.encuestas.length,
      tabActive: 1, 
      isLoading: false,
    };
  },

  methods: {
    closeLoading(){
      this.isLoading = false
    },
    moverTab(tecla){
      console.log(tecla)
      if(tecla == 39){
        if(this.tabActive < this.tabs){
            this.tabActive++
        }
      }
       if(tecla == 37){
        if(this.tabActive > 1){
            this.tabActive--
        }
      }

    },
    async getEncuestasbyEvent(){
        await   this.$axios.$get("get_encuestas_by_event?id_evento="+this.id_evento)
        .then((response) => {
                console.log(response)
        })
    }, 
  },
  mounted() {
    console.log("get evento status", this.statusEvent)
  },
 
};
</script>

<template>
<div>
 <div class="cubreContentLive" v-if="$store.state.eventLiveMode==0">
      <div class="contentColumnLive">
        <h1>Entrá a <br />result.app <br />#{{$route.params.cod}}</h1>
      </div>
      <div class="contentColumnLive">
        
         <vue-qrcode :value="urlQr" class="imgQr"   />
      </div>
    </div>
 <div v-else>
    <div   v-for="(item, index) in $store.state.arrayEncuestaActiveLiveMode" :key="index"  style="margin-top: 70px;">
       <div class="cubreResults"  v-if="$store.state.encuestaActiveLiveMode == item.id" >
          <multiple-choice-result
          :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 1 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo"
          ></multiple-choice-result>

          <nube-de-palabras-activa
           :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 2 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          ></nube-de-palabras-activa>
       </div>
     
    </div>
 </div>
 
</div>
 
</template>

<script>
import VueQrcode from 'vue-qrcode'
import MultipleChoiceResult from '../encuestas/multipleChoiceResult.vue';
import nubeDePalabrasActiva from './encuestas/nubeDePalabras/nubeDePalabrasActiva.vue';
export default {
  components: { nubeDePalabrasActiva, MultipleChoiceResult, VueQrcode },
props:['id_evento'],
  data() {
    return {
     
    };
  },

  methods: {
    urlQr: 'http://result.jemyxs2xli-zqy3jz1yy6kg.p.runcloud.link/p/'+this.$route.params.cod
  },
  mounted() {
  
  },
};
</script>
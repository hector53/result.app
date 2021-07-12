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
      <span class="usersOnline">Usuarios en linea: {{$store.state.usersOnline}}</span>


<div class="columns"  style="margin-top: 50px; padding:20px">
  <div class="column is-4"  style="text-align: center; color: white;">
    <h1>Entrá a <br />result.app <br />#{{$route.params.cod}}</h1>
    <vue-qrcode :value="urlQr" class="imgQr"   />
  </div>

   <div class="column is-8">
     <div   v-for="(item, index) in $store.state.arrayEncuestaActiveLiveMode" :key="index" >
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

          <sorteos-live-activo
            :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 3 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          ></sorteos-live-activo>

          <dia-hora-live-activo
            :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 4 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          > </dia-hora-live-activo>
       </div>
    </div>
   </div>
</div>

    
    
    
    


    
 </div>
 
</div>
 
</template>

<script>
import VueQrcode from 'vue-qrcode'
import MultipleChoiceResult from '../encuestas/multipleChoiceResult.vue';
import DiaHoraLiveActivo from './encuestas/diaHora/diaHoraLiveActivo.vue';
import nubeDePalabrasActiva from './encuestas/nubeDePalabras/nubeDePalabrasActiva.vue';
import SorteosLiveActivo from './encuestas/sorteos/sorteosLiveActivo.vue';
export default {
  components: { nubeDePalabrasActiva, MultipleChoiceResult, VueQrcode, SorteosLiveActivo, DiaHoraLiveActivo },
props:['id_evento'],
  data() {
    return {
       urlQr: 'http://result.jemyxs2xli-zqy3jz1yy6kg.p.runcloud.link/p/'+this.$route.params.cod, 
       enLinea: 0
    };
  },

  methods: {

  },
  mounted() {

   
  
  },
};
</script>
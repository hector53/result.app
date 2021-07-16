<template>
<div>
<button class="button is-info btnAtajos modal-button" data-target="#modal"><i class="fa fa-info-circle"
      aria-hidden="true" ></i></button>
  <div id="modal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h1 class="title is-3 mt-3">Atajos de Página</h1>
        <ul>

          <li> <b>Votar:</b> Puedes votar presionando la tecla del numero correspondiente </li>
          <li><b>Ejemplo para votar por la opción 1:</b> Pulse la tecla <kbd>1</kbd> </li>
          <li><b>Cancelar Voto: </b>Pulse la tecla <kbd>C</kbd> </li>
          <li><b>Pra copiar la url: </b>Pulse la tecla <kbd>U</kbd> </li>
          <li><b>Pra copiar el #codigo: </b>Pulse la tecla <kbd>H</kbd> </li>

        </ul>

      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
<section class="section-hero" style="min-height: 500px; padding: 5px">
 <div style="padding: 10px;     text-align: left;" >
        <div class="text-block-8" @click="mostrarQr">
          
          <i class="fa fa-arrow-down" v-if="qrCode"   aria-hidden="true"></i>
          <i class="fa fa-arrow-right" v-else  aria-hidden="true"></i>
          
          &nbsp;{{$store.state.idioma.shareQR}}</div>
        <div class="div-block-11" v-if="qrCode"  >
          <div>
            <div class="text-block-9"># {{codigoEncuesta}}</div>
            <div class="text-block-10" @click="copyLink('urlsite', 1)">
              {{$store.state.idioma.copyURL}}</div>
              <div><div class="text-block-15">{{$store.state.idioma.shareOn}} </div>
              <a href="#" class="compartir"><i class="fa fa-twitter" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-facebook" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-whatsapp" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-slack" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-envelope-o" aria-hidden="true"></i></a></div>
          </div>
         
             <vue-qrcode :value="urlActual" class="image-2"  />
        </div>
      </div>
<div  v-for="(item, index) in encuestas" :key="index">
               <multiple-choice-front v-if="item.tipo == 1" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent"
              @closeLoading="closeLoading" 
              ></multiple-choice-front>

              <dia-hora-front
           v-if="item.tipo == 4" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo" :id_evento="id_evento" :statusEvent="statusEvent"
   
              ></dia-hora-front>

</div>

</section>



</div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
import MultipleChoiceFront from '../encuestas/multipleChoiceFront.vue';
import DiaHoraFront from '../live/encuestas/diaHora/diaHoraFront.vue';
export default {
  components:{VueQrcode, MultipleChoiceFront, DiaHoraFront},
    props:['id_evento', 'encuestas', 'statusEvent'],
  data() {
    return {

        codigoEncuesta: this.$route.params.cod,
        qrCode: false, 
     
	};
  },
 
  methods: {
   
      
      mostrarQr(){
        this.qrCode = !this.qrCode
        
      },
      
  },
 async  mounted() {
   var URLactual = window.location;
   this.urlActual = URLactual.href
  },
 
};
</script>

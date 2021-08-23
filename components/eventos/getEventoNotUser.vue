<template>
  <div>
    <section class="section-hero" style="min-height: 600px; padding: 5px">
      <div style="padding: 10px; text-align: left">
        <div class="text-block-8" @click="mostrarQr">
          <i class="fa fa-arrow-down" v-if="qrCode" aria-hidden="true"></i>
          <i class="fa fa-arrow-right" v-else aria-hidden="true"></i>

          &nbsp;{{ $store.state.idioma.shareQR }}
        </div>
        <div class="div-block-11" v-if="qrCode">
          <div>
            <div class="text-block-9"># {{ codigoEncuesta }}</div>
            <div class="text-block-10" @click="copyLink('urlsite', 1)">
              {{ $store.state.idioma.copyURL }}
            </div>
            <div v-if="urlActual !=''">
              <div class="text-block-15">{{ $store.state.idioma.shareOn }}</div>
              <ShareNetwork
              network="twitter"
              :url="urlActual"
              :title="encuestas[0].titulo"
              >
              <i class="fa fa-twitter compartir" aria-hidden="true"></i>
              </ShareNetwork>
              <ShareNetwork
              network="facebook"
              :url="urlActual"
              :title="encuestas[0].titulo"
              >
              <i class="fa fa-facebook compartir" aria-hidden="true"></i>
              </ShareNetwork>
              <ShareNetwork
              network="LinkedIn"
              :url="urlActual"
              :title="encuestas[0].titulo"
              >
              <i class="fa fa-linkedin compartir" aria-hidden="true"></i>
              </ShareNetwork>
              <ShareNetwork
              network="WhatsApp"
              :url="urlActual"
              :title="encuestas[0].titulo"
              >
              <i class="fa fa-whatsapp compartir" aria-hidden="true"></i>
              </ShareNetwork>
               <ShareNetwork
              network="Email"
              :url="urlActual"
              :title="encuestas[0].titulo"
              >
              <i class="fa fa-envelope-o compartir" aria-hidden="true"></i>
              </ShareNetwork>
              
            </div>
          </div>

          <vue-qrcode :value="urlActual" class="image-2" />
        </div>
      </div>
      <div v-for="(item, index) in encuestas" :key="index">
        <multiple-choice-front
          v-if="item.tipo == 1"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
          :statusEvent="statusEvent"
          :modoLive="0"
        ></multiple-choice-front>

        <nube-de-palabras-front
          v-if="item.tipo == 2"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
          :statusEvent="statusEvent"
          :modoLive="0"
        ></nube-de-palabras-front>

        <dia-hora-front
          v-if="item.tipo == 4"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
          :statusEvent="statusEvent"
          :modoLive="0"
        ></dia-hora-front>
      </div>
    </section>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";
import MultipleChoiceFront from "../encuestas/multipleChoiceFront.vue";
import DiaHoraFront from "../live/encuestas/diaHora/diaHoraFront.vue";
import NubeDePalabrasFront from "../live/encuestas/nubeDePalabras/nubeDePalabrasFront.vue";
export default {
  components: {
    VueQrcode,
    MultipleChoiceFront,
    DiaHoraFront,
    NubeDePalabrasFront,
  },
  props: ["id_evento", "encuestas", "statusEvent"],
  data() {
    return {
      codigoEncuesta: this.$route.params.cod,
      qrCode: false,
      urlActual: ''
    };
  },

  methods: {
    mostrarQr() {
      this.qrCode = !this.qrCode;
    },
  },
  async mounted() {
    
    var URLactual = window.location;
    this.urlActual = URLactual.href;
  },
};
</script>

<template>
  <div  style="    padding-left: 10px;    padding-right: 10px;        margin: auto;     margin-top: 0;    width: 100%;" >
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <nav-bar-evento
      v-if="eventT"
      @activarEvento="activarEvento"
      @publicarEvento="publicarEvento"
    ></nav-bar-evento>
    <nav-bar-event
      v-if="eventT"
      :eventName="eventName"
      :eventFecha="eventFecha"
      @activarEvento="activarEvento"
      @publicarEvento="publicarEvento"
      @generatePdf="generatePdf"
    ></nav-bar-event>

    <section
      slot="pdf-content"
      style="padding: 20px"
      :class="{ minAltoLoading: isLoading }"
    >
      <div class="cubreResults" v-for="(item, index) in encuestas" :key="index">
        <multiple-choice-result
          :ref="'encuestaFront_' + item.id"
          v-if="item.tipo == 1"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
        ></multiple-choice-result>

        <nube-de-palabras-activa
          :ref="'encuestaFront_' + item.id"
          v-if="item.tipo == 2"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
        ></nube-de-palabras-activa>

        <sorteos-live-activo
          :ref="'encuestaFront_' + item.id"
          v-if="item.tipo == 3"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
        ></sorteos-live-activo>

        <dia-hora-live-activo
          :ref="'encuestaFront_' + item.id"
          v-if="item.tipo == 4"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
        >
        </dia-hora-live-activo>

        <qya-active
          :ref="'encuestaFront_' + item.id"
          v-if="item.tipo == 5"
          :id_encuesta="item.id"
          :titulo_encuesta="item.titulo"
          :id_evento="id_evento"
        ></qya-active>
        <div class="html2pdf__page-break"></div>
      </div>
    </section>

   <div class="content" style="display:none" >
     <client-only>
            <vue-html2pdf
            pdf-content-width="100%"
            :show-layout="true"
            :float-layout="false"
            :enable-download="true"
            :preview-modal="true"
            filename="hee hee"
            :pdf-quality="2"
            :manual-pagination="false"
            :paginate-elements-by-height="600"
            pdf-format="a4"
            pdf-orientation="landscape"
            @progress="onProgress($event)"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            	@beforeDownload="beforeDownload"
              @hasDownloaded="hasDownloaded"
            ref="html2Pdf"
            >
            <section slot="pdf-content" class="pdfSeccion">
                 
            <div
              class="cubreResults"
              v-for="(item, index) in encuestas"
              :key="index"
            >
              <multiple-choice-result
                :ref="'encuestaFront_' + item.id"
                v-if="item.tipo == 1"
                :id_encuesta="item.id"
                :titulo_encuesta="item.titulo"
              ></multiple-choice-result>

              <nube-de-palabras-activa
                :ref="'encuestaFront_' + item.id"
                v-if="item.tipo == 2"
                :id_encuesta="item.id"
                :titulo_encuesta="item.titulo"
                :id_evento="id_evento"
                :modoPdf="1"
              ></nube-de-palabras-activa>

              <sorteos-live-activo
                :ref="'encuestaFront_' + item.id"
                v-if="item.tipo == 3"
                :id_encuesta="item.id"
                :titulo_encuesta="item.titulo"
                :id_evento="id_evento"
              ></sorteos-live-activo>

              <dia-hora-live-activo
                :ref="'encuestaFront_' + item.id"
                v-if="item.tipo == 4"
                :id_encuesta="item.id"
                :titulo_encuesta="item.titulo"
                :id_evento="id_evento"
              >
              </dia-hora-live-activo>

              <qya-active
                :ref="'encuestaFront_' + item.id"
                v-if="item.tipo == 5"
                :id_encuesta="item.id"
                :titulo_encuesta="item.titulo"
                :id_evento="id_evento"
                 :modoLive="0"
              ></qya-active>
            </div>
            </section>
            </vue-html2pdf>

</client-only>



            
          </div>

  </div>
</template>

<script>
import MultipleChoiceResult from "../../../components/encuestas/multipleChoiceResult.vue";
import FooterT from "../../../components/footer/footerT.vue";
import navBarEvento from "../../../components/header/navBarEvento.vue";
import DiaHoraLiveActivo from "../../../components/live/encuestas/diaHora/diaHoraLiveActivo.vue";
import QyaActive from "../../../components/live/encuestas/qya/qyaActive.vue";
import SorteosLiveActivo from "../../../components/live/encuestas/sorteos/sorteosLiveActivo.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  layout: "live",
  components: {
    navBarEvento,
    MultipleChoiceResult,
    QyaActive,
    SorteosLiveActivo,
    DiaHoraLiveActivo,
    FooterT,
  },
    async asyncData({ params, store, redirect, app, route }) {
    var tokenUser = app.$cookies.get("r_auth");
    app.$axios.setToken(tokenUser, "Bearer");
    const response = await app.$axios.$get("getSessionAndCodLive?cod="+route.params.cod)
    if(response.status == 0){
      return redirect("/");
    }
    if(response.status == 2){
      return redirect("/dashboard");
    }
    

  },
  head() {
    return {
      title: "Event Results - " + this.$route.params.cod + " - Resultapp",
    };
  },
  components: { Loading },
  data() {
    return {
      eventT: false,
      eventName: "",
      eventFecha: "",
      encuestas: [],
      id_evento: "",
      isLoading: true,
      modalPdf: false,
    };
  },

  methods: {
async beforeDownload({ html2pdf, options, pdfContent }){

},
hasDownloaded(event){
console.log("hasDownloaded", event);
},

    generatePdf() {
      this.isLoading = true 

      this.$refs.html2Pdf.generatePdf();
    },
    onProgress(event) {
      console.log("progress", event);
      if(event == 100){
          this.isLoading = false 
          let timerInterval;
      this.$swal({
        title: "Espere Por Favor",
        html: "Estamos generando el pdf...",
        timer: 2000,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
        onClose: () => {
          clearInterval(timerInterval);
        },
      })
        .then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.timer
          ) {
            
          }
        })
      }else{
        this.isLoading = true 
      }
      
    },
    hasStartedGeneration() {
      console.log("hasstarted");
    },
    hasGenerated(event) {
      console.log("hasgenerado");
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    async publicarEvento() {
      const response = await this.$axios.$post("publicar_evento", {
        publicarDesactivar: this.$store.state.candadoModoLive,
        codigo: this.$route.params.cod,
      });
      if (response.status == 1) {
        if (this.$store.state.candadoModoLive == 1) {
          this.$store.commit("setcandadoModoLive", 0);
        } else {
          this.$store.commit("setcandadoModoLive", 1);
        }
      }
    },

    async activarEvento(val) {
      this.$store.commit("setisLoading", true);
      console.log(val);
      if (val == 1) {
        this.modoLive = 1;
        this.$store.commit("seteventLiveMode", 1);
        this.$store.commit("setcandadoModoLive", 1);
        //y aparte cambiar el resultado en la db
        const response = await this.$axios.$post("modo_live_evento", {
          modoLive: 1,
          codigo: this.$route.params.cod,
        });

        this.$emit("activarLoader");

        location.href = "/event/" + this.$route.params.cod + "/live";
      }
      if (val == 2) {
        this.modoLive = 0;
        this.$store.commit("seteventLiveMode", 0);
        this.$store.commit("setcandadoModoLive", 0);
        const response = await this.$axios.$post("modo_live_evento", {
          modoLive: 0,
          codigo: this.$route.params.cod,
        });
        this.$store.commit("setisLoading", false);
      }
    },

    emitir() {
      var User = this.$store.state.p;
      var codigo = this.$route.params.cod;
      this.socket.emit(
        "conectar",
        {
          username: User,
          room: codigo,
        },
        (resp) => {}
      );
    },
    async get_event() {
      await this.$axios
        .$get("get_event_by_cod?codigo=" + this.$route.params.cod)
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.eventName = response.titulo;
            this.eventT = true;
            this.encuestas = response.tipoEncuesta;
            this.id_evento = response.id;
            this.eventFecha = response.fecha;
          }
          if (response.status == 2) {
            this.eventT = true;
            this.eventName = response.titulo;
            this.id_evento = response.id;
            this.eventFecha = response.fecha;
          }

          this.isLoading = false;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
  mounted() {
    console.log("ruta resultados", this.$route.name)
    this.socket = this.$nuxtSocket({
      channel: "/",
    });

    var User = this.$store.state.p;
    var codigo = this.$route.params.cod;
    this.socket.emit(
      "joinRoom",
      {
        username: User,
        room: codigo,
      },
      (resp) => {}
    );

    this.socket.on("join_room_announcement", (data) => {
      console.log(`<b>${data.username}</b> has joined the room`);
    });

    this.socket.on("respuestaDelVoto", (data) => {
      console.log(data);
      console.log(this.$refs["encuestaFront_" + data.id_encuesta][0]);
      var idEncuestaM =
        this.$refs["encuestaFront_" + data.id_encuesta][0].id_encuesta;
      console.log("esta encuesta es la q debemos actualizar", data.id_encuesta);

      if (data.id_encuesta == idEncuestaM) {
        if (data.tipo == 1) {
          this.$refs["encuestaFront_" + data.id_encuesta][0].getEncuestaById(
            data.id_encuesta
          );
        }
        if (data.tipo == 2) {
          this.$refs[
            "encuestaFront_" + data.id_encuesta
          ][0].getRespuestaByIdEncuesta(data.id_encuesta);
        }

        if (data.tipo == 5) {
          this.$refs[
            "encuestaFront_" + data.id_encuesta
          ][0].getPreguntasByIdEncuesta(data.id_encuesta);
        }

        if (data.tipo == 4) {
          this.$refs[
            "encuestaFront_" + data.id_encuesta
          ][0].getDiayHoraByIdEncuesta(data.id_encuesta);
        }
      }
    });

    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.get_event();
  },
};
</script>

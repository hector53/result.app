<template>
  <div style="    padding-left: 10px;    padding-right: 10px;        margin: auto;     margin-top: 0;    width: 100%;"  >
    <loading :active="$store.state.isLoading" color="#59b1ff" loader="dots" :is-full-page="true" />
    <nav-bar-evento
      @activarLoader="activarLoader"
      v-if="eventT"
      :eventModo="eventModo"
      :eventStatus="eventStatus"
      @guardarEvento="guardarEvento"
      @activarEvento="activarEvento"
      @publicarEvento="publicarEvento"
      
    ></nav-bar-evento>
    <nav-bar-event
      v-if="eventT"
      :eventName="eventName"
      :eventFecha="eventFecha"
      @addNewEncuesta="addNewEncuesta"
      @activarEvento="activarEvento"
      @publicarEvento="publicarEvento"
      @duplicarEvento="duplicarEvento"
    ></nav-bar-event>
    <section
      class="section-hero"
      style="padding: 5px; margin-bottom: 40px; min-height: 500px;"
      :class="{ minAltoLoading: isLoading }"
    >
      <div class="container">
        
        <tipos-encuestas-index
          @addNewEncuesta="addNewEncuesta"
          v-if="opcionesPredeterminadas && eventT"
          @createPoll="createPoll"
        ></tipos-encuestas-index>
        <div v-for="(item, index) in arrayEncuestas" :key="index">
          <multiple-choice
            :ref="'encuesta_' + index"
            v-if="item['tipo'] == 1"
            :numero="index"
            :idEcuesta="item['idEcuesta']"
            :pregunta="item['pregunta']"
            :opciones="item['opciones']"
            :opciones2="item['opciones2']"
            :multiple="item['multiple']"
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
            @actualizarArray="actualizarArray"
          ></multiple-choice>
          <nube-de-palabras-add
            :ref="'encuesta_' + index"
            v-if="item['tipo'] == 2"
            :numero="index"
            :idEcuesta="item['idEcuesta']"
            :pregunta="item['pregunta']"
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
            @actualizarArray="actualizarArray"
          ></nube-de-palabras-add>

          <sorteos-add
            :ref="'encuesta_' + index"
            v-if="item['tipo'] == 3"
            :numero="index"
            :idEcuesta="item['idEcuesta']"
            :tituloP="item['pregunta']"
            :integrantes="item['participantes']"
            :ganadoresP="item['ganadores']"
            :premiosP="item['premios']"
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
            @actualizarArray="actualizarArray"
            @openModalEdit="openModalEdit"
          ></sorteos-add>

          <dia-hora-add
            :ref="'encuesta_' + index"
            v-if="item['tipo'] == 4 && item['idEcuesta'] == 0"
            :idEcuesta="item['idEcuesta']"
            :numero="index"
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
            @actualizarArray="actualizarArray"
            @openModalEdit="openModalEdit"
          ></dia-hora-add>

          <dia-hora-edit-dashboard
            :ref="'encuesta_' + index"
            v-if="item['tipo'] == 4 && item['idEcuesta'] > 0"
            :numero="index"
            :id_encuesta="item['idEcuesta']"
            :tituloP="item['pregunta']"
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
          ></dia-hora-edit-dashboard>

          <qya-add
            :ref="'encuesta_' + index"
            v-if="item['tipo'] == 5"
            :numero="index"
            :idEcuesta="item['idEcuesta']"
            :pregunta="item['pregunta']"
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
            @actualizarArray="actualizarArray"
          ></qya-add>
        </div>
      </div>
    </section>

    <div id="modalEditEncuestaLive" class="modal">
      <div class="modal-background" @click="closeModalEditLive"></div>
      <div class="modal-content">
        <div class="box" style="text-align: left">
          <sorteos-edit-modal
            v-if="encuestaEditId != 0"
            @cerrarModalEdit="cerrarModalEdit"
            :id_encuesta="encuestaEditId"
          ></sorteos-edit-modal>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalEditLive"
      ></button>
    </div>
  
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import Loading from "vue-loading-overlay";
import MultipleChoice from "../../../components/encuestas/multipleChoice.vue";
import FooterT from "../../../components/footer/footerT.vue";
import NavBarEvento from "../../../components/header/navBarEvento.vue";
import TiposEncuestasIndex from "../../../components/indexComps/tiposEncuestasIndex.vue";
import NubeDePalabrasAdd from "../../../components/live/encuestas/nubeDePalabras/nubeDePalabrasAdd.vue";
import SorteosAdd from "../../../components/live/encuestas/sorteos/sorteosAdd.vue";
import SorteosEditModal from "../../../components/live/encuestas/sorteos/sorteosEditModal.vue";
import DiaHoraAdd from "../../../components/live/encuestas/diaHora/diaHoraAdd.vue";
import QyaAdd from "../../../components/live/encuestas/qya/qyaAdd.vue";

export default {
  layout: "live",
  middleware: "miauth",
  components: {
    MultipleChoice,
    Loading,
    NavBarEvento,
    FooterT,
    TiposEncuestasIndex,
    NubeDePalabrasAdd,
    SorteosAdd,
    SorteosEditModal,
    DiaHoraAdd,
    QyaAdd,
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
      title: "Event - " + this.$route.params.cod + " - Resultapp",
    };
  },
  data() {
    return {
      dropdownAddPoll: false,
      arrayEncuestas: [],
      eventCod: "",
      arrayMostrar: false,
      isLoading: true,
      eventName: "",
      eventModo: "",
      eventStatus: 0,
      eventT: false,
      opcionesPredeterminadas: true,
      eventFecha: "",
      encuestaEditId: 0,
    };
  },

  methods: {
    duplicarEvento(){
          this.$swal({
                type: "info",
                title: "¿Estas seguro que quieres duplicar este evento ? ",
                html: "Esto creará una copia de tus encuestas, pero sin las operaciones realizadas en ella",
                showCancelButton: true,
                confirmButtonText: `Si aceptar`,
              }).then((result) => {
                if (result.value) {
                  this.crearEventoDuplicado();
                }
              });
    },
    async crearEventoDuplicado(){
        var dataUser = this.$cookies.get("r_user");
      var nameEvento = dataUser.username;
          await this.$axios
        .$post("duplicar_evento_by_admin", {
          codigo: this.$route.params.cod,
          titulo: nameEvento
        }).then((response) => {
          console.log(response)
          this.$router.push({name: "event-cod", params:{cod: response.codigo}})
        }).catch(({response}) => {
             console.log(response)
        })
    }, 
    scrollTo() {
      let element = document.getElementById("scrollAqui");
      element.scrollIntoView(false);
    },
    cerrarModalEdit() {
      this.encuestaEditId = 0;
      var root = document.getElementsByTagName("html")[0]; 
      root.classList.remove("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.remove("is-active");
      this.getEncuestas();
    },
    openModalEdit(id) {
      this.encuestaEditId = id;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.add("is-active");
    },
    closeModalEditLive() {
      this.encuestaEditId = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.remove("is-active");
    },
    actualizarArray() {

      this.getEncuestas();
    },

    deleteEncuestaByClickId(val) {
      if (val.id_encuesta == 0) {
        this.arrayEncuestas.splice(val.index, 1);
        if (this.arrayEncuestas.length == 0) {
          this.opcionesPredeterminadas = true;
        }
      } else {
        this.$swal({
          title: "¿Estas seguro que quieres borrar esta encuesta ? ",
          html: "Se perderan todas las operaciones realizadas en ella",
          showCancelButton: true,
          confirmButtonText: `Si borrar`,
        }).then((result) => {
          if (result.value) {
            this.isLoading = true
            this.deleteEncuestaById(val.id_encuesta);
          }
        });
      }
    },
    async deleteEncuestaById(id) {
      await this.$axios
        .$post("delete_poll_simple_live_by_id", {
          id: id,
          codigo: this.$route.params.cod,
        })
        .then((response) => {
          if (response.status != "error") {
            this.isLoading = false
             this.getEncuestas();
            if (this.arrayEncuestas.length == 0) {
              this.opcionesPredeterminadas = true;
            }
          } else {
            alert("ocurrio un error quizas algo mal en tus datos");
             this.isLoading = false
          }
        })
        .catch(({ response }) => {
           this.isLoading = false
          console.log(response);
        });
    },

    activarLoader() {
      this.isLoading = true;
    },
    createPoll(id) {
      this.addNewEncuesta(id);
    },
    guardarEvento() {
      console.log(this);
      for (var i = 0; i < this.arrayEncuestas.length; i++) {
        console.log(this.$refs["encuesta_" + i][0].guardarOpciones());
      }
    },
    clickHideNewEn() {
      this.dropdownAddPoll = false;
    },
    moveArrayItemToNewIndex(arr, old_index, new_index) {
      console.log("index viejo", old_index);
      console.log("index nuevo", new_index);
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    },
    async moverArriba(val) {
      if (val.id_encuesta == 0) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes guardar primero la encuesta",
        });
        return false;
      }
      var index = val.index;
      if (index > 0) {
        var posicionVieja = index;
        var posicionNueva = index - 1;

        var idEncuestaVieja = this.arrayEncuestas[posicionVieja]["idEcuesta"];
        var idEncuestaNueva = this.arrayEncuestas[posicionNueva]["idEcuesta"];

        console.log("id viejo", idEncuestaVieja);
        console.log("id nuevo", idEncuestaNueva);

        this.cambiarposiciones(
          idEncuestaVieja,
          idEncuestaNueva,
          posicionVieja,
          posicionNueva
        );
      }
    },

    async cambiarposiciones(
      idEncuestaVieja,
      idEncuestaNueva,
      posicionVieja,
      posicionNueva
    ) {
      this.isLoading = true;
      await this.$axios
        .$post("mover_arriba_posicion_encuesta", {
          idEncuestaVieja: idEncuestaVieja,
          idEncuestaNueva: idEncuestaNueva,
          posicionVieja: posicionVieja + 1,
          posicionNueva: posicionNueva + 1,
        })
        .then((response) => {
          if (response.status == 1) {
            this.arrayEncuestas = [];
            this.getEncuestas();
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    moverAbajo(val) {
      if (val.id_encuesta == 0) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes guardar primero la encuesta",
        });
        return false;
      }
      var index = val.index;
      if (index + 1 < this.arrayEncuestas.length) {
        var posicionVieja = index;
        var posicionNueva = index + 1;

        var idEncuestaVieja = this.arrayEncuestas[posicionVieja]["idEcuesta"];
        var idEncuestaNueva = this.arrayEncuestas[posicionNueva]["idEcuesta"];

        console.log("id viejo", idEncuestaVieja);
        console.log("id nuevo", idEncuestaNueva);

        this.cambiarposiciones(
          idEncuestaVieja,
          idEncuestaNueva,
          posicionVieja,
          posicionNueva
        );
      }
    },
    addNewEncuesta(val) {
      if(this.$store.state.premium == 0){
            if(this.arrayEncuestas.length >=5){
          this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Solo puedes crear 5 encuestas con el plan Limitado',
                   footer: '<a href="/upgrade" style="color:#59b1ff">Actualiza al Plan Pro aquí</a>'
                  })
                  return false
      }
      
      }

      

     
              this.opcionesPredeterminadas = false;
      this.dropdownAddPoll = false;
      if (val == 1) {
        this.arrayEncuestas.push({
          tipo: 1,
          idEcuesta: 0,
          pregunta: "",
          opciones: [
            { id: 0, opcion: "" },
            { id: 0, opcion: "" },
          ],
          opciones2: [
            { id: 0, opcion: "" },
            { id: 0, opcion: "" },
          ],
        });
      }

      if (val == 2) {
        this.arrayEncuestas.push({
          tipo: 2,
          idEcuesta: 0,
          pregunta: "",
        });
      }

      if (val == 3) {
        this.arrayEncuestas.push({
          tipo: 3,
          idEcuesta: 0,
          pregunta: "",
          participantes: [],
          ganadores: [],
          premios: 1,
        });
      }

      if (val == 4) {
        this.arrayEncuestas.push({
          tipo: 4,
          idEcuesta: 0,
          pregunta: "",
        });
      }

      if (val == 5) {
        this.arrayEncuestas.push({
          tipo: 5,
          idEcuesta: 0,
          pregunta: "",
        });
      }

      let element = document.getElementById("scrollAqui");
      element.scrollIntoView(false);
      


    
    },

    async publicarEvento() {
        var candadoViejo = this.$store.state.candadoModoLive;

      var candado = !this.$store.state.candadoModoLive;
      this.$store.commit("setcandadoModoLive", candado);
      if (candadoViejo == 1) {
        this.$store.commit("seteventLiveMode", 0);
      }
      //y aparte cambiar el resultado en la db
      const response = await this.$axios.$post("publicar_evento", {
        publicarDesactivar: candadoViejo,
        codigo: this.$route.params.cod,
      });
    },


    async activarEvento(val) {
       this.$store.commit("setisLoading", true)
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
         this.$store.commit("setisLoading", false)
      }
    },

    async getEncuestas() {
      this.isLoading = true
      this.arrayEncuestas = [];
      await this.$axios
        .$get("get_encuestas_event?codigo=" + this.$route.params.cod)
        .then((response) => {
          console.log(response);
         
          this.$store.commit("setisLoading", false)
          this.eventName = response.eventName;
          this.eventStatus = response.eventStatus;
          this.eventModo = response.eventModo;
          this.eventFecha = response.fecha;

          this.$store.commit("seteventLiveMode", response.eventModo);
         this.$store.commit("setcandadoModoLive", response.eventStatus);

          console.log(this.eventStatus);
          this.eventT = true;
          if (response.status == 1) {
            this.arrayEncuestas = response.misencuestas;
            if (response.misencuestas.length > 0) {
              this.opcionesPredeterminadas = false;
            } else {
              this.opcionesPredeterminadas = true;
            }
          }
           this.isLoading = false;
        })
        .catch(({ response }) => {
          this.isLoading = false
          console.log(response);
        });
    },
  },
  async mounted() {
    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.eventCod = this.$route.params.cod;
    console.log(this.eventCod);

    var User = this.$store.state.p;
    console.log("usuario", User);
    var codigo = this.$route.params.cod;
    this.socket = this.$nuxtSocket({
      channel: "/",
    });

    console.log("socket", this.socket);

    this.socket.emit(
      "joinRoom",
      {
        username: User,
        room: codigo+"_admin",
      },
      (resp) => {}
    );

    this.socket.on("activarModoPresentacion", (data) => {
      console.log("llego e modo stop presentacion", data)
        if(data.modo == 0){
          this.$store.commit("seteventLiveMode", 0);
        this.$store.commit("setcandadoModoLive", 0);
        }
          if(data.modo == 1){
          this.$store.commit("seteventLiveMode", 1);
        this.$store.commit("setcandadoModoLive", 1);
        }
    });

       this.socket.on("cambiarStatusEvent", (data) => {
      console.log("llego e cambiarStatusEvent", data)
        if(data.status == 0){
        this.$store.commit("setcandadoModoLive", 0);
        this.$store.commit("seteventLiveMode", 0);
        }
          if(data.status == 1){
        this.$store.commit("setcandadoModoLive", 1);
        }
    });

    

    await this.getEncuestas();

    var type = this.$route.query.type;
    if (type) {
      console.log("existe type");
      if (type == 1) {
        this.addNewEncuesta(1);
      }
      if (type == 2) {
        this.addNewEncuesta(2);
      }
      if (type == 3) {
        this.addNewEncuesta(3);
      }
      if (type == 4) {
        this.addNewEncuesta(4);
      }
      if (type == 5) {
        this.addNewEncuesta(5);
      }
    } else {
      console.log("no existe type");
    }
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style>
</style>
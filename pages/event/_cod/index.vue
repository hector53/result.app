<template>
  <div>
    <nav-bar-evento @activarLoader="activarLoader" v-if="eventT" :eventModo="eventModo" :eventStatus="eventStatus" @guardarEvento="guardarEvento"></nav-bar-evento>
    <nav-bar-event v-if="eventT" :eventName="eventName" :eventFecha="eventFecha" @addNewEncuesta="addNewEncuesta" ></nav-bar-event>
    <section
      class="section-hero"
      style="padding: 5px; margin-bottom: 40px; min-height: 400px"
    >
      <div class="container">
        <loading :active="isLoading" color="#59b1ff" loader="dots" />
        <tipos-encuestas-index @addNewEncuesta="addNewEncuesta" v-if="opcionesPredeterminadas && eventT" @createPoll="createPoll" ></tipos-encuestas-index>
        <div v-for="(item, index) in arrayEncuestas" :key="index">
          <multiple-choice
            :ref="'encuesta_'+index"
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
          :ref="'encuesta_'+index"
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
            :ref="'encuesta_'+index"
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

       


        </div>
      </div>
    </section>
  
<div id="modalEditEncuestaLive" class="modal">
      <div class="modal-background" @click="closeModalEditLive"></div>
      <div class="modal-content">
        <div class="box" style="text-align: left">
        <sorteos-edit-modal v-if="encuestaEditId != 0"
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
      <footer-t id="scrollAqui"></footer-t>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import MultipleChoice from "../../../components/encuestas/multipleChoice.vue";
import FooterT from '../../../components/footer/footerT.vue';
import NavBarEvento from '../../../components/header/navBarEvento.vue';
import TiposEncuestasIndex from '../../../components/indexComps/tiposEncuestasIndex.vue';
import NubeDePalabrasAdd from '../../../components/live/encuestas/nubeDePalabras/nubeDePalabrasAdd.vue';
import SorteosAdd from '../../../components/live/encuestas/sorteos/sorteosAdd.vue';
import SorteosEditModal from '../../../components/live/encuestas/sorteos/sorteosEditModal.vue';

export default {
  layout: "live",
  middleware: "miauth",
  components: { MultipleChoice, Loading, NavBarEvento, FooterT,
   TiposEncuestasIndex, NubeDePalabrasAdd, SorteosAdd,
    SorteosEditModal,
     },
  head() {
      return {
        title: 'Event - '+this.$route.params.cod+' - Resultapp',
       
      }
    },
  data() {
    return {
      dropdownAddPoll: false,
      arrayEncuestas: [],
      eventCod: "",
      arrayMostrar: false,
      isLoading: true,
      eventName: '', 
      eventModo: '',
      eventStatus: 0, 
      eventT: false, 
      opcionesPredeterminadas: true, 
      eventFecha: '',
       encuestaEditId: 0
    };
  },

  methods: {
  scrollTo(){
    let element = document.getElementById("scrollAqui");
    element.scrollIntoView(false);

  },
    cerrarModalEdit(){
this.encuestaEditId = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.remove("is-active");
        this.getEncuestas()
    },
    openModalEdit(id){
      this.encuestaEditId = id;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.add("is-active");
    },
    closeModalEditLive(){
this.encuestaEditId = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.remove("is-active");
    },
    actualizarArray(){  
      this.getEncuestas()
      },

deleteEncuestaByClickId(val){
    if(val.id_encuesta == 0){
      this.arrayEncuestas.splice(val.index,1)
      if(this.arrayEncuestas.length == 0){
        this.opcionesPredeterminadas = true
      }
    }else{
           this.$swal({
                title: '¿Estas seguro que quieres borrar esta encuesta ? ',
                html: 'Se perderan todas las operaciones realizadas en ella',
                showCancelButton: true,
                confirmButtonText: `Si borrar`,
              }).then((result) => {
                  if(result.value){
                      this.deleteEncuestaById(val.id_encuesta)
                  }
              })
    }
  
    },
async deleteEncuestaById(id){
    const response = await this.$axios.$post("delete_poll_simple_live_by_id", {
                        id: id,
                        codigo: this.$route.params.cod
                        });
                    if(response.status !='error'){
                      await  this.getEncuestas()
                      if(this.arrayEncuestas.length == 0){
        this.opcionesPredeterminadas = true
      }
                    }else{
                      alert("ocurrio un error quizas algo mal en tus datos")
                    }
},

    activarLoader(){
      this.isLoading = true
    },
    createPoll(id){
      this.addNewEncuesta(id)
    },
    guardarEvento(){
      console.log(this)
      for(var i=0; i<this.arrayEncuestas.length; i++){
        console.log(this.$refs['encuesta_'+i][0].guardarOpciones())
      }
    },
    clickHideNewEn(){
      this.dropdownAddPoll = false
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
      if(val.id_encuesta == 0){
          this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes guardar primero la encuesta",
        });
        return false;
      }
      var index = val.index
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
      const response = await this.$axios.$post(
        "mover_arriba_posicion_encuesta",
        {
          idEncuestaVieja: idEncuestaVieja,
          idEncuestaNueva: idEncuestaNueva,
          posicionVieja: posicionVieja + 1,
          posicionNueva: posicionNueva + 1,
        }
      );
      if (response.status == 1) {
        this.arrayEncuestas = [];
        this.getEncuestas();
      }
    },
    moverAbajo(val) {
       if(val.id_encuesta == 0){
          this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes guardar primero la encuesta",
        });
        return false;
      }
      var index = val.index
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
      this.opcionesPredeterminadas = false
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
          premios: 1
        });

      }

          let element = document.getElementById("scrollAqui");
    element.scrollIntoView(false);
    },

    async getEncuestas() {
      this.arrayEncuestas = []
      await this.$axios
        .$get("get_encuestas_event?codigo=" + this.$route.params.cod)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
           this.eventName = response.eventName
            this.eventStatus = response.eventStatus
            this.eventModo = response.eventModo
            this.eventFecha = response.fecha





            
            console.log(this.eventStatus)
            this.eventT = true
          if (response.status == 1) {
            this.arrayEncuestas = response.misencuestas;
            if(response.misencuestas.length > 0){
                this.opcionesPredeterminadas = false
            }else{
              this.opcionesPredeterminadas = true
            }
           
          }
        });
    },
  },
  async mounted() {
   
    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.eventCod = this.$route.params.cod;
    console.log(this.eventCod);

  await  this.getEncuestas();

   var type = this.$route.query.type
    if(type){
        console.log("existe type")
        if(type == 1){
            this.addNewEncuesta(1)
        }
         if(type == 2){
            this.addNewEncuesta(2)
        }
         if(type == 3){
            this.addNewEncuesta(3)
        }
    }else{
      console.log("no existe type")
    }
  },
    directives: {
    ClickOutside
  }
};
</script>
<style>

</style>
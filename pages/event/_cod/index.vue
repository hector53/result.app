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
            @moverArriba="moverArriba"
            @moverAbajo="moverAbajo"
            @eliminarEncuesta="deleteEncuestaByClickId"
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
          ></nube-de-palabras-add>
        </div>
      </div>
    </section>

      <footer-t></footer-t>
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

export default {
  layout: "live",
  middleware: "miauth",
  components: { MultipleChoice, Loading, NavBarEvento, FooterT, TiposEncuestasIndex, NubeDePalabrasAdd },
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
      eventFecha: ''
    };
  },

  methods: {
    

deleteEncuestaByClickId(id){
       this.$swal({
                title: '¿Estas seguro que quieres borrar esta encuesta ? ',
                html: 'Se perderan todas las operaciones realizadas en ella',
                showCancelButton: true,
                confirmButtonText: `Si borrar`,
              }).then((result) => {
                  if(result.value){
                      this.deleteEncuestaById(id)
                  }
              })
    },
async deleteEncuestaById(id){
    const response = await this.$axios.$post("delete_poll_simple_live_by_id", {
                        id: id,
                        codigo: this.$route.params.cod
                        });
                    if(response.status !='error'){
                        this.getEncuestas()
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
    async moverArriba(index) {
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
    moverAbajo(index) {
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
            }
           
          }
        });
    },
  },
  mounted() {
      console.log(this.$route)
    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.eventCod = this.$route.params.cod;
    console.log(this.eventCod);

    this.getEncuestas();
  },
    directives: {
    ClickOutside
  }
};
</script>
<style>

</style>
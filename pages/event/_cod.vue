<template>
  <div>
    <nav-bar-evento v-if="eventT" :eventStatus="eventStatus" @guardarEvento="guardarEvento"></nav-bar-evento>
    <div class="div-block-4">
      <div class="columns" style="max-width: 940px; margin: auto">
        <div class="column is-6" style="padding: 0">
          <ul role="list" class="list-3">
            <li class="list-item-4">
               <div
            class="dropdown"
            :class="{ 'is-active': dropdownAddPoll }"
            style="    margin-left: 10px;    padding: 0;    height: 100%;"  >
            <div class="dropdown-trigger" style="    display: flex;    justify-content: center;    align-items: center;">
              <a
              class="addPoll"
                @click="dropdownAddPoll = !dropdownAddPoll"
                v-click-outside="clickHideNewEn"
                aria-haspopup="true"
                aria-controls="dropdown-menu2"
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </a>
            </div>
            <div
              class="dropdown-menu dropMover"
              id="dropdown-menu2"
              role="menu"
            >
              <div class="dropdown-content">
                <a href="#" @click="addNewEncuesta(1)" class="dropdown-item">
                  Multiple Choice
                </a>
              </div>
            </div>
          </div>
            
            </li>
            <li class="list-item-4">
              <div class="text-b4">
                <span class="text-span">evento:</span> 
                <span>{{eventName}}</span>
              </div>
            </li>
            <li class="list-item-4">
              <div class="text-b4">
                <span class="text-span">calendario:</span> 
                <span>06/06/2021</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="column is-6" style="padding: 0">
          <ul role="list" class="list-4">
            <li class="list-item-6">
              <img
                src="https://uploads-ssl.webflow.com/60bce19845cbc34d57afc5a4/60be1b4ea72caeed680bbd05_settings%20(1).png"
                loading="lazy"
                alt=""
                class="image-4"
              />
            </li>
            <li class="list-item-6"><div>Compartir</div></li>
            <li class="list-item-6"><div>Integraciones</div></li>
            <li class="list-item-6"><div>Resultados</div></li>
          </ul>
        </div>
      </div>
    </div>

    <section
      class="section-hero"
      style="padding: 5px; margin-bottom: 40px; min-height: 500px"
    >
      <div class="container">
        <loading :active="isLoading" color="#59b1ff" loader="dots" />

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
          ></multiple-choice>
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
import MultipleChoice from "../../components/encuestas/multipleChoice.vue";
import FooterT from '../../components/footer/footerT.vue';
import NavBarEvento from '../../components/header/navBarEvento.vue';

export default {
  layout: "dashboardEvent",
  middleware: "miauth",
  components: { MultipleChoice, Loading, NavBarEvento, FooterT },
  data() {
    return {
      dropdownAddPoll: false,
      arrayEncuestas: [],
      eventCod: "",
      arrayMostrar: false,
      isLoading: true,
      eventName: '', 
      eventStatus: 0, 
      eventT: false
    };
  },

  methods: {
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
    },

    async getEncuestas() {
      await this.$axios
        .$get("get_encuestas_event?codigo=" + this.$route.params.cod)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
           this.eventName = response.eventName
            this.eventStatus = response.eventStatus
            console.log(this.eventStatus)
            this.eventT = true
          if (response.status == 1) {
            this.arrayEncuestas = response.misencuestas;
           
          }
        });
    },
  },
  mounted() {
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

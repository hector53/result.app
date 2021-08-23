<template>
  <div>
          <loading :active="isLoading" color="#59b1ff" />
    <section class="section-hero" style="padding: 5px">
      <div class="container">
        <div class="div-block-5">
          <a href="/" class="link">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            {{ $store.state.idioma.back }}</a
          >
        </div>
        <h1 class="headingM has-text-left">
          {{ $store.state.idioma.dashboardTitle }}
        </h1>
        <p class="hero-subhead has-text-left">
          {{ $store.state.idioma.dashboardSubtitle }}
        </p>

        <div class="columns p-2">
          <div class="column">
            <div class="pollBlock cubreDiv">
              <div class="pollIcon">
                <i class="fa fa-bars faIconPoll" aria-hidden="true"></i>
              </div>
              <h3 class="pollNumber" v-text="cantEncuestas"></h3>
              <p class="pollsText">
                {{ $store.state.idioma.dashboardStatisTitle1 }}
              </p>
            </div>
          </div>
          <div class="column">
            <div class="pollBlock cubreDiv">
              <div class="pollIcon">
                <i class="fa fa-check faIconPoll" aria-hidden="true"></i>
              </div>
              <h3 class="pollNumber" v-text="cantVotos"></h3>
              <p class="pollsText">
                {{ $store.state.idioma.dashboardStatisTitle2 }}
              </p>
            </div>
          </div>
          <div class="column"></div>
        </div>

        <h1
          class="headingM has-text-left" style="margin-bottom: 40px;  margin-top: 40px;  display: flex;    justify-content: space-between;        "    >
          <span>
            {{ $store.state.idioma.dashboardTitle2 }}
          </span>

          <button class="buttonN blue" @click="btnAddEncuesta" >
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </h1>
        <div v-for="(item, index) in misEncuestas" :key="index">
          <div class="CubOption cubreDiv" @click="abrirEvento(item.codigo)">
            <div class="columns">
              <div class="column is-flex is-justify-content-space-between">
                <div class="cubreIconandOption is-flex has-text-left">
                  <span
                    for="Opción "
                    class="radio-button-label w-form-label"
                    v-text="item['titulo']"
                  ></span>
                </div>
                <div class="item_pregunta_top_like">
                  <span>
                    {{ item["cantVoto"] + " " + $store.state.idioma.votes }}
                  </span>
                  <span>
                    <i
                      class="fa fa-pencil-square-o iconEditQyA"
                      aria-hidden="true"
                      @click.stop="editEventNotRegistered(item)"
                    ></i>
                    &nbsp;&nbsp;
                    <i
                      class="fa fa-trash iconEditQyA"
                      @click.stop="
                        deleteEncuestaByClickId(item.id, item.id_encuesta)
                      "
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-flex is-justify-content-space-between">
                <div
                  class="cubreResult is-flex is-justify-content-space-between"
                >
                  <span v-text="item['fecha']"></span>
                  <span class="tipoEncuestaEventNotRegister">{{
                    tipoEncuestas[item["tipo"] - 1]
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal v-model="modalEditEventUserNotRegistered" :width="600">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h4 class="has-text-left">Editar</h4>
            <encuesta-simple-edit-not-registered
              @cerrarModalEdit="cerrarModalEdit"
              v-if="idEventEdit > 0 && tipoEncuestaEdit == 1"
              :id_encuesta="encuestaEditId"
              :id_evento="idEventEdit"
            ></encuesta-simple-edit-not-registered>

            <nube-edit-not-registered
              @cerrarModalEdit="cerrarModalEdit"
              v-if="idEventEdit > 0 && tipoEncuestaEdit == 2"
              :id_encuesta="encuestaEditId"
              :id_evento="idEventEdit"
            ></nube-edit-not-registered>

            <dia-hora-edit-user-not-registered
              @cerrarModalEdit="cerrarModalEdit"
              v-if="idEventEdit > 0 && tipoEncuestaEdit == 4"
              :id_encuesta="encuestaEditId"
              :id_evento="idEventEdit"
            ></dia-hora-edit-user-not-registered>
          </div>
        </div>
      </div>
    </b-modal>


      <b-modal v-model="modalAddNew" :width="600">
      <div class="card">
        <div class="card-content">
          <div class="content">
           <tipos-encuestas-modal
            @addNewEncuesta="addNewEncuesta"
          ></tipos-encuestas-modal>
          </div>
        </div>
      </div>
    </b-modal>

   
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import TiposEncuestasModal from '../../components/indexComps/tiposEncuestasModal.vue';
import DiaHoraEditUserNotRegistered from "../../components/live/encuestas/diaHora/diaHoraEditUserNotRegistered.vue";
import EncuestaSimpleEditNotRegistered from "../../components/live/encuestas/encuestaSimpleEditNotRegistered.vue";
import nubeEditNotRegistered from "../../components/live/encuestas/nubeDePalabras/nubeEditNotRegistered.vue";
export default {
  components: {
    Loading,
    nubeEditNotRegistered,
    EncuestaSimpleEditNotRegistered,
    DiaHoraEditUserNotRegistered,
    TiposEncuestasModal,
  },
  data() {
    return {
      misEncuestas: [],
      cantVotos: 0,
      cantEncuestas: 0,
      idEventEdit: 0,
      tipoEncuestaEdit: 0,
      encuestaEditId: 0,
      modalEditEventUserNotRegistered: false,
      tipoEncuestas: [
        this.$store.state.idioma.pollHeadBlock,
        this.$store.state.idioma.cloudHeadBlock,
        this.$store.state.idioma.giveHeadBlock,
        this.$store.state.idioma.dateHeadBlock,
        this.$store.state.idioma.qaHeadBlock,
      ],
      isLoading: true, 
      modalAddNew: false
      
    };
  },

  methods: {
    btnAddEncuesta(){
        this.modalAddNew = true
    },
    addNewEncuesta(val){

      if(val == 1 || val == 2 || val == 4){
              if(this.misEncuestas.length >= 3){
            
               this.$swal({
                type: 'error',
                title: 'Oops...',
                text: 'Solo puedes crear 3 encuestas con el plan sin registro',
                footer: '<a href="/singup" style="color:#59b1ff">Aún no tienes cuenta ? registrate aquí</a>'
              })
          }else{
                if(val == 1){
                  this.$router.push({name: "new-event-multiple-choice"})
                }
                 if(val == 2){
                  this.$router.push({name: "new-event-cloud-words"})
                }
                 if(val == 4){
                  this.$router.push({name: "new-event-date"})
                }
          }
      }
      
    },
    cerrarModalEdit() {
      this.modalEditEventUserNotRegistered = false;
      this.getEvents();
    },
    editEventNotRegistered(item) {
      this.idEventEdit = item.id;
      this.tipoEncuestaEdit = item.tipo;
      this.encuestaEditId = item.id_encuesta;
      this.modalEditEventUserNotRegistered = true;
    },

    abrirEvento(codigo) {
      let routeData = this.$router.resolve({
        name: "p-cod",
        params: { cod: codigo },
      });
      window.open(routeData.href, "_blank");
    },

    deleteEncuestaByClickId(id, codigo) {
      this.$swal({
        title: "¿Estas seguro que quieres borrar esta encuesta ? ",
        html: "Se perderan todas las votaciones realizadas en ella",
        showCancelButton: true,
        confirmButtonText: `Si borrar`,
      }).then((result) => {
        if (result.value) {
          this.deleteEncuestaById(id, codigo);
        }
      });
    },
    async deleteEncuestaById(id, codigo) {
      await this.$axios
        .$post("delete_poll_by_id_not_registered", {
          id_event: id,
          id_encuesta: codigo,
          p: this.$store.state.p,
        })
        .then((response) => {
          if (response.status == 1) {
            this.getEvents();
          }
        })
        .catch(({ response }) => {});
    },

    async getEvents() {
     
      var cookieNotUser = this.$cookies.get("_r_u");

      await this.$axios
        .$get("events_not_registered?cookieNotUser=" + cookieNotUser)
        .then((response) => {
          console.log(response)
          if(response.status == 1){
              this.misEncuestas = response.encuestas;
          this.cantEncuestas = response.cantEncuestas;
          this.cantVotos = response.cantVotos;
          }else{
            this.misEncuestas = []
          }
          
          this.isLoading = false
        }).catch(({response}) => {
          this.isLoading = false
          console.log(response)
        })
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>

<template>
  <div>
    <loading :active="isLoading" color="#59b1ff" />
    <section class="section-hero" style="padding: 5px; min-height: 100vh">
      <div class="container">
        <div class="div-block-5">
          <a href="/" class="link">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            {{ $store.state.idioma.back }}</a
          >
        </div>

        <div id="modalEvento" class="modal">
          <div class="modal-background" @click="closeModalEvent"></div>
          <div class="modal-content">
            <div class="box" style="text-align: left">
              <h1 class="headingM has-text-left">Evento nuevo</h1>
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="tituloEvento"
                    placeholder="Título del evento"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Descripción (opcional)</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    v-model="descripcionEvento"
                    placeholder="Breve descripción"
                  ></textarea>
                </div>
              </div>

              <div class="button-group" style="margin-bottom: 20px">
                <button class="buttonN blue" @click="crearEvento">
                  Crear evento
                </button>
                <button class="buttonN" @click="closeModalEvent">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
          <button
            class="modal-close is-large"
            aria-label="close"
            @click="closeModalEvent"
          ></button>
        </div>

        <p class="hero-subhead has-text-left">
          {{ $store.state.idioma.dashboardSubtitle }}
        </p>

        <div class="columns p-2">
          <div class="column">
            <div class="pollBlock cubreDiv">
              <div class="pollIcon">
                <i class="fa fa-bars faIconPoll" aria-hidden="true"></i>
              </div>
              <h3 class="pollNumber" v-text="cantEventos"></h3>
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
              <h3 class="pollNumber" v-text="cantParticipaciones"></h3>
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

          <button class="buttonN blue" @click="crearEvento">
            <i class="fa fa-plus" aria-hidden="true"></i> AGREGAR NUEVO EVENTO
          </button>
        </h1>
        <div v-for="(item, index) in misEventos" :key="index">
          <a
            @click="abrirEvento(item['codigo'], item['disabled'])"
            style="color: #222"
            :class="{'noCursor': item['disabled']==1 }"
          >
            <div class="CubOption cubreDiv" :class="{'noCursor': item['disabled']==1 }">
              <div class="columns">
                <div class="column is-flex is-justify-content-space-between">
                  <div class="cubreIconandOption is-flex has-text-left">
                    <span
                      for="Opción "
                      class="radio-button-label w-form-label"
                      v-text="item['titulo']"
                    ></span>
                  </div>
                  <div
                    class="text-block-12"
                    v-text="item['cantVoto'] + ' ' + $store.state.idioma.votes"
                  ></div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-flex is-justify-content-space-between">
                  <div
                    class="cubreResult is-flex is-justify-content-space-between"
                  >
                    <span v-text="item['fecha']"></span>
                    <span v-if="item['disabled'] == 1">Disabled</span>
                    <div>
                       <i
                      class="fa fa-pencil-square-o iconEditQyA"
                      aria-hidden="true"
                    ></i>
                    &nbsp;&nbsp;
                    <i
                      class="fa fa-trash iconEditQyA"
                      aria-hidden="true"
                      @click.stop="eliminarEvento(item['codigo'])"
                    ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  middleware: "miauth",
 
  head() {
    return {
      title: "Dashboard - Resultapp",
    };
  },
  data() {
    return {
      misEventos: [],
      cantParticipaciones: 0,
      cantEventos: 0,
      tituloEvento: "",
      descripcionEvento: "",
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    abrirEvento(codigo, disabled){
        if(disabled == 0){
            this.$router.push({name: "event-cod", params: { cod: codigo } })
        }else{

           this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Este evento esta desactivado solo puedes tener 5 eventos con el plan limitado',
              footer: '<a href="/upgrade" style="color:#59b1ff">Actualiza al Plan Pro aquí</a>'
              })
        }
    },
     eliminarEvento(cod){
        this.$swal({
                type: "error",
                title: "¿Estas seguro que quieres borrar este evento ? ",
                html: "Se perderan todas las operaciones realizados en el",
                showCancelButton: true,
                confirmButtonText: `Si borrar`,
              }).then((result) => {
                if (result.value) {
                  this.$store.commit("setisLoading", true)
                  this.borrarEvento(cod);
                }
              });
    },
    async borrarEvento(cod){
         await this.$axios
        .$post("borrar_evento_by_admin", {
          codigo: cod,
        }).then((response) => {
          if(response.status == 1){
              console.log(response)
              this.getEvents()
          }
          
        })
    },
    generateRandomString(num) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result1 = "";
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
        result1 += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result1;
    },
    openModalEvent() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document.getElementById("modalEvento").classList.add("is-active");
    },
    closeModalEvent() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document.getElementById("modalEvento").classList.remove("is-active");
    },
    modalReset() {
      this.tituloEvento = "";
      this.descripcionEvento = "";
    },
    async getEvents() {
      await this.$axios
        .$get("events_user_registered")
        .then((response) => {
          console.log("get eventos", response)
          if(response.status == 1){
              console.log(response);
          this.misEventos = response.eventos;
          this.cantEventos = response.cantEventos;
          this.cantParticipaciones = response.cantVotos;s
          }else{
              this.misEventos = []
          this.cantEventos = 0
          this.cantParticipaciones = 0
          }
          
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    async crearEvento() {

          if(this.$store.state.premium == 0){
              if(this.misEventos.length >= 5){
              this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Solo puedes crear 5 eventos con el plan limitado',
              footer: '<a href="/upgrade" style="color:#59b1ff">Actualiza al Plan Pro aquí</a>'
              })
              return false
              }
          }
   
 var dataUser = this.$cookies.get("r_user");
      var nameEvento = dataUser.username;

      this.isLoading = true;

      await this.$axios
        .$post("crear_evento", {
          titulo: nameEvento,
          descripcion: "",
        })
        .then((response) => {
          
          if (response.status != 0) {
         //   this.getEvents();
            this.$router.push("/event/" + response.codigo);
            this.isLoading = false;
          } else {
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Estas haciendo trampa xD",
            });
            this.isLoading = false;
          }
        })
        .catch(({ response }) => {
          this.isLoading = false;
          console.log(response);
        });
      
     
    },
  },
  mounted() {
    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.getEvents();
  },
};
</script>

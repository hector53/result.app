<template>
  <div class="div-block-4">
    <div class="columns" style="max-width: 940px; margin: auto">
      <div class="column is-6" style="padding: 0">
        <ul role="list" class="list-3">
          <li class="list-item-4" v-if="$route.name == 'event-cod'">
            <a
              class="addPoll"
              @click="openModalNewEncuesta"
              v-click-outside="clickHideNewEn"
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
            </a>
          </li>
          <li class="list-item-4" v-else>
            <nuxt-link
              class="addPoll"
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
              :to="{ name: 'event-cod', params: { cod: $route.params.cod } }"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </nuxt-link>
          </li>

          <li class="list-item-4">
            <div class="text-b4">
              <span class="text-span">evento:</span>
              <b-input
                v-model="nombreEvento"
                @blur="cambiarNombre"
                @keyup.enter="cambiarNombre"
              ></b-input>
            </div>
          </li>

          <li class="list-item-4">
            <div class="text-b4">
              <span class="text-span">calendario:</span>
              <b-datetimepicker
                placeholder="Type or select a date..."
                icon="calendar-today"
                :locale="locale"
                v-model="fechaEvento"
                editable
              >
              </b-datetimepicker>
            </div>
          </li>
        </ul>
      </div>

      <div class="column is-6" style="padding: 0">
        <ul role="list" class="list-4">
          <li class="list-item-6">
            <b-dropdown
              position="is-bottom-left"
              append-to-body
              aria-role="menu"
            >
              <template #trigger>
                <img
                  src="https://uploads-ssl.webflow.com/60bce19845cbc34d57afc5a4/60be1b4ea72caeed680bbd05_settings%20(1).png"
                  loading="lazy"
                  alt=""
                  class="image-4"
                />
              </template>

              <b-dropdown-item has-link aria-role="menuitem">
                 <a v-if="$store.state.eventLiveMode == 0" @click="activarEvento(1)" >
                  <i class="fa fa-play" aria-hidden="true" ></i>
                  Iniciar presentación
                </a>
                <a v-else  @click="activarEvento(0)" >
                  <i class="fa fa-stop" aria-hidden="true"></i>
                  Detener presentación
                </a>
              </b-dropdown-item>
              <b-dropdown-item has-link aria-role="menuitem">
                 <a v-if="$store.state.candadoModoLive == 0" @click="publicarEvento" >
                    <i class="fa fa-unlock" aria-hidden="true"></i>
                  Abrir evento
                </a>
                <a v-else @click="publicarEvento" >
                  <i class="fa fa-lock" aria-hidden="true"></i>
                  Cerrar evento
                </a>
              </b-dropdown-item>
              <hr class="dropdown-divider" />
              <b-dropdown-item has-link aria-role="menuitem">
                  <a @click="verEvento">
                   <i class="fa fa-share-square-o" aria-hidden="true"></i>
                    Ver presentación
                  </a>
                </b-dropdown-item>
                <b-dropdown-item has-link aria-role="menuitem" v-if="$route.name == 'event-cod-results' && $store.state.premium == 2 ">
                  <a @click="generatePdf">
                   <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                    Exportar a PDF
                  </a>
                </b-dropdown-item>
                <hr class="dropdown-divider" />
                <b-dropdown-item has-link aria-role="menuitem">
                  <a @click="duplicarEvento">
                  <i class="fa fa-clone" aria-hidden="true"></i>
                    Duplicar evento
                  </a>
                </b-dropdown-item>
                 <b-dropdown-item has-link aria-role="menuitem">
                  <a @click="eliminarEvento">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                    Eliminar evento
                  </a>
                </b-dropdown-item>

            </b-dropdown>
          </li>

          <a @click="openModalCompartir"
            ><li class="list-item-6 linkEvent"><div>Compartir</div></li></a
          >
          <a
            ><li class="list-item-6 linkEvent"><div>Integraciones</div></li></a
          >
          <nuxt-link :to="{ name: 'event-cod-results' }"
            ><li
              class="list-item-6 linkEvent"
              :class="{ active: $route.name == 'event-cod-results' }"
            >
              <div>Resultados</div>
            </li></nuxt-link
          >
        </ul>
      </div>
    </div>

    <div id="modalCompartir" class="modal">
      <div class="modal-background" @click="closeModalCompartir"></div>
      <div class="modal-content compartirModal">
        <div class="box" style="text-align: left">
          <h1 class="has-text-left">Compartir</h1>
          <div class="cubreTipoShare">
            <a :href="shareFacebook" target="_blank">
              <i class="fa fa-facebook-official" aria-hidden="true"></i>
              <span>Facebook</span>
            </a>
            <a :href="shareTwitter" target="_blank">
              <i class="fa fa-twitter-square" aria-hidden="true"></i>
              <span>Twitter</span>
            </a>

            <a :href="shareEmail">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span>Correo Electrónico</span>
            </a>
          </div>
          <div class="cubreClicCopiar" @click="copiarUrl">
            <span>{{ copiarUrlText }}</span>
            <div class="cubreInputClicCopiar">
              <input
                type="url"
                ref="inputCopy"
                readonly
                :value="$store.state.urlBase + '/p/' + $route.params.cod"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalCompartir"
      ></button>
    </div>

    <div id="modalAddNewEncuesta" class="modal">
      <div class="modal-background" @click="closeModalNewEncuesta"></div>
      <div class="modal-content">
        <div class="box" style="text-align: center">
          <tipos-encuestas-modal
            @closeModal="closeModalNewEncuesta"
            @addNewEncuesta="addNewEncuesta"
          ></tipos-encuestas-modal>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalNewEncuesta"
      ></button>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import tiposEncuestasModal from "../indexComps/tiposEncuestasModal.vue";

export default {
  components: { tiposEncuestasModal },
  props: ["eventName", "eventFecha"],
  data() {
    return {
      nombreEvento: this.eventName,
      fechaEvento: new Date(this.eventFecha),
      showWeekNumber: false,
      enableSeconds: false,
      hourFormat: undefined, // Browser locale
      locale: undefined, // Browser locale,
      dropdownAddPoll: false,
      arrayEncuestas: [],
      eventCod: "",
      dateEvento: "",
      arrayMostrar: false,
      isLoading: true,
      eventStatus: 0,
      eventT: false,
      copiarUrlText: "Haz clic para copiar la Url",
      shareTwitter:
        "https://twitter.com/intent/tweet?text=Resultapp&amp;url=" +
        this.$store.state.urlBase +
        "/p/" +
        this.$route.params.cod,
      shareFacebook:
        "https://www.facebook.com/sharer/sharer.php?u=" +
        this.$store.state.urlBase +
        "/p/" +
        this.$route.params.cod,
      shareEmail:
        "mailto:?subject=Resultapp&amp;body=Participa en la siguiente encuesta " +
        this.$store.state.urlBase,
    };
  },

  watch: {
    fechaEvento: function (values, oldValues) {
      console.log("guardando fecha nueva", values);
      this.cambiarFecha(values);
    },
  },
  methods: {
    generatePdf(){
      this.$emit("generatePdf")
    },
    
    eliminarEvento(){
        this.$swal({
                type: "error",
                title: "¿Estas seguro que quieres borrar este evento ? ",
                html: "Se perderan todas las operaciones realizados en el",
                showCancelButton: true,
                confirmButtonText: `Si borrar`,
              }).then((result) => {
                if (result.value) {
                  this.$store.commit("setisLoading", true)
                  this.borrarEvento();
                }
              });
    },
    async borrarEvento(){
         await this.$axios
        .$post("borrar_evento_by_admin", {
          codigo: this.$route.params.cod,
        }).then((response) => {
          console.log(response)
          this.$router.push({name: "dashboard"})
        }).catch(({response}) => {
             console.log(response)
        })
    },
     verEvento() {
      // Abrir nuevo tab
      var win = window.open("/event/" + this.$route.params.cod+"/live", "_blank");
      // Cambiar el foco al nuevo tab (punto opcional)
      win.focus();
    },
    duplicarEvento(){
        this.$emit("duplicarEvento")
    },
    async publicarEvento() {
      this.$emit("publicarEvento")
    },
     async activarEvento(val) {
      this.$emit("activarEvento", val)
    },
    async cambiarNombre() {
      await this.$axios
        .$get(
          "cambiar_nombre_evento_by_cod?cod=" +
            this.$route.params.cod +
            "&nombre=" +
            this.nombreEvento
        )
        .then((response) => {
          console.log(response);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    convertDate(val) {
      var date = new Date(val);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + dt + " " + h + ":" + min + ":" + sec;
    },
    async cambiarFecha(fecha) {
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      await this.$axios
        .$get(
          "cambiar_fecha_evento_by_cod?cod=" +
            this.$route.params.cod +
            "&fecha=" +
            this.convertDate(fecha) +
            "&zonaHoraria=" +
            timeZone
        )
        .then((response) => {
          console.log(response);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    convertTZ(date) {
      console.log("convirtiendo");
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(timeZone);
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: timeZone }
        )
      );
    },
    copiarUrl() {
      const el = document.createElement("textarea");
      el.value = this.$store.state.urlBase + "/p/" + this.$route.params.cod;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.copiarUrlText = "Url Copiada";
      this.$refs.inputCopy.select();
    },

    openModalNewEncuesta() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document.getElementById("modalAddNewEncuesta").classList.add("is-active");
    },
    closeModalNewEncuesta() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalAddNewEncuesta")
        .classList.remove("is-active");
    },

    openModalCompartir() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document.getElementById("modalCompartir").classList.add("is-active");
    },
    closeModalCompartir() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document.getElementById("modalCompartir").classList.remove("is-active");
    },

    clickHideNewEn() {
      this.dropdownAddPoll = false;
    },

    addNewEncuesta(val) {
      this.$emit("addNewEncuesta", val);
    },
  },
  mounted() {
    //console.log("vengo del header event", this.eventName);
  },
  directives: {
    ClickOutside,
  },
};
</script>

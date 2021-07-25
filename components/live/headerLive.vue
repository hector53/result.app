<template>
  <div>
    <div id="modalAddEncuestaLive" class="modal">
      <div class="modal-background" @click="closeModalAddLive"></div>
      <div class="modal-content">
        <div class="box" style="text-align: left">
          <encuesta-simple
            @cerrarModal="cerrarModalEncuestaActiva"
            v-if="encuestaActive == 1"
          ></encuesta-simple>

          <nube-de-palabras
            @cerrarModal="cerrarModalEncuestaActiva"
            v-if="encuestaActive == 2"
          ></nube-de-palabras>

          <sorteo-add-modal @cerrarModal="cerrarModalEncuestaActiva"
            v-if="encuestaActive == 3"></sorteo-add-modal>

            <dia-hora-add-modal @cerrarModal="cerrarModalEncuestaActiva"
            v-if="encuestaActive == 4"></dia-hora-add-modal>

           <qya-add-modal @cerrarModal="cerrarModalEncuestaActiva"
            v-if="encuestaActive == 5" ></qya-add-modal>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalAddLive"
      ></button>
    </div>
    <div id="modalEditEncuestaLive" class="modal">
      <div class="modal-background" @click="closeModalEditLive"></div>
      <div class="modal-content">
        <div class="box" style="text-align: left">
          <encuesta-simple-edit
            @cerrarModalEdit="cerrarModalEdit"
            v-if="encuestaEditId > 0 && tipoEncuestaEdit == 1"
            :id_encuesta="encuestaEditId"
          ></encuesta-simple-edit>

          <nube-de-palabras-edit
            @cerrarModalEdit="cerrarModalEdit"
            v-if="encuestaEditId > 0 && tipoEncuestaEdit == 2"
            :id_encuesta="encuestaEditId"
          ></nube-de-palabras-edit>

        <sorteos-edit-modal
        @cerrarModalEdit="cerrarModalEdit"
            v-if="encuestaEditId > 0 && tipoEncuestaEdit == 3"
            :id_encuesta="encuestaEditId"
        ></sorteos-edit-modal>
        <dia-hora-edit
         @cerrarModalEdit="cerrarModalEdit"
            v-if="encuestaEditId > 0 && tipoEncuestaEdit == 4"
            :id_encuesta="encuestaEditId"
        ></dia-hora-edit>

        <qya-edit-modal
         @cerrarModalEdit="cerrarModalEdit"
            v-if="encuestaEditId > 0 && tipoEncuestaEdit == 5"
            :id_encuesta="encuestaEditId"
        ></qya-edit-modal>

        
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalEditLive"
      ></button>
    </div>

    <div class="cubreNavBarPresentacion">
      <div class="navBarLeft">
        <ul role="list" class="listNavBarLeft">
          <li class="list-item-navLeft add"  title="Agregar Encuesta" alt="Agregar Encuesta">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <div class="cubreIconDropdown">
                  <i
                    class="fa fa-plus"
                    aria-hidden="true"
                    style="font-size: 35px"
                    
                  ></i>
                </div>
              </div>
              <div
                class="dropdown-menu dropMover"
                id="dropdown-menu2"
                role="menu"
              >
                <div class="dropdown-content liveNew">
                  <a class="dropdown-item" @click="openModalAddLive(1)">
                    <i class="fa fa-list-ol mr-3" aria-hidden="true"></i><span>Encuesta Simple</span>
                  </a>
                  <a class="dropdown-item" @click="openModalAddLive(5)">
                   <i class="fa fa-comments mr-3" aria-hidden="true"></i> <span>Q & A</span>
                  </a>
                  <a class="dropdown-item" @click="openModalAddLive(2)">
                   <i class="fa fa-cloud mr-3" aria-hidden="true"></i> <span>Nube de Palabras</span>
                  </a>
                  <a class="dropdown-item" @click="openModalAddLive(3)">
                   <i class="fa fa-star mr-3" aria-hidden="true"></i> <span>Sorteos</span>
                  </a>
                  <a class="dropdown-item" @click="openModalAddLive(4)">
                   <i class="fa fa-calendar mr-3" aria-hidden="true"></i> <span>Día y Hora</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li
            class="list-item-navLeft play"
            v-if="$store.state.eventLiveMode == 0"
            @click="activarEvento(1)"
            title="Iniciar Presentación" alt="Iniciar Presentación"
          >
            <img
              src="data:image/png;base64,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"
              class="imageNarBar"
            />
          </li>
          <li class="list-item-navLeft stop" 
          v-else @click="activarEvento(2)"
           title="Detener Presentación" alt="Detener Presentación"
          >
            <img
              src="data:image/png;base64,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"
              class="imageNarBar"
            />
          </li>

          <li class="list-item-navLeft candado" 
           
          @click="cambiarStatus">
            <i
              class="fa fa-unlock"
              v-if="$store.state.candadoModoLive == 1"
              style="font-size: 35px"
               title="Desactivar Evento" alt="Desactivar Evento"
              aria-hidden="true"
            ></i>
            <i
              class="fa fa-lock"
              v-else
              aria-hidden="true"
              style="font-size: 35px"
              title="Activar Evento" alt="Activar Evento"
             
            ></i>
          </li>

          <li class="list-item-navLeft tareas" title="Lista de Encuestas" alt="Lista de Encuestas">
            <div class="dropdown is-hoverable" style="margin-left: 10px">
              <div class="dropdown-trigger">
                <div class="cubreIconDropdown">
                  <img
                    src="data:image/png;base64,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"
                    loading="lazy"
                    alt=""
                    class="imageNarBar"
                  />
                </div>
              </div>
              <div
                class="dropdown-menu dropMover"
                id="dropdown-menu2"
                role="menu"
              >
                <div
                  class="dropdown-content live"
                  v-if="$store.state.arrayEncuestaActiveLiveMode.length > 0"
                >
                  <a
                    class="dropdown-item"
                    v-for="(item, index) in $store.state
                      .arrayEncuestaActiveLiveMode"
                    :key="index"
                  >
                    <div
                      class="cubreEncuestaLiveFor"
                      @click="selectActiveEncuesta(item.id)"
                    >
                      <span style="margin-right: 10px">{{ index + 1 }}</span>
                      <i class="fa fa-list-ol mr-3" aria-hidden="true" v-if="item.tipo == 1"></i>
                      <i class="fa fa-comments mr-3" aria-hidden="true" v-if="item.tipo == 5"></i>
                      <i class="fa fa-cloud mr-3" aria-hidden="true" v-if="item.tipo == 2"></i> 
                      <i class="fa fa-star mr-3" aria-hidden="true" v-if="item.tipo == 3" ></i>
                      <i class="fa fa-calendar mr-3" aria-hidden="true" v-if="item.tipo == 4"></i>



                      <span class="tituloEncuestaLiveItem">{{
                        item.titulo
                      }}</span>
                      <i
                        class="fa fa-check"
                        aria-hidden="true"
                        v-if="item.play == 1"
                      ></i>
                    </div>

                    <div class="iconsOpcionesEncuestaLive">
                      <i
                        class="fa fa-pencil-square-o editIconEncuestaLive"
                        aria-hidden="true"
                        @click="openModalEditLive(item.id, item.tipo)"
                      ></i>
                      <i
                        class="fa fa-trash"
                        aria-hidden="true"
                        @click="deleteEncuestaByClickId(item.id)"
                      ></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="navBarLeft">
        <ul role="list" class="listNavBarLeft">
          <li class="list-item-navLeft config" title="Compartir"
           alt="Compartir" @click="openModalCompartir" >
            <i class="fa fa-share" aria-hidden="true" style="font-size: 35px"></i>
          </li>

          <li class="list-item-navLeft config" @click="activarFullScreen" title="Pantalla Completa"
           alt="Pantalla Completa" >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAQAAABQ8GUWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQflBgYXASOCY38rAAABFUlEQVR42u3bQQ6CMBCF4SkhXKMbvYmeWm8CG67RBePChSvDlIBP0v9bt/X1JSREx+TuboeYppSu1z1Och9Hs8vliJTdMZc/DwpQB1CjAHUANQpQB1BrvoAUehHy+91snuuOLiV1tXu+fPySs9kw1O3K2dLjsbaqjx02z6kbxz0us8WWIn2JrWv+EaAAdQA1ClAHUKMAdQA1ClAHUKMAdQC13mya1peVog5ar5TY3QAAAAAAANCW9B5CXOG3216/9f+KLzlbej7X1vWxCcza4YR/MAyRuzX/rTAFqAOoUYA6gBoFqAOoUYA6gBoFqAOoBWeFc47O3n78wbB0QGxafBP+NncKFKAOoEYB6gBqFKAOoNZ8AS/OFEW/caRO3gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0wNlQyMzowMTozNSswMDowMLooi9wAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMDZUMjM6MDE6MzUrMDA6MDDLdTNgAAAAAElFTkSuQmCC"
              loading="lazy"
              alt=""
              class="imageNarBar"
            />
          </li>
        </ul>
      </div>
    </div>


<div id="modalCompartir" class="modal">
            <div class="modal-background" @click="closeModalCompartir"></div>
            <div class="modal-content compartirModal">
            <div class="box" style="    text-align: left;">
            <h1 class="has-text-left">Compartir</h1>
            <div class="cubreTipoShare">
                <a :href="shareFacebook" target="_blank">
                  <i class="fa fa-facebook-official " aria-hidden="true"></i>
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
            <span >{{copiarUrlText}}</span>
            <div class="cubreInputClicCopiar">
                <input type="url" ref="inputCopy" readonly :value="$store.state.urlBase+'/p/'+$route.params.cod" />
            </div>
            </div>
            </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closeModalCompartir"></button>
          </div>

  </div>
</template>

<script>
import DiaHoraAddModal from './encuestas/diaHora/diaHoraAddModal.vue';
import encuestaSimple from "./encuestas/encuestaSimple.vue";
import EncuestaSimpleEdit from "./encuestas/encuestaSimpleEdit.vue";
import NubeDePalabras from "./encuestas/nubeDePalabras/nubeDePalabras.vue";
import QyaAddModal from './encuestas/qya/qyaAddModal.vue';
import QyaEditModal from './encuestas/qya/qyaEditModal.vue';
import SorteoAddModal from './encuestas/sorteos/sorteoAddModal.vue';
import SorteosEditModal from './encuestas/sorteos/sorteosEditModal.vue';
export default {
  components: { encuestaSimple, EncuestaSimpleEdit, NubeDePalabras, SorteoAddModal, SorteosEditModal, DiaHoraAddModal, QyaAddModal, QyaEditModal },

  data() {
    return {
      encuestaActive: 0,
      encuestaEditId: 0,
      tipoEncuestaEdit: 0,
       copiarUrlText: "Haz clic para copiar la Url", 
      shareTwitter: "https://twitter.com/intent/tweet?text=Resultapp&amp;url="+this.$store.state.urlBase+'/p/'+this.$route.params.cod,
      shareFacebook: "https://www.facebook.com/sharer/sharer.php?u="+this.$store.state.urlBase+'/p/'+this.$route.params.cod,
      shareEmail: "mailto:?subject=Resultapp&amp;body=Participa en la siguiente encuesta "+this.$store.state.urlBase
    };
  },

  methods: {
     copiarUrl(){
 const el = document.createElement('textarea');
        el.value = this.$store.state.urlBase+'/p/'+this.$route.params.cod;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.copiarUrlText = "Url Copiada"
        this.$refs.inputCopy.select();
     
    },
    openModalCompartir(){
      var root = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add('is-clipped');
      document.getElementById('modalCompartir').classList.add('is-active')
    },
    closeModalCompartir(){
    var root = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove('is-clipped');
      document.getElementById('modalCompartir').classList.remove('is-active')
    },


    deleteEncuestaByClickId(id) {
      this.$swal({
        title: "¿Estas seguro que quieres borrar esta encuesta ? ",
        html: "Se perderan todas las votaciones realizadas en ella",
        showCancelButton: true,
        confirmButtonText: `Si borrar`,
      }).then((result) => {
        if (result.value) {
          this.deleteEncuestaById(id);
        }
      });
    },
    async deleteEncuestaById(id) {
      const response = await this.$axios.$post(
        "delete_poll_simple_live_by_id",
        {
          id: id,
          codigo: this.$route.params.cod,
        }
      );
      console.log(response);
      this.$emit("recargarEncuestasByModal");
    },
    closeModalEditLive() {
      this.encuestaEditId = 0;
      this.tipoEncuestaEdit = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.remove("is-active");
    },
    openModalEditLive(id, tipo) {
      this.encuestaEditId = id;
      this.tipoEncuestaEdit = tipo;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.add("is-active");
    },
    cerrarModalEncuestaActiva() {
      this.encuestaActive = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalAddEncuestaLive")
        .classList.remove("is-active");
      this.$emit("recargarEncuestasByModal");
    },
    cerrarModalEdit() {
      this.encuestaEditId = 0;
      this.tipoEncuestaEdit = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalEditEncuestaLive")
        .classList.remove("is-active");
      this.$emit("recargarEncuestasByModal");
    },
    openModalAddLive(val) {
      this.encuestaActive = val;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document
        .getElementById("modalAddEncuestaLive")
        .classList.add("is-active");
    },
    closeModalAddLive() {
      this.encuestaActive = 0;
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document
        .getElementById("modalAddEncuestaLive")
        .classList.remove("is-active");
    },

    async cambiarStatus() {
        var candadoViejo = this.$store.state.candadoModoLive;
        
        var candado = !this.$store.state.candadoModoLive;
        this.$store.commit("setcandadoModoLive", candado);
        if(candadoViejo == 1){
             this.$store.commit('seteventLiveMode', 0);
        }
        //y aparte cambiar el resultado en la db
        const response = await this.$axios.$post("publicar_evento", {
          publicarDesactivar: candadoViejo,
          codigo: this.$route.params.cod,
        });
      
    },
    activarFullScreen() {
      this.$emit("activarFullScreen");
    },
    async getEventByCod() {
      await this.$axios
        .$get("get_event_by_cod?codigo=" + this.$route.params.cod)
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.$store.commit(
              "setarrayEncuestaActiveLiveMode",
              response.tipoEncuesta
            );
          }
        });
    },
    activarEvento(val) {
        this.$emit("activarEvento", val);
    },
    async selectActiveEncuesta(id) {
      this.$store.commit("setEncuestaActiveLiveMode", id);

      //ahora cambiar en la db
      const response = await this.$axios.$post(
        "modo_live_evento_encuesta_activa",
        {
          id: id,
          codigo: this.$route.params.cod,
        }
      );
      this.$store.commit("seteventLiveMode", 1);
      this.$store.commit("setcandadoModoLive", 1);
      this.getEventByCod();
    },
  },

  mounted() {},
};
</script>
<template>
  <section class="section-hero" style="border-radius: 20px; padding: 20px">
    <h1 style="text-align: left">{{ titulo_encuesta }}</h1>
    <hr />
    <div class="question-form-ui" v-click-outside="mostrarFoo">
      <form name="questionForm" class="question-form question-form--collapsed">
        <div role="img" class="avatar question-form__hero-icon">
          <div data-icon-name="person" aria-hidden="true" class="icon">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="question-form-textarea question-form__question-input">
          <textarea
            id="question-field"
            name="Text"
            class="inset-tab-focus"
            placeholder="Type your question"
            rows="2"
            aria-multiline="false"
            aria-readonly="false"
            aria-label="Input field for your question"
            style="
              overflow: hidden;
              overflow-wrap: break-word;
              height: 80px;
              outline: none;
            "
            v-model="pregunta"
            @click="mostrarFooter = true"
            @keypress.enter.prevent
            onkeyup="$(this).height(5);$(this).height($(this).prop('scrollHeight'))"
            :disabled="disableQYA"
          ></textarea>
        </div>

        <div class="question-form__footer" v-if="mostrarFooter">
          <button type="button" class="buttonN play" @click="enviarPregunta">
            Enviar
          </button>
        </div>
      </form>
    </div>

    <div class="listPreguntas mb-5">
      <div
        class="item_pregunta mt-3"
        v-for="(item, index) in arrayPreguntas"
        :key="index"
      >
        <div class="item_pregunta_top">
          <div class="item_pregunta_top_img">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              class="UserIcon"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          </div>
          <div class="item_pregunta_top_user">
            <span>{{ item.usuario }}</span>
            <span>{{ item.fecha }}</span>
          </div>
          <div class="item_pregunta_top_like">
            <span class="likeContador">
              <span v-if="item.likes > 0" class="mr-3">({{ item.likes }})</span>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
                class="likeIcon"
                :class="{ active: item.likes > 0 }"
                @click="likePregunta(item.id)"
              >
                <path
                  d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                ></path></svg
            ></span>
            <span class="icontree" v-if="$store.state.p == item.id_user">
              <i
                class="fa fa-pencil-square-o iconEditQyA"
                aria-hidden="true"
                @click="editarMiPregunta(item.id, item.texto)"
              ></i>
              &nbsp;&nbsp;
              <i
                class="fa fa-trash iconEditQyA"
                @click="deletePregunta(item)"
                aria-hidden="true"
              ></i>
            </span>
          </div>
        </div>
        <div class="item_pregunta_footer">{{ item.texto }}</div>
        <div class="item_pregunta_footer" v-if="item.reply.length > 0">
          <span class="replyCountAdmin" @click="replyPregunta(item)"
            >({{ item.reply.length }})-Respuestas</span
          >
        </div>
      </div>
    </div>

    <b-modal v-model="ModalEditPregunta" :width="400">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h4 class="has-text-left">Editar Pregunta</h4>
            <textarea
              placeholder="Type your question"
              rows="3"
              aria-multiline="false"
              aria-readonly="false"
              style="
                overflow: hidden;
                overflow-wrap: break-word;
                height: 150px;
                outline: none;
                width: 100%;
                border: none;
              "
              @keypress.enter.prevent
              maxlength="260"
              v-model="textEditPregunta"
            ></textarea>
            <div class="question-form__footer">
              <button
                type="button"
                class="buttonN play"
                @click="guardarEditPregunta"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal v-model="modalReply" :width="600">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h4 class="has-text-left">Respuestas</h4>
            <div class="item_pregunta mt-3">
              <div class="item_pregunta_top">
                <div class="item_pregunta_top_img">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    class="UserIcon"
                  >
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    ></path>
                  </svg>
                </div>
                <div class="item_pregunta_top_user">
                  <span>{{ arrayPreguntaR.usuario }}</span>
                  <span>{{ arrayPreguntaR.fecha }}</span>
                </div>
              </div>
              <div class="item_pregunta_footer">{{ arrayPreguntaR.texto }}</div>
            </div>

            <div
              class="item_pregunta mt-3"
              style="margin-left: 20px"
              v-for="(item, index) in arrayPreguntaR.reply"
              :key="index"
            >
              <div class="item_pregunta_top">
                <div class="item_pregunta_top_img">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    class="UserIcon"
                  >
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    ></path>
                  </svg>
                </div>
                <div class="item_pregunta_top_user">
                  <span>{{ item.usuario }}</span>
                  <span>{{ item.fecha }}</span>
                </div>
              </div>
              <div class="item_pregunta_footer">{{ item.texto }}</div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  props: [
    "titulo_encuesta",
    "id_encuesta",
    "id_evento",
    "modoLive",
    "statusEvent",
  ],
  directives: {
    ClickOutside,
  },
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
      },
    ],
  },
  data() {
    return {
      abierto: 0,
      modoenVivo: 0,
      mostrarFooter: false,
      pregunta: "",
      arrayPreguntas: [],
      ModalEditPregunta: false,
      idEdit: 0,
      textEditPregunta: "",
      arrayPreguntaR: [],
      modalReply: false,
      disableQYA:true
    };
  },
  methods: {
    async likePregunta(id) {
      if (this.statusEvent == 1) {
        await this.$axios
          .$post("like_encuesta_qya_front", {
            qya: id,
            codigo: this.$route.params.cod,
            id_evento: this.id_evento,
            id_encuesta: this.id_encuesta,
            p: this.$store.state.p,
            liveMode: this.modoenVivo,
          })
          .then((response) => {
            if (this.modoLive != 1) {
              console.log("estoy en undefined");
              this.getPreguntasByIdEncuesta(this.id_encuesta);
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },

    replyPregunta(item) {
      this.arrayPreguntaR = item;
      this.modalReply = true;
    },
    deletePregunta(item) {
      if (this.statusEvent == 1) {
        this.$swal({
          title: "¿Estas seguro que quieres borrar esta pregunta ? ",
          html: "Se perderan todas las votaciones realizadas en ella",
          showCancelButton: true,
          heightAuto: false,
          confirmButtonText: `Si borrar`,
        }).then((result) => {
          if (result.value) {
            this.deletePreguntaById(item.id);
          }
        });
      }
    },

    async deletePreguntaById(id) {
      if (this.statusEvent == 1) {
        await this.$axios
          .$post("delete_qya_live_user", {
            id_evento: this.id_evento,
            id_encuesta: this.id_encuesta,
            p: this.$store.state.p,
            codigo: this.$route.params.cod,
            idP: id,
            liveMode: this.modoenVivo,
          })
          .then((response) => {
            if (this.modoLive != 1) {
              console.log("estoy en undefined");
              this.getPreguntasByIdEncuesta(this.id_encuesta);
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },
    async guardarEditPregunta() {
      if (this.statusEvent == 1) {
        if (this.textEditPregunta == "") {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Debes introducir una pregunta",
          });
          return false;
        }
        let loader = this.$loading.show({
          loader: "dots",
          color: "#59b1ff",
        });

        await this.$axios
          .$post("edit_qya_live_front", {
            pregunta: this.textEditPregunta,
            id_evento: this.id_evento,
            id_encuesta: this.id_encuesta,
            p: this.$store.state.p,
            codigo: this.$route.params.cod,
            liveMode: this.modoenVivo,
            idP: this.idEdit,
          })
          .then((response) => {
            if (response.status != 0) {
              if (this.modoLive != 1) {
                console.log("estoy en undefined");
                this.getPreguntasByIdEncuesta(this.id_encuesta);
              }
              loader.hide();
              this.ModalEditPregunta = false;
            } else {
              loader.hide();
              this.$swal({
                type: "error",
                title: "Oops...",
                text: "Error en los datos ingresados",
                confirmButtonText: `OK`,
              });
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },
    editarMiPregunta(id, texto) {
      if (this.statusEvent == 1) {
        this.idEdit = id;
        this.textEditPregunta = texto;
        this.ModalEditPregunta = true;
      }
    },
    async enviarPregunta() {
      if (this.statusEvent == 1) {
        if (this.pregunta == "") {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Debes introducir una pregunta",
          });
          return false;
        }
        let loader = this.$loading.show({
          loader: "dots",
          color: "#59b1ff",
        });

        await this.$axios
          .$post("add_qya_live_front", {
            pregunta: this.pregunta,
            id_evento: this.id_evento,
            id_encuesta: this.id_encuesta,
            p: this.$store.state.p,
            codigo: this.$route.params.cod,
            liveMode: this.modoenVivo,
            parent: 0,
          })
          .then((response) => {
            if (response.status != 0) {
              if (this.modoLive != 1) {
                console.log("estoy en undefined");
                this.getPreguntasByIdEncuesta(this.id_encuesta);
              }
              this.pregunta = "";
              this.mostrarFooter = false;
              loader.hide();
            } else {
              loader.hide();
              this.$swal({
                type: "error",
                title: "Oops...",
                text: "Error en los datos ingresados",
                confirmButtonText: `OK`,
              });
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },
    mostrarFoo() {
      this.mostrarFooter = false;
    },

    async getPreguntasByIdEncuesta(id) {
      await this.$axios
        .$get(
          "get_preguntas_qya_front?id_evento=" +
            this.id_evento +
            "&p=" +
            this.$store.state.p +
            "&id_encuesta=" +
            id
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.arrayPreguntas = response.preguntas;
          }
        }).catch(({response}) => {
          console.log(response)
        })
    },

    detectaTecla(event) {
      //  console.log(event.keyCode);
      //  console.log(event.ctrlKey);
      if (event.keyCode === 39) {
        this.$emit("teclas", 39);
      }
      if (event.keyCode === 37) {
        this.$emit("teclas", 37);
      }
    },
  },
  mounted() {
    if(this.statusEvent == 1){
      this.disableQYA = false
    }
    if (this.modoLive == 1) {
      this.modoenVivo = this.modoLive;
    }
    // console.log(this.$store.state.mostrarEnMoLive);
    window.addEventListener("keyup", this.detectaTecla);
    //consultar si el usuario ya escribío algo
    this.getPreguntasByIdEncuesta(this.id_encuesta);
  },
  destroyed() {
    window.removeEventListener("keyup", this.detectaTecla);
  },
};
</script>

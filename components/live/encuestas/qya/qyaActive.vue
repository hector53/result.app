<template>
  <section
    class="section-hero"
    style=" border-radius: 20px; padding: 20px"
  >
    <h1 style="text-align: left">{{ titulo_encuesta }}</h1>
    <hr  />
    

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
              <span>
                    <span v-if="item.likes >0" >({{item.likes}})</span>
                   <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
               class="likeIcon"
            >
              <path
                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
              ></path>
            </svg></span>
              <span class="icontree" >
               
                <i class="fa fa-reply iconEditQyA" aria-hidden="true"
                @click="replyPregunta(item)"></i> &nbsp;&nbsp;
                <i class="fa fa-trash iconEditQyA"
                @click="deletePregunta(item)"
                 aria-hidden="true"></i> 
                </span>
          </div>
        </div>
        <div class="item_pregunta_footer">{{item.texto}}</div>
         <div class="item_pregunta_footer" v-if="item.reply.length>0"
              >
              <span class="replyCountAdmin" 
              @click="replyPregunta(item)">({{item.reply.length}})-Respuestas</span>
              
              </div>
      </div>
    </div>

      <b-modal v-model="modalReply" :width="600">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h4 class="has-text-left">Responder Pregunta</h4>
            <div
                class="item_pregunta mt-3"
                 
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
                    <span>{{arrayPreguntaR.usuario}}</span>
                    <span>{{arrayPreguntaR.fecha}}</span>
                </div>
                
                </div>
                <div class="item_pregunta_footer">{{arrayPreguntaR.texto}}</div>
            </div>

        

<div
                class="item_pregunta mt-3" style="margin-left: 20px;"
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
                    <span>{{item.usuario}}</span>
                    <span>{{item.fecha}}</span>
                </div>
                
                </div>
                <div class="item_pregunta_footer">{{item.texto}}</div>
            </div>
        <hr />
            <textarea
              placeholder="Escribe tu respuesta"
              rows="3"
              aria-multiline="false"
              aria-readonly="false"
              style="
                overflow: hidden;
                overflow-wrap: break-word;
                height: 80px;
                outline: none;
                width: 100%;
                border: none;
              "
              @keypress.enter.prevent
              maxlength="260"
              v-model="textReplyAdmin"
            ></textarea>
            <div class="question-form__footer">
              <button
                type="button"
                class="buttonN play"
                @click="replyQuestion"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>

export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento"],
 
  data() {
    return {
      abierto: 0,
      modoenVivo: 1,
      mostrarFooter: false,
      pregunta: "",
      arrayPreguntas: [],
      modalReply: false, 
      idToReply: 0, 
      textoReply: '', 
      userReply:'', 
      dateReply: '',
      textReplyAdmin: '', 
      arrayPreguntaR: [], 
      

    };
  },
  methods: {
      deletePregunta(item){
        this.$swal({
        title: "¿Estas seguro que quieres borrar esta pregunta ? ",
        html: "Se perderan todas las votaciones realizadas en ella",
        showCancelButton: true,
        confirmButtonText: `Si borrar`,
        }).then((result) => {
        if (result.value) {
        this.deletePreguntaById(item.id);
        }
        });
      },

      async deletePreguntaById(id){

          const response = await this.$axios.$post("delete_qya_live_admin", {
        id_evento: this.id_evento,
        id_encuesta: this.id_encuesta,
        p: this.$store.state.p,
        codigo: this.$route.params.cod,
        idP: id,
         liveMode: this.modoenVivo,
      });
        if(response.status == 1){
                this.getPreguntasByIdEncuesta(this.id_encuesta)
        }
      },
 async     replyQuestion(){
      
            if (this.textReplyAdmin == "") {
            this.$swal({
            type: "error",
            title: "Oops...",
            text: "Debes introducir una respuesta",
            });
            return false;
            }
            let loader = this.$loading.show({
            loader: "dots",
            color: "#59b1ff",
            });

             

            const response = await this.$axios.$post("add_qya_live_front", {
            pregunta: this.textReplyAdmin,
            id_evento: this.id_evento,
            id_encuesta: this.id_encuesta,
            p: this.$store.state.p,
            codigo: this.$route.params.cod,
            liveMode: this.modoenVivo,
            parent: this.idToReply
            });

            console.log(response);
            if (response.status != 0) {
            this.getPreguntasByIdEncuesta(this.id_encuesta);
            loader.hide();
            this.textReplyAdmin = ''
            this.modalReply = false
            } else {
            loader.hide();
            this.$swal({
            type: "error",
            title: "Oops...",
            text: "Error en los datos ingresados",
            confirmButtonText: `OK`,
            });
            }
      },
      replyPregunta(item){
          console.log(item)
            
            this.idToReply = item.id
            this.arrayPreguntaR = item
            this.modalReply = true
      },
      editarMiPregunta(id){
            alert(id)
      },
    async enviarPregunta() {
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

      const response = await this.$axios.$post("add_qya_live_front", {
        pregunta: this.pregunta,
        id_evento: this.id_evento,
        id_encuesta: this.id_encuesta,
        p: this.$store.state.p,
        codigo: this.$route.params.cod,
        liveMode: this.modoenVivo,
      });

      console.log(response);
      if (response.status != 0) {
        if (this.modoLive != 1) {
          console.log("estoy en undefined");
           this.getPreguntasByIdEncuesta(this.id_encuesta)
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
        });
    },

   
  },
  mounted() {
       if(this.$route.name == 'event-cod-results'){
                    this.modoenVivo = 0
              }  
    this.getPreguntasByIdEncuesta(this.id_encuesta);
  },
 
};
</script>

<template>
  <section class="section-hero" style="padding-top: 20px">
    <div id="modalAddPalabra" class="modal">
      <div class="modal-background" @click="closeModalAddPalabra"></div>
      <div class="modal-content">
        <div class="box" style="text-align: left">
          <div class="container">
            <div class="div-block-4">
              <input
                type="text"
                class="text-field title w-input"
                maxlength="256"
                ref="addPalabra"
                v-model="addPalabra"
                placeholder="Introduzca una palabra"
                @keyup.enter="enviarPalabra"
              />
            </div>

            <div class="button-group-live" style="margin-top: 50px">
              <button class="buttonN blue" @click="enviarPalabra">
                Enviar
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalAddPalabra"
      ></button>
    </div>
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <h1 style="text-align: left">{{ titulo_encuesta }}</h1>
    <hr />
    <vue-word-cloud
      style="height: 400px"
      :words="palabras"
      :color="wordsColor"
      font-family="Roboto"
    />
    <div class="container">
      <button class="buttonN blue" @click="openModalAddPalabra">
        Agregar Palabra
      </button>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento"],
  data() {
    return {
      addPalabra: "",
      isLoading: false,
      abierto: 0,
      palabras: [],
    };
  },
  components: { Loading },
  methods: {
     async enviarPalabra(){

         
          if(this.addPalabra==''){
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Debes introducir una palabra',
            })
            return false
          }
          //aqui si enviar a guardar la encuesta 
          this.isLoading = true
          const response = await this.$axios.$post("add_palabra_live_front", {
                 palabra:this.addPalabra, 
                 id_evento: this.id_evento, 
                 id_encuesta: this.id_encuesta, 
                 p: this.$store.state.p
                  });
        console.log(response)
          if(response.status != 0){
              this.isLoading = false
               this.closeModalAddPalabra()
               this.getRespuestaByIdEncuesta(this.id_encuesta)
              }else{
                this.isLoading = false
                 this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Error en los datos ingresados',
                  confirmButtonText: `OK`,
                })
              }


      },
    openModalAddPalabra() {
      this.addPalabra = ''
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document.getElementById("modalAddPalabra").classList.add("is-active");
    },
    closeModalAddPalabra() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document.getElementById("modalAddPalabra").classList.remove("is-active");
    },
    wordsColor: function (word) {
      var colors = ["#ffd077", "#3bc4c7", "#3a9eea", "#ff4e69", "#461e47"];
      var getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
      };
      return colors[getRandomInt(5)];
    },
    async crearEncuesta(val) {
      if (this.preguntaEncuesta == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes realizar una pregunta",
        });
        return false;
      }
      //aqui si enviar a guardar la encuesta
      this.isLoading = true;
      const response = await this.$axios.$post(
        "create_poll_nube_palabras_live",
        {
          pregunta: this.preguntaEncuesta,
          codigo: this.$route.params.cod,
          activar: val,
        }
      );
      console.log(response);
      if (response.status == 1) {
        this.isLoading = false;
        this.$emit("cerrarModal");
      } else {
        this.isLoading = false;
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Error en los datos ingresados",
          confirmButtonText: `OK`,
        });
      }
    },
    async getRespuestaByIdEncuesta(id) {
      await this.$axios
        .$get(
          "get_respuestas_by_user_nube_palabras?id_evento=" +
            this.id_evento +
            "&p=" +
            this.$store.state.p +
            "&id_encuesta=" +
            id
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.palabras = response.palabras;
          }
        });
    },

     detectaTecla(event){
            console.log(event.keyCode)
            console.log(event.ctrlKey)
             if(event.keyCode === 39){
                    this.$emit("teclas", 39)
             }
              if(event.keyCode === 37){
                    this.$emit("teclas", 37)
             }
     }
  },
  mounted() {
    window.addEventListener('keyup', this.detectaTecla)  
    //consultar si el usuario ya escribío algo
    this.getRespuestaByIdEncuesta(this.id_encuesta);
  },
  destroyed () {
   window.removeEventListener('keyup', this.detectaTecla)
 },
};
</script>

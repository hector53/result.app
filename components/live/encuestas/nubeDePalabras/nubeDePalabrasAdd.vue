<template>
  <div class="cubreEncuesta1">
    <div class="columns">
      <div class="column is-4">
        <div class="cubreNumber">
          <h4 class="titleEncuesta">Nube de Palabras</h4>
          <div class="cubreLogoNumber">
            <div class="logotipo-copy">
              <div class="logotipo-fill-copy">
                <div class="numberTipeEncuesta">{{ numero + 1 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="container">
          <div class="hoverOpciones" style="margin-bottom: 20px">
            <a @click="guardar()"
              ><i class="fa fa-floppy-o" aria-hidden="true"></i
            ></a>
            <a @click="moverArriba(numero)"
              ><i class="fa fa-arrow-up" aria-hidden="true"></i
            ></a>
            <a @click="moverAbajo(numero)"
              ><i class="fa fa-arrow-down" aria-hidden="true"></i
            ></a>
            <a @click="eliminar()"
              ><i class="fa fa-trash" aria-hidden="true"></i
            ></a>
          </div>
          <div class="div-block-4">
            <input
              type="text"
              class="text-field title w-input"
              maxlength="256"
              ref="addPalabra"
              v-model="preguntaEncuesta"
              placeholder="Introduzca una pregunta"
               v-debounce:400ms="guardar"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["numero", "idEcuesta", "pregunta", "nuevo"],
  data() {
    return {
      preguntaEncuesta: this.pregunta,
      preguntaEncuesta2: this.pregunta,
      id_encuesta: this.idEcuesta,
    };
  },

  methods: {
    eliminar() {
      this.$emit("eliminarEncuesta", {
        id_encuesta: this.id_encuesta,
        index: this.numero,
      });
    },
    moverArriba(index) {
      this.$emit("moverArriba", {
        id_encuesta: this.id_encuesta,
        index: index,
      });
    },
    moverAbajo(index) {
      this.$emit("moverAbajo", { id_encuesta: this.id_encuesta, index: index });
    },
    reducirOpciones(index) {
      this.opcionEncuesta.splice(index, 1);
    },
    addOpcion() {
      this.opcionEncuesta.push({ id: 0, opcion: "" });
    },
    crearEncuesta() {},

    compararArrays(a1, a2) {
      var i = a1.length;
      if (i != a2.length) return false;

      while (i--) {
        console.log(a1, a2);
        if (JSON.stringify(a1[i]) !== JSON.stringify(a2[i])) {
          //aqui guardar la opcion o actualizar
          this.opcion2[i] = this.opcionEncuesta[i];

          this.guardarOpciones();
          console.log(false);
          return false;
        } else {
          console.log(true);
        }
      }
      return true;
    },

    async guardar() {
   //   if (this.preguntaEncuesta != "") {
        await this.guardarOpciones();
      //  this.$emit("actualizarArray");
   //   }
    },

    async guardarOpciones() {
     await this.$axios.$post("guardar_pregunta_tipo_2", {
        id: this.id_encuesta,
        pregunta: this.preguntaEncuesta,
        codigo: this.$route.params.cod,
      }).then((response) => {
            if (response.status != 0) {
        console.log("guardado con exito");
        this.id_encuesta = response.id;
        //emit para actualizar array general
      }
      }).catch(({response}) => {
        console.log(response)
      })
  
    },
  },
  mounted() {
    if(this.nuevo==1){
      this.guardar()
    }
    //crear evento q compare los arrays cada x time
    /*   setInterval(() => {
          //si no esta vacío comparo
        if(this.preguntaEncuesta != ''){
            console.log("nube de palabras no esta vacia")
            if(this.preguntaEncuesta != this.preguntaEncuesta2){
            //son diferentes por lo tanto creo o actualizo 
            console.log("son diferentes por lo tanto creo o actualizo nube")
            this.preguntaEncuesta2 = this.preguntaEncuesta
            //aqui guardar en la db 
            this.guardarOpciones()
            }
        }
        }, 10000);*/
  },
};
</script>

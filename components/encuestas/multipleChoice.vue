<template>
  <div class="cubreEncuesta1">
    <div class="columns">
      <div class="column is-4">
        <div class="cubreNumber">
          <h4 class="titleEncuesta">Encuesta Simple</h4>
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
          <div class="hoverOpciones">
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
          <div class="form-block w-form has-text-left" style="margin: 0">
            <div class="div-block-4">
              <label for="name" class="field-label has-text-left">{{
                $store.state.idioma.questionLabel
              }}</label>
              <input
                type="text"
                class="text-field title w-input"
                maxlength="256"
                ref="pregunta"
                v-model="preguntaEncuesta"
                :placeholder="$store.state.idioma.questionPlaceholder"
                
                v-debounce:400ms="guardar"
              />
            </div>

            <div
              class="divR"
              v-for="(item, index) in opcionEncuesta"
              :key="index"
            >
              <label
                :for="'opcion' + index"
                class="field-label has-text-left"
                v-text="$store.state.idioma.optionLabel + ' ' + (index + 1)"
              ></label>
              <input
                type="text"
                class="text-field w-input"
                maxlength="256"
                v-model="opcionEncuesta[index]['opcion']"
                :placeholder="$store.state.idioma.optionLabel"
                required=""
                
                v-debounce:400ms="guardar"
              />
              <a
                class="close close_option"
                @click="reducirOpciones(index)"
              ></a>
            </div>

            <div class="text-block-5" style="margin: 0" @click="addOpcion">
              + {{ $store.state.idioma.newOption }}
            </div>

            <label class="checkbox" style="margin-top: 20px">
              <input type="checkbox" v-model="multipleE" @change="guardar" />
              Permitir respuestas multiples
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  props: [
    "numero",
    "idEcuesta",
    "pregunta",
    "opciones",
    "opciones2",
    "multiple",
    "nuevo"
  ],
  data() {
    return {
      id_encuesta: this.idEcuesta,
      opcionEncuesta: this.opciones,
      cantidadOpciones: 2,
      preguntaEncuesta: this.pregunta,
      preguntaEncuesta2: this.pregunta,
      opcion2: this.opciones2,
      multipleE: false,
      cE: this.$route.params.cod
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
      this.$swal({
        title: "¿Estas seguro que quieres borrar esta opción ? ",
        html: "Se perderan todas las votaciones realizadas en ella",
        showCancelButton: true,
        confirmButtonText: `Si borrar`,
          heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.deleteEncuestaById(index);
        }
      });
    },
    async deleteEncuestaById(index) {
      await this.$axios
        .$post("delete_poll_simple_live", {
          id: this.id_encuesta,
          id_opcion: this.opcionEncuesta[index]["id"],
          codigo: this.$route.params.cod
        })
        .then((response) => {
         this.opcionEncuesta.splice(index, 1);
        })
        .catch(({ response }) => {
          console.log(response);
        });
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

     guardarOpciones() {
      if (this.multipleE == true) {
        this.multipleE = 1;
      } else {
        this.multipleE = 0;
      }
       this.$axios
        .$post("guardar_opciones_tipo_1", {
          id: this.id_encuesta,
          codigo: this.cE,
          pregunta: this.preguntaEncuesta,
          opciones: this.opcionEncuesta,
          multiple: this.multipleE,
        })
        .then((response) => {
          if (response.status != 0) {
            console.log("guardado opciones con exito");
            this.id_encuesta = response.id;
            //ahora debo cargar las opciones nuevas
            this.opcionEncuesta = response.opciones;
            this.opcion2 = response.opciones;
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    async guardar() {
   //   if (this.preguntaEncuesta != "" && this.opciones.length > 1) {
        await this.guardarOpciones();
    //    this.$emit("actualizarArray");
   //   }
    },
    beforeWindowUnload(){
          console.log("mi this antes de cerrar")
     //   this.guardar()
    }
  
  },
  beforeDestroy() {
        console.log("mi this del multiple", this)
    ///    this.guardar()
  },
 
  mounted() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
    if(this.nuevo==1){
      this.guardar()
    }
    if (this.multiple == 1) {
      this.multipleE = true;
    } else {
      this.multipleE = false;
    }

    /*
    setInterval(() => {
          //si no esta vacío comparo
            if(this.preguntaEncuesta != this.preguntaEncuesta2){
              //son diferentes por lo tanto creo o actualizo 
              console.log("son diferentes por lo tanto creo o actualizo ")
              this.preguntaEncuesta2 = this.preguntaEncuesta
              //aqui guardar en la db 
                
              this.guardarOpciones()
            }else{
                  this.compararArrays(this.opcionEncuesta, this.opcion2)
            }
    }, 10000);
*/
  },
   destroyed() {
   window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
};
</script>

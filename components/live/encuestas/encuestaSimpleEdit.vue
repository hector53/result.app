<template>
<section class="section-hero" style="padding-top: 20px;">
   <loading :active="isLoading" color="#59b1ff" loader="dots" 
                 />
        <div class="container">
       
            <div class="form-block w-form has-text-left">
                    <div class="div-block-4"  style="     padding-left: 0;   padding-right: 0">
                        <label for="name" class="field-label has-text-left">{{$store.state.idioma.questionLabel}}</label>
                        <input
                            type="text" class="text-field title w-input" maxlength="256" 
                            ref="pregunta" v-model="preguntaEncuesta" 
                            :placeholder="$store.state.idioma.questionPlaceholder" ></div>
    
                    <div class="divR" v-for="(item, index) in opcionEncuesta" :key="index">
                        <label :for="'opcion'+index" class="field-label has-text-left"
                         v-text="$store.state.idioma.optionLabel + ' '+(index+1)"></label>
                        <input type="text" v-if="item.votos == 0"
                        class="text-field w-input" maxlength="256" 
                        v-model="opcionEncuesta[index]['opcion']"
                        :placeholder="$store.state.idioma.optionLabel" required="">

                        <input type="text" v-if="item.votos == 1"
                        class="text-field w-input" 
                        v-model="opcionEncuesta[index]['opcion']"
                        readonly disabled required="">

                        



                        <a  class="close close_option" v-if="item.votos == 0"
                         @click="reducirOpciones(index)"
                        ></a>
                    </div>

                     <div class="divR" v-for="(item, index) in opcionEncuestaNuevo" :key="index+100">
                        <label :for="'opcion'+(opcionEncuesta.length+index)" class="field-label has-text-left"
                         v-text="$store.state.idioma.optionLabel + ' '+(cantidadOpcionesViejas+(index+1))"></label>
                        <input type="text"
                        class="text-field w-input" maxlength="256" 
                        v-model="opcionEncuestaNuevo[index]"
                        :placeholder="$store.state.idioma.optionLabel" required="">
                        <a  class="close close_option"
                      @click="reducirOpcionesNuevo(index)"
                        ></a>
                    </div>
                   
                    <div class="text-block-5"  @click="addOpcion">+ {{$store.state.idioma.newOption}}</div>
                     <label class="checkbox" style="    margin-top: 10px; margin-bottom: 10px">
                <input type="checkbox" v-model="multiple">
                    Permitir respuestas multiples
                </label>
                    <div class="button-group-live" style="margin-top: 20px;">
                        <button class="buttonN blue " @click="crearEncuesta(0)">
                            Guardar</button>
                      

                    </div>
                   
            </div>
        </div>
    </section>
</template>

<script>

 import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    props:["id_encuesta"],
  data() {
    return {
      opcionEncuesta: ['', ''],
      cantidadOpciones: 2,
      preguntaEncuesta: "",  
      isLoading: false, 
      opcionEncuestaNuevo: [], 
      cantidadOpcionesViejas: 0, 
      multiple: false

	};
  },
  components:{Loading},
  methods: {
       reducirOpcionesNuevo(index){
            this.opcionEncuestaNuevo.splice(index,1)
          },
      async getEncuestaById(id){

            await this.$axios
            .$get("get_encuestas_by_id_live?id="+id)
            .then((response) => {
            console.log(response);
            if(response.status == 1){
                    this.preguntaEncuesta = response.encuesta[0].titulo
                    this.opcionEncuesta = response.opciones
                    this.cantidadOpcionesViejas = response.opciones.length
                    if(response.encuesta[0].multiple == 1){
                        this.multiple = true
                    }else{
                      this.multiple = false
                    }
            }

            });

      },
      reducirOpciones(index) {
          this.$swal({
                title: '¿Estas seguro que quieres borrar esta opción ? ',
                html: 'Se perderan todas las votaciones realizadas en ella',
                showCancelButton: true,
                confirmButtonText: `Si borrar`,
              }).then((result) => {
                  if(result.value){
                      this.deleteEncuestaById(index)
                  }
              })
        },
        async deleteEncuestaById(index){
            const response = await this.$axios.$post("delete_poll_simple_live", {
                        id: this.id_encuesta,
                        id_opcion: this.opcionEncuesta[index]['id']
                        });
                    console.log(response)
                         this.$emit("cerrarModalEdit")
        },
        addOpcion() {
          this.opcionEncuestaNuevo.push('')
        },
      async  crearEncuesta(val){
          if(this.preguntaEncuesta==''){
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Debes realizar una pregunta',
            })
            return false
          }

    if(this.opcionEncuesta.length == 0 && this.opcionEncuestaNuevo.length == 0){
        this.$swal({
                type: 'error',
                title: 'Oops...',
                text: 'Opciones vacías',
              })
              return false
    }
          //aqui si enviar a guardar la encuesta 
          this.isLoading = true
          if(this.multiple == true){
            this.multiple = 1
          }else{
            this.multiple =0
          }
          const response = await this.$axios.$post("edit_poll_simple_live", {
                 pregunta:this.preguntaEncuesta, 
                 opciones: this.opcionEncuesta,
                 id: this.id_encuesta,
                 opcionesNueva: this.opcionEncuestaNuevo,
                  modo: this.$store.state.eventLiveMode,
                  codigo: this.$route.params.cod, 
                  multiple: this.multiple
                  });
        console.log(response)
          if(response.status ==1){
              this.isLoading = false
               this.$emit("cerrarModalEdit")
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
  },
  mounted() {
      this.getEncuestaById(this.id_encuesta)
  },
};
</script>

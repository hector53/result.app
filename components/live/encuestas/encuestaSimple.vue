<template>
<section class="section-hero" style="padding-top: 20px;">
   <loading :active="isLoading" color="#59b1ff" loader="dots" 
                 />
        <div class="container">
       
            <div class="form-block w-form has-text-left">
                    <div class="div-block-4" style="     padding-left: 0;   padding-right: 0">
                        <label for="name" class="field-label has-text-left">{{$store.state.idioma.questionLabel}}</label>
                        <input
                            type="text" class="text-field title w-input" maxlength="256" 
                            ref="pregunta" v-model="preguntaEncuesta" 
                            :placeholder="$store.state.idioma.questionPlaceholder" ></div>
    
                    <div class="divR" v-for="(item, index) in opcionEncuesta" :key="index">
                        <label :for="'opcion'+index" class="field-label has-text-left"
                         v-text="$store.state.idioma.optionLabel + ' '+(index+1)"></label>
                        <input type="text"
                        class="text-field w-input" maxlength="256" 
                        v-model="opcionEncuesta[index]"
                        :placeholder="$store.state.idioma.optionLabel" required="">
                        <a  class="close close_option"
                        v-show="opcionEncuesta.length > 2" @click="reducirOpciones(index)"
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
                        <button class="buttonN play " @click="crearEncuesta(1)">
                            <i class="fa fa-play" aria-hidden="true"></i>  &nbsp;Activar</button>

                    </div>
                   
            </div>
        </div>
    </section>
</template>

<script>

 import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
import { mapState } from 'vuex'
export default {
  data() {
    return {
     opcionEncuesta: ['', ''],
      cantidadOpciones: 2,
      preguntaEncuesta: "",  
      codigoBuscador: ""  , 
      isLoading: false, 
      ipWeb: '', 
      multiple: false

	};
  },
  components:{Loading},
   computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },
  methods: {

  
  
      reducirOpciones(index) {
          this.opcionEncuesta.splice(index,1)
        },
        addOpcion() {
          this.opcionEncuesta.push('')
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

          for(var i=0; i<this.opcionEncuesta.length; i++){
            if(this.opcionEncuesta[i] == ''){
              this.$swal({
                type: 'error',
                title: 'Oops...',
                text: 'Opcion '+(i+1)+' vacia',
              })
              return false
            }

          }
          //aqui si enviar a guardar la encuesta 
          this.isLoading = true
          console.log("multiple", this.multiple)
          if(this.multiple == true){
            console.log("estrue")
            this.multiple = 1
          }else{
            this.multiple =0
          }
          const response = await this.$axios.$post("create_poll_simple_live", {
                 pregunta:this.preguntaEncuesta, 
                 opciones: this.opcionEncuesta,
                 codigo: this.$route.params.cod, 
                 activar: val, 
                 multiple: this.multiple
                  });
        console.log(response)
          if(response.status ==1){
              this.isLoading = false
              if(val == 1){
                this.$store.commit("seteventLiveMode", 1 );
                this.$store.commit("setcandadoModoLive", 1 );
              }
               this.$emit("cerrarModal")
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
  },
};
</script>

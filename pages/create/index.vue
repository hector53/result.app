<template>
<section class="section-hero">
   <loading :active="isLoading" color="#59b1ff" loader="dots" 
                 />
        <div class="container">
            <div class="div-block-5"><a href="/" class="link">
                <i class="fa fa-arrow-left" aria-hidden="true"></i> {{$store.state.idioma.back}}</a></div>
            <h1 class="headingM has-text-left">{{$store.state.idioma.pollTitle}}</h1>
            <p class="hero-subhead has-text-left">{{$store.state.idioma.pollSubtitle}}</p>
            <div class="form-block w-form has-text-left">
                    <div class="div-block-4">
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
                    <div class="button-group">
                        <button class="buttonN blue " @click="crearEncuesta">{{$store.state.idioma.submitButton}}</button>
                        <button class="buttonN ">{{$store.state.idioma.advancedButton}}</button>

                    </div>
                   
            </div>
        </div>
    </section>
</template>

<script>
const  generateRandomString = (num) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1= '';
  const charactersLength = characters.length;
  for ( let i = 0; i < num; i++ ) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result1;
}

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

	};
  },
  components:{Loading},
   computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },
  methods: {

   async getIp(){
       await   fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(({ ip }) => {
          this.ipWeb = ip;
          });
    },
    
  
    votar(id){
      alert("votar por la "+id)
    },
      reducirOpciones(index) {
          this.opcionEncuesta.splice(index,1)
        },
        addOpcion() {
          this.opcionEncuesta.push('')
        },
      async  crearEncuesta(){
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
            var cookieNotUser = this.$cookies.get('_r_u') 
          const response = await this.$axios.$post("create_poll_not_user", {
                 pregunta:this.preguntaEncuesta, 
                 opciones: this.opcionEncuesta,
                  miCodigo: generateRandomString(5), 
                  cookieNotUser: cookieNotUser, 
                  ipWeb: this.ipWeb
                  });

          if(response.status ==1){
               location.href = '/p/'+response.codigo
              }else{
                this.isLoading = false
                 this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Ya tienes un usuario registrado en este dispositivo debes iniciar sesion',
                  confirmButtonText: `OK`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    location.href = '/login'
                  }
                })
              }

        }, 
  },
  mounted() {
      this.$refs.pregunta.focus();
      this.getIp()
  },
};
</script>

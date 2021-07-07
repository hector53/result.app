<template>
<div>
     <section class="section-hero choiceFrontLive" >
  
    <div class="container cubreEncuesta" >
      
      
      <h1 class="headingM has-text-left">{{preguntaGetEncuesta}}</h1>

    
      <div class="mt-5" >
        <div class="w-form" style="padding: 10px;">
          <div 
          v-for="(item, index) in opciones" :key="index"
          @click="votar(item['id'])"
          :class="{'activeOption': miVoto == item['id']}"
          >
            <div class="CubOption" v-if="resultados"
            :style="'border-color:'+colores[item['color']]"
          >
       

            <div class="columns">
              <div class="column is-flex is-justify-content-space-between">

                <div class="cubreIconandOption is-flex">
                  <div class="keyboard"><div v-text="index+1" ></div></div>
                  <div class="div-block-8">
                    <div class="div-block-9" v-if="item['porcentaje'] > 0 && miVoto == item['id']" ></div>
                  </div>
                  <span for="Opción " class="radio-button-label w-form-label" v-text="item['valor']"  ></span>
                </div>
                <div class="text-block-12" v-if="resultados" v-text="item['porcentaje']+'%'"  ></div>
              </div>
            </div>

            <div class="columns" v-if="resultados">
              <div class="column is-flex is-justify-content-space-between">
                <div class="cubreResult is-flex">
                  <div class="poll-bar"  >
                    <div class="fill-bar" :style="'width:'+item['porcentaje']+'%; background-color:'+colores[index]+';'" ></div>
                  </div>
                  <div class="text-block-12" v-text="item['totalVoto']+' voto'"   style="    font-size: 15px;"  >
                    
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="CubOption" v-else
        >
     

          <div class="columns">
            <div class="column is-flex is-justify-content-space-between">

              <div class="cubreIconandOption is-flex">
                <div class="keyboard"><div v-text="index+1" ></div></div>
                <div class="div-block-8">
                  <div class="div-block-9" v-if="item['porcentaje'] > 0 && miVoto == item['id']" ></div>
                </div>
                <span for="Opción " class="radio-button-label w-form-label" v-text="item['valor']"  ></span>
              </div>
              <div class="text-block-12" v-if="resultados" v-text="item['porcentaje']+'%'"  ></div>
            </div>
          </div>

          <div class="columns" v-if="resultados">
            <div class="column is-flex is-justify-content-space-between">
              <div class="cubreResult is-flex">
                <div class="poll-bar"  >
                  <div class="fill-bar" :style="'width:'+item['porcentaje']+'%; background-color:'+colores[index]+';'" ></div>
                </div>
                <div class="text-block-12" v-text="item['totalVoto']+' voto'"   style="    font-size: 15px;"  >
                  
                </div>
              </div>
            </div>
          </div>
        </div>

          </div>
          


         

            
            <div class="div-block-10">
       
                <a class="link-2" @click="cancelarVoto" v-if="resultados && yaVote && statusEvent==1 ">
                  Cancelar Votos</a>
              </div>
          
        </div>
      </div>

    </div>
  </section>
</div>
</template>

<script>
export default {
    props:['id_encuesta', 'titulo_encuesta', 'id_evento', 'modoLive', 'statusEvent'],
  data() {
    return {
      opciones: [], 
        preguntaGetEncuesta: this.titulo_encuesta, 
        totalVotos: "",
        yaVote: false, 
        resultados: false, 
        actualizaVoto: false, 
        colores: [
          '#ffaf59', 
          '#59b1ff', 
          '#59ffbf', 
          '#FF5252', 
          '#FF96E0', 
          '#BDC3C7', 
          '#F53B86', 
          '#E3500D',
          '#C287E8',
          '#8AD3A0', 
          'transparent'
        ], 
        miVoto: 0, 
        miVotoViejo: 0, 
        codR: '', 
        codigoEncuesta: '', 
        modoenVivo: 0
	};
  },
 
  methods: {
       async votar(id){
         console.log(this.statusEvent)
         if(this.statusEvent == 1){
 var cookieNotUser = this.$store.state.p
      const response = await this.$axios.$post("_votar_user_not", {
        id_opcion: id, 
        id_encuesta: this.id_encuesta,
        cookieNotUser: cookieNotUser, 
        id_evento: this.id_evento, 
        login: this.$store.state.login, 
        liveMode: this.modoenVivo,
        codigo: this.$route.params.cod, 
        
      });

            if(response.result ==  1){
               
                  this.resultados = true
                  this.actualizaVoto = true
                 
            }

            if(response.result ==  2){
                this.$swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Ya has realizado tu voto',
                  })
                  this.actualizaVoto = false
            }

            if(response.result ==  3){
               this.$swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Error desconocido',
                  })
                  this.actualizaVoto = false
            }
            if(response.result ==  0){
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


          if(this.actualizaVoto){
            console.log("votare")
            await this.getEncuestaById(this.id_encuesta)
           // this.capture(2)
            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Votacion exitosa',
              showConfirmButton: false,
              timer: 1500
            })
          }
         }
      
      },
       async cancelarVoto(){
var cookieNotUser = this.$store.state.p
         await   this.$axios.$get("_cancelar_voto_not_registered?id_encuesta="+this.id_encuesta+"&u="+cookieNotUser+
         "&id_evento="+this.id_evento+"&codigo="+this.$route.params.cod+"&modoLive="+this.modoenVivo)
        .then((response) => {

         //   console.log(response)
            if(response.status == 1){
              
              this.actualizaVoto = false
              this.miVoto = 0
              
              if(this.modoLive == 1){
              this.resultados = true
              }else{
                this.resultados = false
              }
              this.getEncuestaById(this.id_encuesta)
            }else{
              this.$swal({
                position: 'center',
                icon: 'error',
                title: 'Error al cancelar el voto',
                showConfirmButton: false,
                timer: 1500
              })
            }
        })
       
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
            if(event.ctrlKey == false && this.yaVote){
            if(event.keyCode === 67){
              //cancelar voto tecla C
              this.cancelarVoto()
            }
          }

          if(event.keyCode === 85){
            //copiar url 
            this.copyLink(window.location.href, 1)
          }

          if(event.keyCode === 72){
            //copiar url 
            this.copyLink(this.codigoEncuesta, 2)
          }
            var tecladoArriba = 49
            var tecladoDerecho = 97
            
            for(var i=0; i<9; i++){
            
                if(event.keyCode === (tecladoArriba+i) || event.keyCode === (tecladoDerecho+i)){
                  //presiono la tecla 1
                  if(this.opciones.length >= (i+1)){
                      //si tengo esta cantidad de opciones por lo tanto puedo votar
                      this.votar(this.opciones[i]["id"])
                  }else{
                    this.$swal({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'No existe esa opción',
                    })
                  }
              }
              
                  
            }
          

          }, 
    async getEncuestaById(id){
         await   this.$axios.$get("get_encuesta_by_id?p="+this.$store.state.p+"&id_encuesta="+id+"&codigo="+this.$route.params.cod)
        .then((response) => {
            this.$emit("closeLoading")
                  this.opciones = response.opciones
                  this.totalVotos = response.totalVotos
                  if(response.siVote == 1){
                    this.yaVote = true
                    this.resultados = true
                  }else{
                   
                    this.yaVote = false
                  }
                  if(response.miVoto != 0){
                      this.miVoto = response.miVoto
                  }

        })
    }
  },
  mounted() {
    console.log("status evento", this.statusEvent)
    if(this.modoLive == 1){
        this.resultados = true
        console.log("modolive", this.modoLive)
        this.modoenVivo = this.modoLive
    }
  
      
       window.addEventListener('keyup', this.detectaTecla)  
      var pathname = window.location.pathname; 
      if(pathname != '/'){
          var param = pathname.substr(3)
           var codR = pathname.substr(-1)
          console.log(codR)
          if(codR == '+'){
            this.codR = '+'
            this.resultados = true
          }
          this.codigoEncuesta = param
        this.getEncuestaById(this.id_encuesta)
      }
  },
  destroyed () {
   window.removeEventListener('keyup', this.detectaTecla)
 },
};
</script>

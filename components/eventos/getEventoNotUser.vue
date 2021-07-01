<template>
<div>
<button class="button is-info btnAtajos modal-button" data-target="#modal"><i class="fa fa-info-circle"
      aria-hidden="true"></i></button>
  <div id="modal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h1 class="title is-3 mt-3">Atajos de Página</h1>
        <ul>

          <li> <b>Votar:</b> Puedes votar presionando la tecla del numero correspondiente </li>
          <li><b>Ejemplo para votar por la opción 1:</b> Pulse la tecla <kbd>1</kbd> </li>
          <li><b>Cancelar Voto: </b>Pulse la tecla <kbd>C</kbd> </li>
          <li><b>Pra copiar la url: </b>Pulse la tecla <kbd>U</kbd> </li>
          <li><b>Pra copiar el #codigo: </b>Pulse la tecla <kbd>H</kbd> </li>

        </ul>

      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>


   <section class="section-hero" style="    min-height: 500px; padding: 5px;" >
  
    <div class="container cubreEncuesta" >
      
      
      <h1 class="headingM has-text-left">{{preguntaGetEncuesta}} </h1>
      <p class="hero-subhead has-text-left" v-text="$store.state.idioma.createdAbout+' '+  fecha+' por Anonimo '+totalVotos+' votos'" ></p>

      <div style="padding: 10px;     text-align: left;" >
        <div class="text-block-8" @click="mostrarQr">
          
          <i class="fa fa-arrow-down" v-if="qrCode"   aria-hidden="true"></i>
          <i class="fa fa-arrow-right" v-else  aria-hidden="true"></i>
          
          &nbsp;{{$store.state.idioma.shareQR}}</div>
        <div class="div-block-11" v-if="qrCode"  >
          <div>
            <div class="text-block-9"># {{codigoEncuesta}}</div>
            <div class="text-block-10" @click="copyLink('urlsite', 1)">
              {{$store.state.idioma.copyURL}}</div>
              <div><div class="text-block-15">{{$store.state.idioma.shareOn}} </div>
              <a href="#" class="compartir"><i class="fa fa-twitter" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-facebook" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-whatsapp" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-slack" aria-hidden="true"></i></a>
              <a href="#" class="compartir"><i class="fa fa-envelope-o" aria-hidden="true"></i></a></div>
          </div>
         
             <vue-qrcode :value="urlActual" class="image-2"  />
        </div>
      </div>

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
              <button class="buttonN blue">{{$store.state.idioma.notificationEmail}}</button>
                
                <a :href="codigoEncuesta"  class="link-2" v-if="resultados ==  false">
                  {{$store.state.idioma.toResult}}</a>
                <a class="link-2" @click="cancelarVoto" v-if="resultados && yaVote ">{{$store.state.idioma.cancelVote}}</a>
              </div>
          
        </div>
      </div>

    </div>
  </section>
</div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
export default {
  components:{VueQrcode},
  data() {
    return {

       opciones: [], 
        preguntaGetEncuesta: "", 
        id_encuesta: "", 
        totalVotos: "",
        codigoEncuesta: "",
        qrCode: false, 
        yaVote: false, 
        capturar: 0, 
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
        qrImage: '', 
        id_evento: '', 
        codR: '', 
        fecha:'', 
        urlActual: ''
     
	};
  },
 
  methods: {
   
      
      copyLink(Url, tipo){
        var URLactual = window.location;
        const el = document.createElement('textarea');
        el.value = URLactual;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        var copia; 
        if(tipo == 1){
          copia = "Link"
        }else{
          copia = "#"+this.codigoEncuesta
        }
        this.$swal({
          position: 'center',
          icon: 'success',
          title: copia+' copiado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      },
     async cancelarVoto(){
var cookieNotUser = this.$cookies.get('_r_u') 
         await   this.$axios.$get("_cancelar_voto_not_registered?id_encuesta="+this.id_encuesta+"&u="+cookieNotUser)
        .then((response) => {

         //   console.log(response)
            if(response.status == 1){
              
              this.actualizaVoto = false
              this.miVoto = 0
              this.getEncuesta(this.codigoEncuesta)
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
      mostrarQr(){
        this.qrCode = !this.qrCode
        
      },
     async votar(id){
       var cookieNotUser = this.$cookies.get('_r_u') 
      const response = await this.$axios.$post("_votar_user_not", {
        id_opcion: id, 
        id_encuesta: this.id_encuesta,
        cookieNotUser: cookieNotUser, 
        id_evento: this.id_evento, 
        login: false
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
            await this.getEncuesta(this.codigoEncuesta)
           // this.capture(2)
            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Votacion exitosa',
              showConfirmButton: false,
              timer: 1500
            })
          }










      },
        
          async getEncuesta(id){

var cookieNotUser = this.$cookies.get('_r_u') 
console.log(cookieNotUser)
console.log(id)
              await   this.$axios.$get("_get_encuesta_not_registered?codigo="+id+"&u="+cookieNotUser)
        .then((response) => {
          
                console.log(response)
              if(response != 0){
               //   console.log("estoy")
                  this.opciones = response.opciones
                  this.preguntaGetEncuesta = response.encuesta[2]
                  this.id_encuesta = response.encuesta[0]
                  this.totalVotos = response.totalVotos
                  this.qrImage = response.qr
                  this.id_evento = response.id_evento
                  this.fecha = response.fecha
                  if(response.siVote == 1){
                    this.yaVote = true
                    this.resultados = true
                  }else{
                    if(this.codR == '+'){
                        this.resultados = true
                    }else{
                        this.resultados = false
                    }
                    this.yaVote = false
                    
                  }
                  if(response.miVoto != 0){
                      this.miVoto = response.miVoto
                  }

                  

              
              }

        })


          
          }, 
          detectaTecla(event){
            console.log(event.keyCode)
            console.log(event.ctrlKey)
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
         async capture(tipo){
            
            $(".text-block-8").hide();
            $(".div-block-11").hide();
            $(".submit-button-3").hide();
            $(".link-2").hide();
            $(".radio-button-field ").css("width", "98%");
            this.miVotoViejo = this.miVoto
            this.miVoto = 0
            
            html2canvas(document.querySelector(".section-hero")).then(canvas => {
           // document.body.appendChild(canvas)
              var capture = canvas.toDataURL("image/png")
            //  console.log(capture)
              //ahora enviarla por post y guardarla 
              $.ajax({
                type: "POST",
                url: $SCRIPT_ROOT + '/_guardar_capture',
                data: {capture: capture, codigo: this.codigoEncuesta, tipo:tipo
                },
                success: function(response)
                {
                  
                  console.log(response)
                }
                });
          });
          

          $(".text-block-8").show();
          $(".div-block-11").show();
          $(".submit-button-3").show();
          $(".link-2").show();
          $(".radio-button-field ").css("width", "100%");
          this.miVoto = this.miVotoViejo
          this.miVotoViejo = 0
        
          
          }
  },
 async  mounted() {
   var URLactual = window.location;
   this.urlActual = URLactual.href
       window.addEventListener('keyup', this.detectaTecla)  
      var pathname = window.location.pathname; 
      if(pathname != '/'){
          var param = pathname.substr(3)
           var codR = pathname.substr(-1)
          console.log(codR)
          if(codR == '+'){
            this.codR = '+'
          }
          this.codigoEncuesta = param
         await this.getEncuesta(param)
         /* if(this.capturar == 1){
            this.capture(1)
          }
          if(this.capturar == 2){
            this.capture(2)
          }*/
      }
  },
   destroyed () {
   window.removeEventListener('keyup', this.detectaTecla)
 },
};
</script>

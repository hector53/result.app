<template>
<div>
 <nav-bar-evento ></nav-bar-evento>
 <nav-bar-event v-if="eventT" :eventName="eventName"  ></nav-bar-event>

   <loading :active="isLoading" color="#59b1ff" loader="dots"              />
<section
   
    style="padding: 20px;" :class="{'minAltoLoading': isLoading}"
  >
    <div class="cubreResults" v-for="(item, index) in encuestas" :key="index" >
        <multiple-choice-result
         :ref="'encuestaFront_'+item.id"
        v-if="item.tipo == 1" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo"
        ></multiple-choice-result>

         <nube-de-palabras-activa
           :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 2 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          ></nube-de-palabras-activa>


    <sorteos-live-activo
            :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 3 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          ></sorteos-live-activo>

          <dia-hora-live-activo
            :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 4 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          > </dia-hora-live-activo>

          <qya-active
           :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 5 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo" :id_evento="id_evento"
          ></qya-active>

    </div>
</section>
   <footer-t   :class="{'positionAbsolute' : encuestas.length == 0}" ></footer-t>
</div>
</template>

<script>
import MultipleChoiceResult from '../../../components/encuestas/multipleChoiceResult.vue';
import FooterT from '../../../components/footer/footerT.vue';
import navBarEvento from '../../../components/header/navBarEvento.vue';
import DiaHoraLiveActivo from '../../../components/live/encuestas/diaHora/diaHoraLiveActivo.vue';
import QyaActive from '../../../components/live/encuestas/qya/qyaActive.vue';
import SorteosLiveActivo from '../../../components/live/encuestas/sorteos/sorteosLiveActivo.vue';

 import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';


export default {
      layout: "live",
  components: { navBarEvento, MultipleChoiceResult, QyaActive, SorteosLiveActivo, DiaHoraLiveActivo, FooterT },
head() {
      return {
        title: 'Event Results - '+this.$route.params.cod+' - Resultapp',
        
      }
    },
    components:{Loading},
  data() {
    return {
     eventT: false, 
     eventName: '', 
     encuestas: [], 
     id_evento: '', 
     isLoading: true
     
	};
  },
  
  methods: {
    emitir(){
      var User = this.$store.state.p
    var codigo = this.$route.params.cod
this.socket.emit('conectar', {
        username: User,
              room: codigo
      }, (resp) => {
      })
    },
    async get_event(){
      
         await this.$axios
        .$get("get_event_by_cod?codigo=" + this.$route.params.cod)
        .then((response) => {
            if(response.status == 1){
                this.eventName = response.titulo
                this.eventT = true
                this.encuestas = response.tipoEncuesta
                this.id_evento = response.id

             
            }

              this.isLoading = false
        });
    }
  },
  mounted() {
    
          this.socket = this.$nuxtSocket({
      channel: '/'
    })

      var User = this.$store.state.p
    var codigo = this.$route.params.cod
this.socket.emit('conectar', {
        username: User,
              room: codigo
      }, (resp) => {
      })

       this.socket
    .on('join_room_announcement', (data) => {
       console.log(`<b>${data.username}</b> has joined the room`)
    })


  this.socket
    .on('respuestaDelVoto', (data) => {
       console.log(data)
        console.log(this.$refs['encuestaFront_'+data.id_encuesta][0])
         var idEncuestaM=this.$refs['encuestaFront_'+data.id_encuesta][0].id_encuesta
          console.log("esta encuesta es la q debemos actualizar", data.id_encuesta)
              
          if(data.id_encuesta == idEncuestaM){
         
             if(data.tipo == 1){
                this.$refs['encuestaFront_'+data.id_encuesta][0].getEncuestaById(data.id_encuesta)
             }
              if(data.tipo == 2){
                this.$refs['encuestaFront_'+data.id_encuesta][0].getRespuestaByIdEncuesta(data.id_encuesta)
              }

               if(data.tipo == 5){
                this.$refs['encuestaFront_'+data.id_encuesta][0].getPreguntasByIdEncuesta(data.id_encuesta)
              }
          }
    })

    
   
        var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
      this.get_event()
  },
};
</script>

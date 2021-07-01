<template>
<div>
 <nav-bar-evento ></nav-bar-evento>
 <nav-bar-event v-if="eventT" :eventName="eventName"  ></nav-bar-event>
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
    </div>
    

</div>
</template>

<script>
import MultipleChoiceResult from '../../../components/encuestas/multipleChoiceResult.vue';
import navBarEvento from '../../../components/header/navBarEvento.vue';
export default {
      layout: "dashboardEvent",
  components: { navBarEvento, MultipleChoiceResult },
head() {
      return {
        title: 'Event Results - '+this.$route.params.cod+' - Resultapp',
        
      }
    },
  data() {
    return {
     eventT: false, 
     eventName: '', 
     encuestas: [], 
     id_evento: ''
     
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
          }
    })

    
   
        var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
      this.get_event()
  },
};
</script>

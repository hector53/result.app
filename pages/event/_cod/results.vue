<template>
<div>
 <nav-bar-evento ></nav-bar-evento>
 <nav-bar-event v-if="eventT" :eventName="eventName"  ></nav-bar-event>
    <div class="cubreResults" v-for="(item, index) in encuestas" :key="index" >
        <multiple-choice-result
         :ref="'encuestaFront_'+index"
        v-if="item.tipo == 1" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo"
        ></multiple-choice-result>
    </div>

</div>
</template>

<script>
import MultipleChoiceResult from '../../../components/encuestas/multipleChoiceResult.vue';
import navBarEvento from '../../../components/header/navBarEvento.vue';
export default {
      layout: "dashboardEvent",
  components: { navBarEvento, MultipleChoiceResult },

  data() {
    return {
     eventT: false, 
     eventName: '', 
     encuestas: [], 
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
       for(var i=0; i<this.encuestas.length; i++){
         var idEncuestaM=this.$refs['encuestaFront_'+i][0].id_encuesta
    //   console.log(this.$refs['encuestaFront_'+i][0].id_encuesta)
          if(data.id_encuesta == idEncuestaM){
              console.log("esta encuesta es la q debemos actualizar", data.id_encuesta)
                this.$refs['encuestaFront_'+i][0].getEncuestaById(data.id_encuesta)
              
          }
       }
    })

    
   
        var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
      this.get_event()
  },
};
</script>

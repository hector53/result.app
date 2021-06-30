<template>
<div>
  <div v-if="statusEvent == 1 && modoLive == 0">
       <get-evento v-if="userTipo != 0" :id_evento="id_evento" :encuestas="encuestas"></get-evento>
        <get-evento-not-user v-else></get-evento-not-user>
  </div>
  <div v-if="statusEvent == 0" style="    margin-top: 50px;    margin-bottom: 50px;    text-align: center;">

    <h1>Evento No Disponible</h1>
  </div>
<div v-if="statusEvent == 1 && modoLive == 1" style="    min-height: 500px;">
      <modo-live-front ref="modoLiveFront" :id_evento="id_evento"></modo-live-front>
  </div>
</div>
</template>

<script>
import getEvento from '../../components/eventos/getEvento.vue';
import GetEventoNotUser from '../../components/eventos/getEventoNotUser.vue';
import { mapState } from 'vuex'
import ModoLiveFront from '../../components/live/modoLiveFront.vue';
export default {
  components: { getEvento, GetEventoNotUser, ModoLiveFront },
  async asyncData({ params, store, redirect, app }) {
    const response =  await app.$axios.$get("get_event_by_cod_front?codigo="+params.cod)
    console.log("res", response)
    if(response.status == 0){
       return redirect('/')
    }else{
      if(response.status == 2){
        return {userTipo: tipoUser, id_evento: response.id_evento,
       encuestas: response.encuestas, statusEvent: 0, modoLive: response.modo}
      }else{
         var tipoUser;
      if(response.tipoUser == 0){
        console.log("tipo usuaro sin regisrar")
        //usuario no registrado 
        tipoUser = 0
      }else{
        //usuario registrado
        tipoUser = response.tipoUser
      }
      return {userTipo: tipoUser, id_evento: response.id_evento,
       encuestas: response.encuestas, statusEvent: response.statusEvent, modoLive: response.modo}
      }
     
    }
  },
   head: {
  
  },
  data() {
    return {
	};
  },
  computed: {
    ...mapState(['login'])
  },
  methods: {
   
  },
  mounted() {
    console.log("tipo usuario", this.userTipo)
    console.log("id usuario", this.$store.state.p)
    var User = this.$store.state.p
    var codigo = this.$route.params.cod
           this.socket = this.$nuxtSocket({
      channel: '/'
    })

     this.socket.emit('conectar', {
        username: User,
              room: codigo
      }, (resp) => {
      })

        this.socket
    .on('cambioDeEncuesta', (data) => {
      console.log(data)
      if(data.codigo == this.$route.params.cod){

        if(data.tipo == 5){
              this.statusEvent = 0
        }else{
          var componenteEncuesta = this.$refs['modoLiveFront']
        if(componenteEncuesta == undefined){
             this.statusEvent = 1
          this.modoLive = 1
        } else{
            this.$refs['modoLiveFront'].getEncuestaByEventLive(data.codigo)
        }
        }
         
     
      }

           
    })

      this.socket
    .on('activarModoPresentacion', (data) => {
      if(data.codigo == this.$route.params.cod){
          this.statusEvent = data.modo
          this.modoLive = data.modo
      }
    })

        this.socket
    .on('cambiarStatusEvent', (data) => {
      console.log("cambiar status")
      console.log(data)
      if(data.codigo == this.$route.params.cod){
          this.statusEvent = data.status
      }
    })
  },
};
</script>

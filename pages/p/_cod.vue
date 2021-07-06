<template>
<div>

<div  :class="{'cubreModoLive':modoLive == 1}">
  <header-live-front v-if="modoLive == 1" ></header-live-front>
  <nav-bar v-else></nav-bar>

  <div v-if="mostrar">
  <div v-if="statusEvent == 1 && modoLive == 0">
       <get-evento v-if="userTipo != 0" :id_evento="id_evento" :encuestas="encuestas"></get-evento>
        <get-evento-not-user v-else></get-evento-not-user>
  </div>
  <div v-if="statusEvent == 0" style="    margin-top: 50px;    margin-bottom: 50px;    text-align: center;">

    <h1>Evento No Disponible</h1>
  </div>
<div v-if="statusEvent == 1 && modoLive == 1" style="    min-height: 500px;">
      <modo-live-front style="    margin-top: 60px;" ref="modoLiveFront" :id_evento="id_evento" :modoLive="modoLive"></modo-live-front>
  </div>
</div>

<div class="footerLive "  v-if="modoLive == 1"  > 
      <div class="centerFooter"> 
         <h1>Result</h1>
      </div>
    </div>
</div> 
  <footer-t :class="{'positionAbsolute': modoLive == 0 && statusEvent == 0}"  v-if="modoLive == 0"></footer-t>




</div>
</template>

<script>
import getEvento from '../../components/eventos/getEvento.vue';
import GetEventoNotUser from '../../components/eventos/getEventoNotUser.vue';
import { mapState } from 'vuex'
import ModoLiveFront from '../../components/live/modoLiveFront.vue';
export default {
  layout: 'live',
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
      mostrar: true
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
      
      console.log("llego el cambio",data)
      if(data.codigo == this.$route.params.cod){
        

        if(data.tipo == 5){
              this.statusEvent = 0
        }else{
          var componenteEncuesta = this.$refs['modoLiveFront']
        if(componenteEncuesta == undefined){
             this.statusEvent = 1
          this.modoLive = 1
        } else{
          console.log("aqui actualizo la pagina")
            this.$refs['modoLiveFront'].getEncuestaByEventLive(data.codigo)
        }
        }
         
     
      }

           
    })

      this.socket
    .on('activarModoPresentacion', (data) => {
      if(data.codigo == this.$route.params.cod){
        this.mostrar = false
          this.statusEvent = data.modo
          this.modoLive = data.modo
          this.mostrar = true
      }
    })

        this.socket
    .on('cambiarStatusEvent', (data) => {
      console.log("cambiar status")
      console.log(data)
      if(data.codigo == this.$route.params.cod){
        this.mostrar = false
          this.statusEvent = data.status
          this.mostrar = true
      }
    })



        this.socket
    .on('generarGanadorSorteo', (data) => {
      console.log("Generar ganadores")
      console.log(data)
      if(data.codigo == this.$route.params.cod){
        this.$refs['modoLiveFront'].$refs['sorteosFront'].generarGanador(data.id_encuesta, data.ganadores)
      }
    })

  },
};
</script>

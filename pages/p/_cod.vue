<template>
<div>
  <div v-if="statusEvent == 1">
       <get-evento v-if="userTipo != 0" :id_evento="id_evento" :encuestas="encuestas"></get-evento>
        <get-evento-not-user v-else></get-evento-not-user>
  </div>
  <div v-else style="    margin-top: 50px;    margin-bottom: 50px;    text-align: center;">

    <h1>Evento No Disponible</h1>
  </div>
       
</div>
</template>

<script>
import getEvento from '../../components/eventos/getEvento.vue';
import GetEventoNotUser from '../../components/eventos/getEventoNotUser.vue';
import { mapState } from 'vuex'
export default {
  components: { getEvento, GetEventoNotUser },
  async asyncData({ params, store, redirect, app }) {


    const response =  await app.$axios.$get("get_event_by_cod_front?codigo="+params.cod)

    console.log("res", response)
    if(response.status == 0){
       return redirect('/')
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

      return {userTipo: tipoUser, id_evento: response.id_evento, encuestas: response.encuestas, statusEvent: response.statusEvent}
    }
   
  },
   head: {
    script: [
       {src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js'},
    ],
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
  },
};
</script>

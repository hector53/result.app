<template>
  <div class="cubreModoLive">
    <header-live  @activarFullScreen="toggle"  @activarEvento="activarEvento"></header-live>
   <content-live-off ref="contentLive" ></content-live-off>

    <div class="footerLive"> 
      <div class="centerFooter"> 
         <h1>Result</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { api as fullscreen } from 'vue-fullscreen'
import ContentLiveOff from '../../../components/live/contentLiveOff.vue';
import HeaderLive from "../../../components/live/headerLive.vue";
export default {
  middleware: "miauth",
  layout: "dashboardEvent",
  components: { HeaderLive, ContentLiveOff },

   async asyncData({ params, store, redirect, app }) {
      var tokenUser = app.$cookies.get("r_auth");
    app.$axios.setToken(tokenUser, "Bearer");
    const response =  await app.$axios.$get("get_event_by_cod?codigo="+params.cod)
    
    console.log("res", response)
    if(response.status == 0){
       return redirect('/dashboard')
    }else{
    
        app.store.commit("seteventLiveMode", response.modo );
        app.store.commit("setEncuestaActiveLiveMode", response.encuestaActiva );
         app.store.commit("setarrayEncuestaActiveLiveMode", response.tipoEncuesta );
 app.store.commit("setcandadoModoLive", response.statusEvent );
        //hacer un tipo encuesta live en el store para actualizarlo mas facil 
        return{id_evento: response.id}
    }
   
  },

  data() {
    return {
      fullscreen: false,
      teleport: true,
	};
  },

  methods: {
    toggle () {
      fullscreen.toggle(this.$el.querySelector('.fullscreen-wrapper'), {
        teleport: this.teleport,
        callback: (isFullscreen) => {
          this.fullscreen = isFullscreen
        },
      })
    },
    async getEventByCod(){
         await   this.$axios.$get("get_event_by_cod?codigo="+this.$route.params.cod)
        .then((response) => {
          console.log(response)
          if(response.status == 1){
            this.$store.commit("setarrayEncuestaActiveLiveMode", response.tipoEncuesta );
            this.$store.commit("setEncuestaActiveLiveMode", response.encuestaActiva );
          }
        })
    },
  async  activarEvento(val){
      console.log(val)
      if(val == 1){
             this.$store.commit('seteventLiveMode', 1);
              this.$store.commit("setcandadoModoLive", 1 );
             //y aparte cambiar el resultado en la db 
          const response = await this.$axios.$post("modo_live_evento", {
          modoLive: 1, 
          codigo: this.$route.params.cod
          });
          this.getEventByCod()
          
      }
      if(val == 2){
        this.$store.commit('seteventLiveMode', 0);
        this.$store.commit("setcandadoModoLive", 0 );
         const response = await this.$axios.$post("modo_live_evento", {
          modoLive: 0, 
          codigo: this.$route.params.cod
          });
      }
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
      if(data.id_evento == this.id_evento){
         this.$refs['contentLive'].$refs['encuestaFront_'+data.id_encuesta][0].getEncuestaById(data.id_encuesta)
      }
    })

     var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
  },
};
</script>

<style>

</style>


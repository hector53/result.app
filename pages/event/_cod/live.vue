<template>
  <div class="cubreModoLive">
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <header-live
      ref="headerLive"
      @recargarEncuestasByModal="getEventByCod"
      @activarFullScreen="toggle"
      @activarEvento="activarEvento"
    ></header-live>
    <i
      class="fa fa-arrow-left irAtrasLive"
      aria-hidden="true"
      title="Ir Al Dashboard"
      alt="Ir Al Dashboard"
      @click="irAtras"
    ></i>

    <div class="stepByStep">{{$store.state.encuestaActiveLiveMode}} / {{$store.state.arrayEncuestaActiveLiveMode.length}}</div>
    <content-live-off
      ref="contentLive"
      v-if="content"
      :id_evento="id_evento"
    ></content-live-off>
    <reaccion
      v-for="(item, index) in arrayReacciones"
      :key="index + 10000"
      :reaccion="item.reaccion"
      :posicion="index + 10000"
      @quitarReaccion="quitarReaccion"
    ></reaccion>
  
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import { api as fullscreen } from "vue-fullscreen";
import ContentLiveOff from "../../../components/live/contentLiveOff.vue";
import HeaderLive from "../../../components/live/headerLive.vue";
import reaccion from "../../../components/reacciones/reaccion.vue";
export default {
  middleware: "miauth",
  layout: "layoutLimpio",
  components: { HeaderLive, ContentLiveOff, reaccion, Loading },

  async asyncData({ params, store, redirect, app }) {
    var tokenUser = app.$cookies.get("r_auth");
    app.$axios.setToken(tokenUser, "Bearer");
    const response = await app.$axios.$get(
      "get_event_by_cod?codigo=" + params.cod
    );

    console.log("res", response);
    if (response.status == 0) {
      return redirect("/dashboard");
    } else {
      if (response.status == 2) {
        //desactivar el evento
        ///    app.store.commit("seteventLiveMode", 0 );
        //  app.store.commit("setcandadoModoLive", 0 );
        app.store.commit("seteventLiveMode", response.modo);
        app.store.commit("setcandadoModoLive", response.statusEvent);
        return { id_evento: response.id };
      } else {
        app.store.commit("seteventLiveMode", response.modo);
        app.store.commit("setEncuestaActiveLiveMode", response.encuestaActiva);
        app.store.commit(
          "setarrayEncuestaActiveLiveMode",
          response.tipoEncuesta
        );
        app.store.commit("setcandadoModoLive", response.statusEvent);
        //hacer un tipo encuesta live en el store para actualizarlo mas facil
        return { id_evento: response.id };
      }
    }
  },
  head() {
    return {
      title: "Live - " + this.$route.params.cod + " - Resultapp",
    };
  },
  data() {
    return {
      fullscreen: false,
      teleport: true,
      content: true,
      conectados: 0,
        isLoading: true,
      arrayReacciones: [],
      intervalo: null, 
        conectado: 0,
      conectadoViejo: 0,
    };
  },

  methods: {
    quitarReaccion(index) {
      this.arrayReacciones.splice(index, 1);
    },
    animar(val, index) {
      this.arrayReacciones.push({ reaccion: val, index: index });
    },
    detectaTecla(event) {
      if (this.$store.state.eventLiveMode == 1) {
        // console.log(event.keyCode)
        //console.log(event.ctrlKey)
        if (event.keyCode === 39) {
          var encuestaActiva = this.$store.state.encuestaActiveLiveMode;
          var arrayEncuestas = this.$store.state.arrayEncuestaActiveLiveMode;
          var cantidadEncuestas =
            this.$store.state.arrayEncuestaActiveLiveMode.length;
          var index = arrayEncuestas.findIndex((x) => x.id === encuestaActiva);
          if (index + 1 < cantidadEncuestas) {
            console.log("puedo ir pa alante");
            var idNueva =
              this.$store.state.arrayEncuestaActiveLiveMode[index + 1].id;
            console.log(this.$refs.headerLive.selectActiveEncuesta(idNueva));
          }
          // console.log(index)
        }
        if (event.keyCode === 37) {
          var encuestaActiva = this.$store.state.encuestaActiveLiveMode;
          var arrayEncuestas = this.$store.state.arrayEncuestaActiveLiveMode;
          var cantidadEncuestas =
            this.$store.state.arrayEncuestaActiveLiveMode.length;
          var index = arrayEncuestas.findIndex((x) => x.id === encuestaActiva);
          if (index > 0) {
            console.log("puedo ir pa atras");
            var idNueva =
              this.$store.state.arrayEncuestaActiveLiveMode[index - 1].id;
            console.log(this.$refs.headerLive.selectActiveEncuesta(idNueva));
          }
        }
      }
    },

    irAtras() {
      this.socket.emit(
        "desconectar",
      );
      this.$router.push({ name: "event-cod" });
      clearInterval(this.intervalo);
    },
    toggle() {
      fullscreen.toggle(this.$el.querySelector(".fullscreen-wrapper"), {
        teleport: this.teleport,
        callback: (isFullscreen) => {
          this.fullscreen = isFullscreen;
        },
      });
    },
    async getEventByCod() {
      this.content = false;
      this.isLoading = true
      await this.$axios
        .$get("get_event_by_cod?codigo=" + this.$route.params.cod)
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.$store.commit(
              "setarrayEncuestaActiveLiveMode",
              response.tipoEncuesta
            );
            this.$store.commit(
              "setEncuestaActiveLiveMode",
              response.encuestaActiva
            );

            this.content = true;
          }
          if (response.status == 2) {
            //this.$store.commit("seteventLiveMode", 0 );
            //  this.$store.commit("setcandadoModoLive", 0 );
            this.$store.commit("setarrayEncuestaActiveLiveMode", []);
            this.content = true;
          }

          this.isLoading = false
        }).catch(({response}) => {
          console.log(response)
           this.isLoading = false
        })
    },
    async activarEvento(val) {
      console.log(val);
      if (val == 1) {
        this.$store.commit("seteventLiveMode", 1);
        this.$store.commit("setcandadoModoLive", 1);
        //y aparte cambiar el resultado en la db
        const response = await this.$axios.$post("modo_live_evento", {
          modoLive: 1,
          codigo: this.$route.params.cod,
        });
        await this.getEventByCod();
      }
      if (val == 2) {
        this.$store.commit("seteventLiveMode", 0);
        this.$store.commit("setcandadoModoLive", 0);
        const response = await this.$axios.$post("modo_live_evento", {
          modoLive: 0,
          codigo: this.$route.params.cod,
        });
        await this.getEventByCod();
      }

      this.$refs["contentLive"].enLinea = this.conectados;
    },
    beforeWindowUnload() {
      
      this.socket.emit(
        "desconectar",
      );
    },
     enviarPing(){
       console.log("enviando ping")
       this.socket.emit("ping", {     username: this.$store.state.p,    room: this.$route.params.cod,  },
            (resp) => {}
            );
    }, 
    timer(){
      this.intervalo = setInterval(() => {
        this.conectadoViejo = this.conectado;
        console.log("envie el ping: conectado=", this.conectado);

        this.enviarPing();
      }, 5000);
    },

      async enviarPing() {
  var response =    await this.socket.emit(
        "ping",
        { username: this.$store.state.p, room: this.$route.params.cod },
        (resp) => {
          console.log("recibiendo respuesta", resp);
          this.conectado++;
        }
      );
console.log("respuensasdasdas asd", response)
if(response.connected == false)
{
  console.log("ersta desconectado ,. vamos a conectarnos")
  this.socket = this.$nuxtSocket({
      channel: "/",
      reconnection: true,
      emitTimeout: 1000, // 1000 ms
      emitErrorsProp: "myEmitErrors",
    });
   this.socket.emit(
      "joinRoom",
      {
      username: this.$store.state.p, room: this.$route.params.cod
      },
      (resp) => {}
    );
}
    
    },
  },
  mounted() {
    window.addEventListener("keyup", this.detectaTecla);
    window.addEventListener("beforeunload", this.beforeWindowUnload);
    this.socket = this.$nuxtSocket({
      channel: "/",
      transports: [ 'polling'],
        credentials: true,
      persist: true,
      reconnection: true
    });
    var User = this.$store.state.p;
    var codigo = this.$route.params.cod;
    this.socket.emit(
      "joinRoom",
      {
        username: User,
        room: codigo,
      },
      (resp) => {}
    );

//this.timer()
  

     this.socket.on("pong", (data) => {
      console.log("recibi pong desde el servidor, clientes conectados: ", data.conectados);
         this.$store.commit("setusersOnline", data.conectados);
    });

   this.socket.on("activarModoPresentacion", (data) => {
      console.log("llego e modo stop presentacion", data)
        if(data.modo == 0){
          this.$store.commit("seteventLiveMode", 0);
        this.$store.commit("setcandadoModoLive", 0);
        }
          if(data.modo == 1){
          this.$store.commit("seteventLiveMode", 1);
        this.$store.commit("setcandadoModoLive", 1);
        }
    });

    
       this.socket.on("cambiarStatusEvent", (data) => {
      console.log("llego e cambiarStatusEvent", data)
        if(data.status == 0){
        this.$store.commit("setcandadoModoLive", 0);
        this.$store.commit("seteventLiveMode", 0);
        }
          if(data.status == 1){
        this.$store.commit("setcandadoModoLive", 1);
        }
    });

    this.socket.on("join_room_announcement", (data) => {
      console.log(data);
      console.log(
        `<b>${data.username}</b> has joined the room y conectados son ${data.conectados}`
      );

      this.$store.commit("setusersOnline", data.conectados);
    });

    this.socket.on("recibiReaccion", (data) => {
      console.log("recibi reaccion", data);
      this.animar(data.tipo);
    });

    this.socket.on("join_room_disconect", (data) => {
      console.log(data);
      console.log(
        `<b>${data.username}</b> se ha desconectado conectados son ${data.conectados}`
      );
      this.$store.commit("setusersOnline", data.conectados);
    });

    this.socket.on("respuestaDelVoto", (data) => {
      if (data.tipo == 1) {
        this.$refs["contentLive"].$refs[
          "encuestaFront_" + data.id_encuesta
        ][0].getEncuestaById(data.id_encuesta);
      }
      if (data.tipo == 2) {
        this.$refs["contentLive"].$refs[
          "encuestaFront_" + data.id_encuesta
        ][0].getRespuestaByIdEncuesta(data.id_encuesta);
      }

      if (data.tipo == 4) {
        this.$refs["contentLive"].$refs[
          "encuestaFront_" + data.id_encuesta
        ][0].getDiayHoraByIdEncuesta(data.id_encuesta);
      }

      if (data.tipo == 5) {
        this.$refs["contentLive"].$refs[
          "encuestaFront_" + data.id_encuesta
        ][0].getPreguntasByIdEncuesta(data.id_encuesta);
      }
    });

    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");

     this.isLoading = false
  },
  destroyed() {
    window.removeEventListener("keyup", this.detectaTecla);
   window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
};
</script>

<style>
body.swal2-height-auto{
    height: 100%!important;
}
</style>


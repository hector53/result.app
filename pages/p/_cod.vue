<template>
  <div>
    <div :class="{ cubreModoLive: modoLive == 1 }">
      <header-live-front
        v-if="modoLive == 1"
        @activarFullScreen="activarFullScreen"
      ></header-live-front>
      <nav-bar v-else></nav-bar>

      <div v-if="mostrar">
        <div v-if="statusEvent == 1 && modoLive == 0">
           
          <get-evento
            ref="getEvento"
            v-if="userTipo != 0"
            :id_evento="id_evento"
            :encuestas="encuestas"
            :statusEvent="statusEvent"
          ></get-evento>
          <get-evento-not-user
            :id_evento="id_evento"
            :encuestas="encuestas"
            :statusEvent="statusEvent"
            v-else
          ></get-evento-not-user>
        </div>
        <div
          v-if="statusEvent == 0"
          style="margin-top: 50px; margin-bottom: 50px; text-align: center"
        >
          <h1>Evento Cerrado</h1>
          <get-evento
            ref="getEvento"
            v-if="userTipo != 0"
            :id_evento="id_evento"
            :encuestas="encuestas"
            :statusEvent="statusEvent"
          ></get-evento>
        </div>
        <div v-if="statusEvent == 1 && modoLive == 1" style="min-height: 500px">
           <div class="cubreContentLive" v-if="$store.state.arrayEncuestaActiveLiveMode.length==0">
            <div class="contentColumnLive">
            <h1>Entrá a <br />result.app <br />#{{$route.params.cod}}</h1>
            </div>
            <div class="contentColumnLive">

            <vue-qrcode :value="urlQr" class="imgQr"   />
            </div>
            </div>
          <modo-live-front v-else
            :key="componentKey"
            style="margin-top: 60px"
            ref="modoLiveFront"
            :id_evento="id_evento"
            :modoLive="modoLive"
          ></modo-live-front>

      <div class="boxR">
          <input type="checkbox" id="like" class="field-reactions">
          <h3 class="text-desc">Press space and after tab key to navigation</h3>
          <label for="like" class="label-reactions">Like</label>
          <div class="toolbox"></div>
          <label class="overlay" for="like"></label>
          <button class="reaction-like" @click="animar(0)"><span class="legend-reaction">Like</span></button>
          <button class="reaction-love" @click="animar(1)"><span class="legend-reaction">Love</span></button>
          <button class="reaction-haha" @click="animar(2)"><span class="legend-reaction">Haha</span></button>
          <button class="reaction-wow" @click="animar(3)"><span class="legend-reaction">Wow</span></button>
          <button class="reaction-sad" @click="animar(4)"><span class="legend-reaction">Sad</span></button>
          <button class="reaction-angry" @click="animar(5)"><span class="legend-reaction">Angry</span></button>
      </div>

      <reaccion v-for="(item, index) in arrayReacciones" :key="index+5000" :reaccion="item.reaccion"
       :posicion="index+5000" @quitarReaccion="quitarReaccion"></reaccion>
        </div>
      </div>

      <div class="footerLive" v-if="modoLive == 1">
        <div class="centerFooter">
          <h1>Result</h1>
     
        </div>
      </div>
    </div>
    <footer-t v-if="modoLive == 0"></footer-t>
  </div>
</template>

<script>
import getEvento from "../../components/eventos/getEvento.vue";
import GetEventoNotUser from "../../components/eventos/getEventoNotUser.vue";
import { api as fullscreen } from "vue-fullscreen";
import ModoLiveFront from "../../components/live/modoLiveFront.vue";
import VueQrcode from 'vue-qrcode'
import Reaccion from '../../components/reacciones/reaccion.vue';
export default {
  layout: "live",
  components: { getEvento, GetEventoNotUser, ModoLiveFront,VueQrcode, Reaccion },
  async asyncData({ params, store, redirect, app }) {
    const response = await app.$axios.$get(
      "get_event_by_cod_front?codigo=" + params.cod
    );
    console.log("res", response);
    if (response.status == 0) {
      return redirect("/");
    } else {
      if (response.status == 2) {
        return {
          userTipo: tipoUser,
          id_evento: response.id_evento,
          encuestas: response.encuestas,
          statusEvent: response.statusEvent,
          modoLive: response.modo,
        };
      } else {
        var tipoUser;
        if (response.tipoUser == 0) {
          console.log("tipo usuaro sin regisrar");
          //usuario no registrado
          tipoUser = 0;
        } else {
          //usuario registrado
          tipoUser = response.tipoUser;
        }

        app.store.commit("setarrayEncuestaActiveLiveMode", response.encuestas);
        return {
          userTipo: tipoUser,
          id_evento: response.id_evento,
          encuestas: response.encuestas,
          statusEvent: response.statusEvent,
          modoLive: response.modo,
        };
      }
    }
  },
 
  data() {
    return {
      mostrar: true,
      fullscreen: false,
      componentKey: 0,
        urlQr: 'https://result.app/p/'+this.$route.params.cod, 
        arrayReacciones:[]
    };
  },

  methods: {
    quitarReaccion(index){
      this.arrayReacciones.splice(index,1)
    },
    animar(val, index){
      this.socket.emit(
        "enviarReaccion",
        {
          username: this.$store.state.p,
          room: this.$route.params.cod,
          tipo: val
        },
        (resp) => {}
      );

      this.arrayReacciones.push({"reaccion": val, "index": index})


    },
    async getEncuestasByIdEvent() {
      const response = await this.$axios.$get(
        "get_event_by_cod_front?codigo=" + this.$route.params.cod
      );

      this.$store.commit("setarrayEncuestaActiveLiveMode", response.encuestas);
    },

    activarFullScreen() {
      fullscreen.toggle(this.$el.querySelector(".fullscreen-wrapper"), {
        teleport: this.teleport,
        callback: (isFullscreen) => {
          this.fullscreen = isFullscreen;
        },
      });
    },
    beforeWindowUnload() {
      this.socket.emit(
        "desconectar",
        {
          username: this.$store.state.p,
          room: this.$route.params.cod,
        },
        (resp) => {}
      );
    },
  },
  mounted() {
    //  window.addEventListener("beforeunload", this.beforeWindowUnload);
    console.log("tipo usuario", this.userTipo);
    console.log("id usuario", this.$store.state.p);
    var User = this.$store.state.p;
    console.log("usuario", User);
    var codigo = this.$route.params.cod;
    this.socket = this.$nuxtSocket({
      channel: "/",
    });

    console.log("socket", this.socket);

    this.socket.emit(
      "joinRoom",
      {
        username: User,
        room: codigo,
      },
      (resp) => {}
    );

    this.socket.on("cambiarEncuestaActiva", (data) => {
      console.log("cambiando encuesta Activa del Room", data.codigo);
      this.statusEvent = 1;
      this.modoLive = 1;
      this.componentKey += 1;
      this.$store.commit("setcontadorModoLiveFront", 0);
      console.log("modo live front componente", this.$refs["modoLiveFront"]);
      //     this.$refs["modoLiveFront"].getEncuestaByEventLive(data.codigo);
    });
    this.socket.on("GuardarEncuesta", (data) => {
      console.log(
        "Crearon una encuesta, la guardaron pero no la activaron",
        data.codigo
      );
      this.getEncuestasByIdEvent();
    });
    this.socket.on("CrearEncuestayActivar", (data) => {
      console.log("Crearon una encuesta y la activaron", data.codigo);
      this.$store.commit("setcontadorModoLiveFront", 1);
      this.componentKey += 1;
      this.getEncuestasByIdEvent();
    });

    this.socket.on("EliminarEncuestaActiva", (data) => {
      console.log("eliminaron una encuesta", data.codigo);
      this.$store.commit("setcontadorModoLiveFront", 1);
      //    this.$refs["modoLiveFront"].getEncuestaByEventLive(data.codigo);
      this.componentKey += 1;
      this.getEncuestasByIdEvent();
    });

    this.socket.on("sinEncuestasAlEliminar", (data) => {
      this.$store.commit("setarrayEncuestaActiveLiveMode", []);
      console.log("eliminaron todas las encuestas", data.codigo);
      this.componentKey += 1;
      this.$store.commit("setcontadorModoLiveFront", 0);
      this.getEncuestasByIdEvent();
    });

    this.socket.on("editandoEncuesta", (data) => {
      console.log("editaron una encuesta y guardaron cambios", data.codigo);
      this.$store.commit("setcontadorModoLiveFront", 1);
      //     this.$refs["modoLiveFront"].getEncuestaByEventLive(data.codigo);
      this.componentKey += 1;
    });

    this.socket.on("cambioDeEncuesta", (data) => {
      this.$store.commit("setcontadorModoLiveFront", 1);
      //     this.$refs["modoLiveFront"].getEncuestaByEventLive(data.codigo);
      this.componentKey += 1;
    });

    this.socket.on("join_room_announcement", (data) => {
      console.log(
        `<b>${data.username}</b> has joined the room y conectados son ${data.conectados}`
      );

      this.$store.commit("setusersOnline", data.conectados);
    });

    this.socket.on("activarModoPresentacion", (data) => {
      this.mostrar = false;
      this.statusEvent = data.modo;
      this.modoLive = data.modo;
      this.mostrar = true;
    });

    this.socket.on("cambiarStatusEvent", (data) => {
      console.log("cambiar status del room", data.codigo);
      console.log(data);
      if (data.status == 0) {
        this.modoLive = 0;
      }
      this.mostrar = false;
      this.statusEvent = data.status;
      this.mostrar = true;
    });

    console.log("routename", this.$route);
    this.socket.on("generarGanadorSorteo", (data) => {
      console.log("Generar ganadores");
      console.log(data);
      this.$refs["modoLiveFront"].$refs["sorteosFront"].generarGanador(
        data.id_encuesta,
        data.ganadores
      );
    });
  },
};
</script>

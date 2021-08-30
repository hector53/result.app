<template>
  <div>
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <section class="section-hero decor" v-if="isLoading == false">
      <h1 class="pb-5">{{ titulo_encuesta }}</h1>
      <div class="containerHec">
        <div class="rowHec flex-stretch">
          <div
            class="large-2-5 columnFlex"
            v-for="(item, index) in dias"
            :key="index"
          >
            <div class="cubreDias">
              <h3 class="diaCalendario">{{ item.dia }}</h3>
              <p>{{ item.mes }}</p>
              <h4
                class="horaCalendario"
                v-for="(itemh, index2) in item.horas"
                :key="index2 + 1000"
                @click="votarHora(itemh.id)"
                :class="{ active: itemh.siVote }"
              >
                <span>{{ itemh.hora }}:{{ itemh.minutos }} </span>
                <span v-if="itemh.votoGanador == 1">⭐</span>
                <span class="cantVotosHoras">{{ itemh.cantVotos }} </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <h4>Total Votos: {{ votosTotales }}</h4>
        <h4>Total Usuarios: {{ usuariosTotales }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: [
    "titulo_encuesta",
    "id_encuesta",
    "id_evento",
    "modoLive",
    "statusEvent",
    "notUser",
  ],
  data() {
    return {
      dias: [],
      isLoading: false,
      modoenVivo: 0,
      votosTotales: 0,
      usuariosTotales: 0,
      soyYo: false
    };
  },
  components: { Loading },
  methods: {
       detectaTecla(event) {
      console.log(event.keyCode);
      console.log(event.ctrlKey);
      if (event.keyCode === 39) {
        this.$emit("teclas", 39);
      }
      if (event.keyCode === 37) {
        this.$emit("teclas", 37);
      }
    },
    async votarHora(id) {
      if (this.statusEvent == 1) {
        if(this.modoLive == 0){
          this.isLoading = true
        }
        await this.$axios
          .$post("votar_encuesta_dia_y_hora_front", {
            hora: id,
            codigo: this.$route.params.cod,
            id_evento: this.id_evento,
            id_encuesta: this.id_encuesta,
            p: this.$store.state.p,
            liveMode: this.modoenVivo,
            login: this.$store.state.login,
          })
          .then((response) => {

                 
               
            if(response.status == 5){
                this.$swal({
            type: "error",
            title: "Oops...",
            text: "Ya has realizado votos en esta encuesta con la misma ip",
          });
          return false
            }else{
               if(this.modoLive == 0){
                    this.isLoading = false
                    this.getDiayHoraByIdEncuesta(this.id_encuesta)
                  }
            }
            this.soyYo = true
          //  this.getDiayHoraByIdEncuesta(this.id_encuesta);
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },

    async getDiayHoraByIdEncuesta(id) {
      console.log("la ifde es: ", id)
        if(this.soyYo){
          this.isLoading = true;
      }
      await this.$axios
        .$get(
          "get_datos_diayhora_by_id_encuesta?id_evento=" +
            this.id_evento +
            "&p=" +
            this.$store.state.p +
            "&id_encuesta=" +
            id
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {

            //asdasd
            this.dias = response.dias;
            this.votosTotales = response.votosTotales;
            this.usuariosTotales = response.usuariosTotales;
            this.$emit("ocultarLoader");
            this.isLoading = false;
          }
        }).catch(({response}) => {
          console.log(response)
        })
    },
  },
  mounted() {
    console.log("modo live es",this.modoLive, "la id es ", this.id_encuesta)
    if (this.modoLive == 1) {
      this.modoenVivo = this.modoLive;
    }
     window.addEventListener("keyup", this.detectaTecla);
    this.getDiayHoraByIdEncuesta(this.id_encuesta);
  },
   destroyed() {
    window.removeEventListener("keyup", this.detectaTecla);
  },
};
</script>

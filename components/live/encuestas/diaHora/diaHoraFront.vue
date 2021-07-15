<template>
  <div>
       <section class="section-hero decor" >
    <h1 class="pb-5" >{{ titulo_encuesta }}</h1>
    <div class="containerHec">
      <div class="rowHec flex-stretch">
        <div class="large-2-5 columnFlex" v-for="(item, index) in dias" :key="index">
          <div class="cubreDias">
            <h3 class="diaCalendario">{{ item.dia }}</h3>
            <p>{{ item.mes }}</p>
            <h4 class="horaCalendario"  v-for="(itemh, index2) in item.horas" :key="index2 + 1000"
            @click="votarHora(itemh.id)"
            :class="{'active': itemh.siVote }"
            >
              <span>{{ itemh.hora }}:{{ itemh.minutos }} </span>
              <span v-if="itemh.votoGanador == 1">⭐</span>
              <span class="cantVotosHoras">{{itemh.cantVotos}} </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div style="    display: flex;
    justify-content: space-between;">
      <h4>Total Votos: {{votosTotales}} </h4>
    <h4 >Total Usuarios: {{usuariosTotales}} </h4>
    </div>
    
    
    </section>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["titulo_encuesta", "id_encuesta", "id_evento", "modoLive", "statusEvent"],
  data() {
    return {
      dias: [],
      isLoading: true,
      modoenVivo: 0, 
      votosTotales: 0, 
      usuariosTotales: 0
    };
  },
  components: { Loading },
  methods: {
 
    async votarHora(id){
        if(this.statusEvent == 1){

                  const response = await this.$axios.$post("votar_encuesta_dia_y_hora_front", {
        hora: id,
        codigo: this.$route.params.cod,
        id_evento: this.id_evento,
        id_encuesta: this.id_encuesta,
         p: this.$store.state.p, 
         liveMode: this.modoenVivo,
      });
      console.log("id del voto", response)
          this.getDiayHoraByIdEncuesta(this.id_encuesta)
        }
      
    },
    
    async getDiayHoraByIdEncuesta(id) {
      this.isLoading = true;
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
            this.votosTotales = response.votosTotales
            this.usuariosTotales = response.usuariosTotales
          }
        });
    },
  },
  mounted() {
       if(this.modoLive == 1){
        this.modoenVivo = this.modoLive
    }
    this.getDiayHoraByIdEncuesta(this.id_encuesta);
  },
};
</script>

<template>
  <div>
    <h1 class="headingM has-text-left">Encuesta Q&A</h1>
    <div class="control mt-5">
      <input class="input" type="text" v-model="titulo" @keyup.enter="crearEncuesta(0)" placeholder="Título" />
    </div>

    <div class="button-group-live" style="margin-top: 50px">
      <button class="buttonN blue" @click="crearEncuesta(0)">Guardar</button>
      <button class="buttonN play" @click="crearEncuesta(1)">
        <i class="fa fa-play" aria-hidden="true"></i> &nbsp;Activar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "",
    };
  },
  methods: {
    async crearEncuesta(val) {
      if (this.titulo == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes escribir un Título",
        });
        return false;
      }
      let loader = this.$loading.show({
        loader: "dots",
        color: "#59b1ff",
      });

      await this.$axios
        .$post("create_poll_qya_live", {
          pregunta: this.titulo,
          codigo: this.$route.params.cod,
          activar: val,
        })
        .then((response) => {
          if (response.status == 1) {
            if (val == 1) {
              this.$store.commit("seteventLiveMode", 1);
              this.$store.commit("setcandadoModoLive", 1);
            }
            loader.hide();
            this.$emit("cerrarModal");
          } else {
            loader.hide();
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Error en los datos ingresados",
              confirmButtonText: `OK`,
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
  mounted() {},
};
</script>

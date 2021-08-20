<template>
  <div class="container">
    <h1 class="headingM has-text-left">Sorteo</h1>
    <div class="control">
      <input
        class="input"
        type="text"
        v-model="titulo"
        placeholder="Título del soreto"
      />
    </div>
    <h3 class="headingM has-text-left">Lista de participantes</h3>
    <textarea
      class="textarea"
      v-model="participantes"
      id="participantes"
      placeholder="Participantes linea por linea"
      rows="10"
    ></textarea>
    <h3 class="headingM has-text-left mt-3">Número de Premios</h3>
    <div class="control">
      <input
        class="input"
        type="number"
        v-model="premios"
        placeholder="Cantidad de Premios"
      />
    </div>
    <div class="button-group">
      <button class="buttonN blue" @click="guardarSorteo(0)">Guardar</button>
      <button class="buttonN" @click="borrarNombres">
        Borrar Participantes
      </button>
      <button class="buttonN play" @click="guardarSorteo(1)">
        <i class="fa fa-play" aria-hidden="true"></i> &nbsp;Activar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participantes: "",
      premios: 1,
      titulo: "",
    };
  },
  methods: {
    borrarNombres() {
      $("#participantes").val("");
    },
    async guardarSorteo(val) {
      if (this.titulo == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes agregar un título",
        });
        return false;
      }
      if (this.participantes == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes agregar participantes",
        });
        return false;
      }
      var lines = [];
      $.each($("#participantes").val().split(/\n/), function (i, line) {
        if (line) {
          lines.push(line);
        } else {
          lines.push("");
        }
      });
      if (lines.length <= 1) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes agregar al menos 2 participantes",
        });
        return false;
      }

      if (this.premios > lines.length) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "El numero de premios no puede ser mayor que los participantes",
        });
        return false;
      }

      await this.$axios
        .$post("create_sorteo_live", {
          titulo: this.titulo,
          participantes: JSON.stringify(lines),
          premios: this.premios,
          codigo: this.$route.params.cod,
          activar: val,
          id_encuesta: 0
        })
        .then((response) => {
          if (response.status == 1) {
            if (val == 1) {
              this.$store.commit("seteventLiveMode", 1);
              this.$store.commit("setcandadoModoLive", 1);
            }
            this.isLoading = false;
            this.$emit("cerrarModal");
          } else {
            this.isLoading = false;
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

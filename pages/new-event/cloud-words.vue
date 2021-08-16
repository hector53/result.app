<template>
  <section class="section-hero">
    <loading :active="isLoading" color="#59b1ff" loader="dots" />
    <div class="container">
      <div class="div-block-5">
        <a href="/" class="link">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          {{ $store.state.idioma.back }}</a
        >
      </div>
      <div class="form-block w-form has-text-left">
        <h1 class="headingM has-text-left">
         {{ $store.state.idioma.titleCloudWords }}
      </h1>
        <div class="div-block-4">
          <label for="name" class="field-label has-text-left">{{
            $store.state.idioma.questionLabel
          }}</label>
          <input
            type="text"
            class="text-field title w-input"
            maxlength="256"
            ref="pregunta"
            v-model="preguntaEncuesta"
            :placeholder="$store.state.idioma.placeholderQuestion"
          />
        </div>

        <div class="button-group">
          <button class="buttonN blue" @click="crearQYA">{{ $store.state.idioma.btnCreateCloudWords }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      preguntaEncuesta: "",
      isLoading: false,
      ipWeb: "",
      zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
  components: { Loading },

  methods: {
    async crearQYA() {
          if (this.preguntaEncuesta == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes realizar una pregunta",
        });
        return false;
      }
      this.isLoading = true
      var cookieNotUser = this.$cookies.get("_r_u");
      await this.$axios
        .$post("create_nube_not_user", {
          titulo: this.preguntaEncuesta,
          cookieNotUser: cookieNotUser,
          ipWeb: this.ipWeb,
          zonaHoraria: this.zonaHoraria,
        })
        .then((response) => {
          if (response.status == 1) {
            location.href = "/p/" + response.codigo;
          } else {
            this.isLoading = false;
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Ya tienes un usuario registrado en este dispositivo debes iniciar sesion",
              confirmButtonText: `OK`,
            }).then((result) => {
              if (result.isConfirmed) {
                location.href = "/login";
              }
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    async getIp() {
      await fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          this.ipWeb = ip;
        });
    },
  },
  mounted() {
    this.$refs.pregunta.focus();
    this.getIp();
  },
};
</script>

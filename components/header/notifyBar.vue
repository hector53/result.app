<template>
  <div class="notification-bar">
    <div class="container-2 w-container">
      <div class="text-block-13">{{ $store.state.idioma.titleJoinEvent }}</div>
     
      <div id="appB">
         <div class="hashJoinEvent">#</div>
        <input
          type="text"
          class="div-block-13"
          v-model="buscar"
          @keyup.enter="buscarCodigo"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buscar: "",
    };
  },
  methods: {
    async buscarCodigo() {
      if (this.buscar == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes introducir un codigo",
        });
        return false;
      }
       let loader = this.$loading.show({
        loader: "dots",
        color: "#59b1ff",
      });
      await this.$axios
        .$get("get_event_by_codigo_buscador?codigo=" + this.buscar)
        .then((response) => {
          //   console.log(response)
          //loader.hide()
          if (response.status == 1) {
            location.href = "/p/" + this.buscar;
          } else {
             this.$buefy.toast.open({
                    duration: 5000,
                    message: `Codigo de evento no existe`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
             loader.hide()
          }
        }).catch(({response}) =>{
          loader.hide()
          console.log(response)
        })
    },
  },
  mounted() {},
};
</script>

 
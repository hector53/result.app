<template>
  <div>
    <loading :active="isLoading" color="#59b1ff" />
    <div
      class="columns"
      style="margin-top: 60px; padding-left: 10px; padding-right: 10px"
    >
      <div class="column is-3">
        <div class="evento" @click="addNewEncuesta(1)">
          <div class="bloque-evento">
            <div class="text-block">
              <strong class="bold-text-6"
                >{{ $store.state.idioma.pollHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2">
              {{ $store.state.idioma.pollSubBlock }}
            </div>
          </div>
          <div class="tag is-danger">
            <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="evento" @click="addNewEncuesta(2)">
          <div
            class="bloque-evento"
            style="background-color: rgba(251, 198, 202, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6" style="color: #61060e"
                >{{ $store.state.idioma.cloudHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2" style="color: #61060e">
              {{ $store.state.idioma.cloudSubBlock }}
            </div>
          </div>
          <div class="tag is-danger">
            <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="evento" @click="addNewEncuesta(4)">
          <div
            class="bloque-evento"
            style="background-color: rgba(222, 205, 245, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6"
                >{{ $store.state.idioma.dateHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2">
              {{ $store.state.idioma.dateSubBlock }}
            </div>
          </div>
          <div class="tag is-danger">
            <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="evento" @click="addNewEncuesta(5)">
          <div
            class="bloque-evento"
            style="background-color: rgba(192, 235, 223, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6" style="color: #0a674e"
                >{{ $store.state.idioma.qaHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2" style="color: #0a674e">
              {{ $store.state.idioma.qaSubBlock }}
            </div>
          </div>
          <div class="tag is-info">
            <div class="text-block-3">
              {{ $store.state.idioma.tagRegistro }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns" style="padding-left: 10px; padding-right: 10px">
      <div class="column is-3">
        <div class="evento">
          <div
            class="bloque-evento"
            style="background-color: rgba(253, 226, 194, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6" style="color: #8f5702"
                >{{ $store.state.idioma.rateHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2" style="color: #8f5702">
              {{ $store.state.idioma.rateSubBlock }}
            </div>
          </div>
          <div class="tag is-info">
            <div class="text-block-3">
              {{ $store.state.idioma.tagRegistro }}
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="evento" @click="addNewEncuesta(3)">
          <div
            class="bloque-evento"
            style="background-color: rgba(203, 243, 248, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6" style="color: #0b676f"
                >{{ $store.state.idioma.giveHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2" style="color: #0b676f">
              {{ $store.state.idioma.giveSubBlock }}
            </div>
          </div>
          <div class="tag is-info">
            <div class="text-block-3">
              {{ $store.state.idioma.tagRegistro }}
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="evento">
          <div
            class="bloque-evento"
            style="background-color: rgba(228, 235, 188, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6" style="color: #495a06"
                >{{ $store.state.idioma.quizzHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2" style="color: #495a06">
              {{ $store.state.idioma.quizzSubBlock }}
            </div>
          </div>
          <div class="tag is-success">
            <div class="text-block-3">{{ $store.state.idioma.tagPro }}</div>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="evento">
          <div
            class="bloque-evento"
            style="background-color: rgba(240, 187, 225, 0.25)"
          >
            <div class="text-block">
              <strong class="bold-text-6" style="color: #590647"
                >{{ $store.state.idioma.triviaHeadBlock }}<br
              /></strong>
            </div>
            <div class="text-block-2" style="color: #590647">
              {{ $store.state.idioma.triviaSubBlock }}
            </div>
          </div>
          <div class="tag is-success">
            <div class="text-block-3">{{ $store.state.idioma.tagPro }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async crearEvento(val) {
      var dataUser = this.$cookies.get("r_user");
      var nameEvento = dataUser.username;
      this.isLoading = true;
      await this.$axios
        .$post("crear_evento", {
          titulo: nameEvento,
          descripcion: "",
        })
        .then((response) => {
          this.isLoading = false;
          if (response.status != 0) {
            this.$router.push("/event/" + response.codigo + "?type=" + val);
          } else {
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Estas haciendo trampa xD",
            });
          }
        })
        .catch(({ response }) => {
         // console.log("fail");
        //  console.log(response.status);
          if (response.status == 401) {
            this.$cookies.remove("r_auth");
            location.href = "/login";
          }
        });
    },
     async getEncuestasNotUser(val){
      var cookieNotUser = this.$cookies.get("_r_u");
         await this.$axios
        .$get("events_not_registered?cookieNotUser=" + cookieNotUser)
        .then((response) => {
          console.log(response)
          if(response.status == 1){
                  if (response.cantEncuestas >= 3){
                  this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Solo puedes crear 3 encuestas con el plan sin registro',
                  footer: '<a href="/signup" style="color:#59b1ff">Aún no tienes cuenta ? registrate aquí</a>'
                  })

                  }else{
                    if(val==1){this.$router.push("/new-event/multiple-choice");}
                    if(val==2){this.$router.push("/new-event/cloud-words");}
                    if(val==4){this.$router.push("/new-event/date");}
                  
                  }
          }else{
            return 0
          }
          
        }).catch(({response}) => {
          console.log(response)
        })
    },
    addNewEncuesta(val) {
      if (this.$route.name == "index") {
        if (val == 1) {
          if (this.$store.state.login) {
            this.crearEvento(1);
          } else {
            //get cantidad de encuestas creadas
             this.getEncuestasNotUser(1)
            
          }
        }

        if (val == 2) {
          if (this.$store.state.login) {
            this.crearEvento(2);
          } else {
            //enviar a registrarse
            this.getEncuestasNotUser(2)
          }
        }

        if (val == 3) {
          if (this.$store.state.login) {
            this.crearEvento(3);
          } else {
            //enviar a registrarse
            this.$router.push("/signup");
          }
        }

        if (val == 4) {
          if (this.$store.state.login) {
            this.crearEvento(4);
          } else {
            this.getEncuestasNotUser(4)
           
          }
        }

        if (val == 5) {
          if (this.$store.state.login) {
            this.crearEvento(5);
          } else {
            //enviar a registrarse
            this.$router.push("/signup");
          }
        }
      } else {
        this.$emit("addNewEncuesta", val);
      }
    },
    createPoll(id) {
      this.$emit("createPoll", id);
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

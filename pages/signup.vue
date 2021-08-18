<template>
  <section class="section-hero">
    <loading :active="isLoading" color="#59b1ff" />
    <div class="container cubreRegister">
      <h1 class="headingM">{{ $store.state.idioma.signupTitle }}</h1>
      <b-notification type="is-info is-light" aria-close-label="Close notification" v-if="$route.query.getPlan==2">
            Despues de registrarse sera redirigido al checkout para el plan Pro
        </b-notification>
      <p class="hero-subhead">{{ $store.state.idioma.signupSubTitle }}</p>
      <div class="form-block w-form" style="text-align: center">
        <div class="divR">
          <div style="display: flex; justify-content: space-between">
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              @keyup.enter="signup"
              class="text-field w-input"
              maxlength="50"
              :placeholder="$store.state.idioma.signupPlaceHolder1"
              required=""
              style="margin-right: 10px"
            />
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              @keyup.enter="signup"
              class="text-field w-input"
              maxlength="50"
              :placeholder="$store.state.idioma.signupPlaceHolder2"
              required=""
            />
          </div>

          <input
            type="text"
            id="email"
            v-model="email"
            @keyup.enter="signup"
            class="text-field w-input"
            maxlength="50"
            :placeholder="$store.state.idioma.signupPlaceHolder3"
            required=""
          />
          <input
            type="text"
            id="username"
            v-model="userName"
            @keyup.enter="signup"
            class="text-field w-input"
            maxlength="50"
            :placeholder="$store.state.idioma.signupPlaceHolder4"
            required=""
          />
          <input
            type="password"
            id="pass"
            v-model="pass"
            @keyup.enter="signup"
            class="text-field w-input"
            maxlength="50"
            :placeholder="$store.state.idioma.signupPlaceHolder5"
            required=""
          />
        </div>
      <p>Ya tienes una cuenta ? Inicia Sesion <nuxt-link to="/login">Aquí</nuxt-link></p>
        <div class="button-group">
          <button class="buttonN blue" @click="signup">
            {{ $store.state.idioma.signupButton }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  middleware: "guest",
  head() {
    return {
      title: "login",
    };
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      pass: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    async signup() {
      var validarRegistro = this.validarRegistro();
      if (validarRegistro) {
        this.isLoading = true;
        var cookieNotUser = this.$cookies.get("_r_u");
        await this.$axios
          .$post("register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            userName: this.userName,
            pass: this.pass,
            userCookie: cookieNotUser,
            ipUser: this.$store.state.ipUser,
            paisUser: this.$store.state.paisUser,
          })
          .then((response) => {
            if (response.status != 0) {
              this.isLoading = false;
              this.$cookies.set("r_auth", response.token, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
              });
              this.$cookies.set(
                "r_user",
                {
                  name: response.name,
                  email: response.email,
                  username: response.username,
                },
                {
                  path: "/",
                  maxAge: 10000 * 60 * 24 * 7,
                }
              );

              //if getPlan == 2 entonces hacer lo de stripe 
              if(this.$route.query.getPlan == 2){
                  location.href = "/upgrade";
              }else{
                location.href = "/dashboard";
              }
              
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },

    validarRegistro() {
      if (this.firstName == "") {
        $("#firstName").focus();
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Falta Nombres",
        });
        return false;
      }
      if (this.lastName == "") {
        $("#lastName").focus();
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Falta Apellidos",
        });
        return false;
      }
      if (this.email == "") {
        $("#email").focus();
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Falta Email",
        });
        return false;
      }
      if (!this.reg.test(this.email)) {
        $("#email").focus();
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Email incorrecto",
        });
        return false;
      }
      if (this.userName == "") {
        $("#username").focus();
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Falta Usuario",
        });
        return false;
      }

      if (this.pass == "") {
        $("#pass").focus();
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Falta Contraseña",
        });
        return false;
      }

      return true;
    },
  },
  mounted() {},
};
</script>

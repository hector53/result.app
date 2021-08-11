<template>
  <header class="nav-bar">
    <div class="container" style="max-width: 940px">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand mr-2 is-flex is-align-items-center">
          <nuxt-link to="/dashboard" class="is-flex is-align-items-center">
            <div class="logotipo"><div class="logotipo-fill"></div></div>
            <div class="company">result.app</div></nuxt-link
          >
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button
                class="button buttonLang"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
              >
                <span>
                  {{ languaje }}
                </span>
                <span class="icon is-small">
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <div id="appLang">
                  <a
                    class="dropdown-item"
                    @click="cambiarIdioma($store.state.lang)"
                  >
                    {{ languajeDrop }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a
            role="button"
            class="navbar-burger"
            @click="navBar = !navBar"
            :class="{ 'is-active': navBar }"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          class="navbar-menu is-hidden-desktop menuPhone"
          :class="{ dBlock: navBar }"
        >
          <div class="navbar-start">
            <div class="my-4">
              <a class="navbar-item title is-5 my-2" href="/">{{
                $store.state.idioma.productMenu
              }}</a>
            </div>
            <div class="my-4">
              <a class="navbar-item title is-5 my-2" href="/">{{
                $store.state.idioma.priceMenu
              }}</a>
            </div>

            <div class="btnsEvento">
              <nuxt-link
                class="navbar-item"
                :to="{ name: 'p-cod', params: { cod: $route.params.cod } }"
              >
                #{{ $route.params.cod }}
              </nuxt-link>
              <div class="navbar-item">
                <button
                  class="button is-info play"
                  @click="activarEvento(1)"
                  v-if="modoLive == 0"
                >
                  <i class="fa fa-play" aria-hidden="true"></i>
                </button>

                <button
                  class="button stop"
                  @click="activarEvento(2)"
                  v-if="modoLive == 1"
                >
                  <img
                    src="data:image/png;base64,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"
                    class="imageNarBar"
                    style="height: 20px"
                  />
                </button>
              </div>
            </div>

            <div
              class="navbar-item is-hidden-desktop"
              v-if="$store.state.login"
            >
              <nuxt-link
                to="/dashboard"
                class="button is-light is-fullwidth title is-5"
                >{{ $store.state.idioma.dashboardTitle }}</nuxt-link
              >
              <a
                @click="logout"
                class="button is-light is-fullwidth title is-5"
                >{{ $store.state.idioma.salirTitle }}</a
              >
            </div>

            <div class="navbar-item is-hidden-desktop" v-else>
              <nuxt-link
                to="/login"
                class="button is-light is-fullwidth title is-5"
                >{{ $store.state.idioma.loginMenu }}</nuxt-link
              >
              <nuxt-link
                to="/signup"
                class="button is-light is-fullwidth title is-5"
                >{{ $store.state.idioma.signupMenu }}</nuxt-link
              >
            </div>
          </div>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <a
              class="navbar-item"
              :href="'/p/' + $route.params.cod"
              target="_blank"
            >
              #{{ $route.params.cod }}
            </a>
            <div class="navbar-item">
              <button
                class="button is-info play mr-3"
                @click="activarEvento(1)"
                v-if="$store.state.eventLiveMode == 0"
              >
                <i class="fa fa-play" aria-hidden="true"></i>
              </button>

              <button
                class="button stop mr-3"
                @click="activarEvento(2)"
                v-if="$store.state.eventLiveMode == 1"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAYAAABUx/9/AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKL2lDQ1BJQ0MgUHJvZmlsZQAASMedlndUVNcWh8+9d3qhzTDSGXqTLjCA9C4gHQRRGGYGGMoAwwxNbIioQEQREQFFkKCAAaOhSKyIYiEoqGAPSBBQYjCKqKhkRtZKfHl57+Xl98e939pn73P32XuftS4AJE8fLi8FlgIgmSfgB3o401eFR9Cx/QAGeIABpgAwWempvkHuwUAkLzcXerrICfyL3gwBSPy+ZejpT6eD/0/SrFS+AADIX8TmbE46S8T5Ik7KFKSK7TMipsYkihlGiZkvSlDEcmKOW+Sln30W2VHM7GQeW8TinFPZyWwx94h4e4aQI2LER8QFGVxOpohvi1gzSZjMFfFbcWwyh5kOAIoktgs4rHgRm4iYxA8OdBHxcgBwpLgvOOYLFnCyBOJDuaSkZvO5cfECui5Lj25qbc2ge3IykzgCgaE/k5XI5LPpLinJqUxeNgCLZ/4sGXFt6aIiW5paW1oamhmZflGo/7r4NyXu7SK9CvjcM4jW94ftr/xS6gBgzIpqs+sPW8x+ADq2AiB3/w+b5iEAJEV9a7/xxXlo4nmJFwhSbYyNMzMzjbgclpG4oL/rfzr8DX3xPSPxdr+Xh+7KiWUKkwR0cd1YKUkpQj49PZXJ4tAN/zzE/zjwr/NYGsiJ5fA5PFFEqGjKuLw4Ubt5bK6Am8Kjc3n/qYn/MOxPWpxrkSj1nwA1yghI3aAC5Oc+gKIQARJ5UNz13/vmgw8F4psXpjqxOPefBf37rnCJ+JHOjfsc5xIYTGcJ+RmLa+JrCdCAACQBFcgDFaABdIEhMANWwBY4AjewAviBYBAO1gIWiAfJgA8yQS7YDApAEdgF9oJKUAPqQSNoASdABzgNLoDL4Dq4Ce6AB2AEjIPnYAa8AfMQBGEhMkSB5CFVSAsygMwgBmQPuUE+UCAUDkVDcRAPEkK50BaoCCqFKqFaqBH6FjoFXYCuQgPQPWgUmoJ+hd7DCEyCqbAyrA0bwwzYCfaGg+E1cBycBufA+fBOuAKug4/B7fAF+Dp8Bx6Bn8OzCECICA1RQwwRBuKC+CERSCzCRzYghUg5Uoe0IF1IL3ILGUGmkXcoDIqCoqMMUbYoT1QIioVKQ21AFaMqUUdR7age1C3UKGoG9QlNRiuhDdA2aC/0KnQcOhNdgC5HN6Db0JfQd9Dj6DcYDIaG0cFYYTwx4ZgEzDpMMeYAphVzHjOAGcPMYrFYeawB1g7rh2ViBdgC7H7sMew57CB2HPsWR8Sp4sxw7rgIHA+XhyvHNeHO4gZxE7h5vBReC2+D98Oz8dn4Enw9vgt/Az+OnydIE3QIdoRgQgJhM6GC0EK4RHhIeEUkEtWJ1sQAIpe4iVhBPE68QhwlviPJkPRJLqRIkpC0k3SEdJ50j/SKTCZrkx3JEWQBeSe5kXyR/Jj8VoIiYSThJcGW2ChRJdEuMSjxQhIvqSXpJLlWMkeyXPKk5A3JaSm8lLaUixRTaoNUldQpqWGpWWmKtKm0n3SydLF0k/RV6UkZrIy2jJsMWyZf5rDMRZkxCkLRoLhQWJQtlHrKJco4FUPVoXpRE6hF1G+o/dQZWRnZZbKhslmyVbJnZEdoCE2b5kVLopXQTtCGaO+XKC9xWsJZsmNJy5LBJXNyinKOchy5QrlWuTty7+Xp8m7yifK75TvkHymgFPQVAhQyFQ4qXFKYVqQq2iqyFAsVTyjeV4KV9JUCldYpHVbqU5pVVlH2UE5V3q98UXlahabiqJKgUqZyVmVKlaJqr8pVLVM9p/qMLkt3oifRK+g99Bk1JTVPNaFarVq/2ry6jnqIep56q/ojDYIGQyNWo0yjW2NGU1XTVzNXs1nzvhZei6EVr7VPq1drTltHO0x7m3aH9qSOnI6XTo5Os85DXbKug26abp3ubT2MHkMvUe+A3k19WN9CP16/Sv+GAWxgacA1OGAwsBS91Hopb2nd0mFDkqGTYYZhs+GoEc3IxyjPqMPohbGmcYTxbuNe408mFiZJJvUmD0xlTFeY5pl2mf5qpm/GMqsyu21ONnc332jeaf5ymcEyzrKDy+5aUCx8LbZZdFt8tLSy5Fu2WE5ZaVpFW1VbDTOoDH9GMeOKNdra2Xqj9WnrdzaWNgKbEza/2BraJto22U4u11nOWV6/fMxO3Y5pV2s3Yk+3j7Y/ZD/ioObAdKhzeOKo4ch2bHCccNJzSnA65vTC2cSZ79zmPOdi47Le5bwr4urhWuja7ybjFuJW6fbYXd09zr3ZfcbDwmOdx3lPtKe3527PYS9lL5ZXo9fMCqsV61f0eJO8g7wrvZ/46Pvwfbp8Yd8Vvnt8H67UWslb2eEH/Lz89vg98tfxT/P/PgAT4B9QFfA00DQwN7A3iBIUFdQU9CbYObgk+EGIbogwpDtUMjQytDF0Lsw1rDRsZJXxqvWrrocrhHPDOyOwEaERDRGzq91W7109HmkRWRA5tEZnTdaaq2sV1iatPRMlGcWMOhmNjg6Lbor+wPRj1jFnY7xiqmNmWC6sfaznbEd2GXuKY8cp5UzE2sWWxk7G2cXtiZuKd4gvj5/munAruS8TPBNqEuYS/RKPJC4khSW1JuOSo5NP8WR4ibyeFJWUrJSBVIPUgtSRNJu0vWkzfG9+QzqUvia9U0AV/Uz1CXWFW4WjGfYZVRlvM0MzT2ZJZ/Gy+rL1s3dkT+S453y9DrWOta47Vy13c+7oeqf1tRugDTEbujdqbMzfOL7JY9PRzYTNiZt/yDPJK817vSVsS1e+cv6m/LGtHlubCyQK+AXD22y31WxHbedu799hvmP/jk+F7MJrRSZF5UUfilnF174y/ariq4WdsTv7SyxLDu7C7OLtGtrtsPtoqXRpTunYHt897WX0ssKy13uj9l4tX1Zes4+wT7hvpMKnonO/5v5d+z9UxlfeqXKuaq1Wqt5RPXeAfWDwoOPBlhrlmqKa94e4h+7WetS212nXlR/GHM44/LQ+tL73a8bXjQ0KDUUNH4/wjowcDTza02jV2Nik1FTSDDcLm6eORR67+Y3rN50thi21rbTWouPguPD4s2+jvx064X2i+yTjZMt3Wt9Vt1HaCtuh9uz2mY74jpHO8M6BUytOdXfZdrV9b/T9kdNqp6vOyJ4pOUs4m3924VzOudnzqeenL8RdGOuO6n5wcdXF2z0BPf2XvC9duex++WKvU++5K3ZXTl+1uXrqGuNax3XL6+19Fn1tP1j80NZv2d9+w+pG503rm10DywfODjoMXrjleuvyba/b1++svDMwFDJ0dzhyeOQu++7kvaR7L+9n3J9/sOkh+mHhI6lH5Y+VHtf9qPdj64jlyJlR19G+J0FPHoyxxp7/lP7Th/H8p+Sn5ROqE42TZpOnp9ynbj5b/Wz8eerz+emCn6V/rn6h++K7Xxx/6ZtZNTP+kv9y4dfiV/Kvjrxe9rp71n/28ZvkN/NzhW/l3x59x3jX+z7s/cR85gfsh4qPeh+7Pnl/eriQvLDwG/eE8/s3BCkeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIXRFWHRDcmVhdGlvbiBUaW1lADIwMjE6MDY6MjQgMTQ6NTc6NTlTbKLXAAAEEklEQVR4Xu3Yz2vbdRzH8X6/33ybxNaFdi2FNlRUiJeB1YPIPOjBg4huChvMnWSCh14GnnUg/gHKmAge1NOG0MICPewy6UXFS+xgO3ioNKVrodV2ZCk2/Sbf7PX55pNK1rLm1DWf1+sB6efzfac9PfP90XjNZrOvW5VKZWhgYOA1z/MKeJ3EKN16R45QjGYPsS7V6/WFTCbzVxzHXUU8NHapVAqnpqYuIu4nOHwDq996R44D9LuP5UatVruG8OXW9GBPjN1oND7wff8bBH7OjuSYQscIy3dbW1tfDA8PV1rTTgfGLpfLmcnJyW8R+ZIdSY9Az0Vc3s+HYfinHe3ZF3tjY2NwZGRkDqHftCPpMWhaxX38bBAEv9hRouP+OzMzEyD0jEL3NvQbxO23GEXRK3aU6Dizsf8Sv3jFHkqPM5d03MNfbd/D92LjU3AqlUqVEDtMBuIE9L2KppfNfi821iKGZ5IDcQa6Rru7u4V0Or2U3LPxP9qLWN43e3GLuVL39/dPm30SG4/pFzD0zF6c9BEe2FrfhqHz28lInIS++Z2dnZfa/3q9bFdxFB6+p/zNzc0TKD9kZ+KuST+bzQ7aA3EYTuhnffwI7LG4ze/4ulTcpthEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhNRbCKKTUSxiSg2EcUmothEFJuIYhPxG41Gze7FYc1ms+aXy+UH2MR2Ju7a8hDaVF/0PO8FOxQH4Qr+Tvue/btdxUE4mRvVavWPJDYO5pKpuOrXXC73IIm9urpaRPB/k7E4B21/MGsSO5/P/4fB12YvbkHXpYWFhetmnzygGSsrK9mJiYm7elBzCx7MPgyC4KbZ78U26vX6abwxj+ChHUkPQ9sf0fKSPez8Bi2VSv2GX/gUr/8/AdKTkHB+eXl52h4mOs7stjiOP8Yn4nud4b0JTW+tr6+fGxsb27ajRMeZ3eb7/k+41r+FP/rbjqQHoFeE11ezs7PvPR7aOPDMbjMPbePj45/hDDevYTuWYwYNTcQinrk+D8PwXmu63xNjt62trT2DT8pZBH8Xh6/j9Tz2QfKmPBXo9g+WO1hvR1H0czqdPvQq3FXsx5VKpbBQKOTw5J6xIzki6NXY3t5+ODo6WrWjLvX1PQJN30i9IU5B1wAAAABJRU5ErkJggg=="
                  class="imageNarBar"
                  style="height: 20px"
                />
              </button>

              <button class="button is-info" @click="publicarEvento">
                <i
                  class="fa fa-lock"
                  aria-hidden="true"
                  v-if="$store.state.candadoModoLive == 0"
                ></i>
                <i class="fa fa-unlock" aria-hidden="true" v-else></i>
              </button>
            </div>

             <perfil-drop-down @logout="logout"></perfil-drop-down>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import ClickOutside from "vue-click-outside";
import perfilDropDown from './perfilDropDown.vue';
export default {
  components: { perfilDropDown },
  props: ["eventStatus", "eventModo"],
  data() {
    return {
      navBar: false,
      languaje: "English",
      languajeDrop: "Español",
      idioma: {},
      dropdownPublicar: false,
      publicarDesactivar: this.eventStatus,
      modoLive: this.eventModo,
    };
  },
    filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
},
  computed: {
    ...mapState(["login"]),
  },
  methods: {
    Presentar() {
      this.$emit("activarLoader");

      location.href = "/event/" + this.$route.params.cod + "/live";
    },
    async activarEvento(val) {
      this.$emit("activarEvento", val);
    },

    async modoLiveClick() {
      //pasar el modo del evento a 1 q seria el modo live activo
      if (this.modoLive == 0) {
        this.modoLive = 1;
      } else {
        this.modoLive = 0;
        return false;
      }
      this.$emit("activarLoader");

      location.href = "/event/" + this.$route.params.cod + "/live";
    },
    verEvento() {
      // Abrir nuevo tab
      var win = window.open("/p/" + this.$route.params.cod, "_blank");
      // Cambiar el foco al nuevo tab (punto opcional)
      win.focus();
    },
    guardarEvent() {
      this.$emit("guardarEvento");
    },
    clickHide() {
      console.log("click afuera");
      this.dropdownPublicar = false;
    },
    async publicarEvento() {
      this.$emit("publicarEvento");
    },
    async logout() {
      this.$cookies.remove("r_auth");
      location.href = "/login";
    },
    cambiarIdioma(val) {
      if (val == 0) {
        this.$store.commit("setIdioma", 1);
        this.$store.commit("setLang", 1);
        this.languaje = "Español";
        this.languajeDrop = "English";
        this.$cookies.set("_lang_poll", "1", {
          path: "/",
          maxAge: 10000 * 60 * 24 * 7,
        });
      } else {
        this.$store.commit("setIdioma", 0);
        this.$store.commit("setLang", 0);
        this.languaje = "English";
        this.languajeDrop = "Español";

        this.$cookies.set("_lang_poll", "0", {
          path: "/",
          maxAge: 10000 * 60 * 24 * 7,
        });
      }
    },
  },
  mounted() {
    //  console.log("eventstatus", this.publicarDesactivar);
    this.idioma = this.$store.state.idioma;
    if (this.$store.state.lang == 0) {
      this.languaje = "English";
      this.languajeDrop = "Español";
    } else {
      this.languaje = "Español";
      this.languajeDrop = "English";
    }
  },
  directives: {
    ClickOutside,
  },
};
</script>

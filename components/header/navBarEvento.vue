<template>
<header class="nav-bar">
        <div class="container" style="max-width: 940px;">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand mr-2 is-flex is-align-items-center">
                   <nuxt-link to="/" class=" is-flex is-align-items-center">
                   <div class="logotipo"><div class="logotipo-fill">
                       </div>
                       </div>
                    <div class="company">result.app</div></nuxt-link>
                    <div class="dropdown is-hoverable">
                        <div class="dropdown-trigger">
                          <button class="button buttonLang" aria-haspopup="true" aria-controls="dropdown-menu3">
                            <span>
                               {{languaje}}
                            </span>
                            <span class="icon is-small">
                                <i class="fa fa-caret-down" aria-hidden="true"></i>
                            </span>
                          </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                          <div class="dropdown-content">
                              <div id="appLang">
                                <a  class="dropdown-item" @click="cambiarIdioma($store.state.lang)" >
                                    {{languajeDrop}}
                                </a>
                              </div>
                            
                          </div>
                        </div>
                      </div>
                    
                    <a role="button" class="navbar-burger" @click="navBar = !navBar" 
					:class="{'is-active': navBar}" aria-label="menu" aria-expanded="false"
                        data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>

                </div>

                <div class="navbar-menu is-hidden-desktop menuPhone " :class="{'dBlock': navBar}" >
                    <div class="navbar-start">
                        <div class="my-4">
                            <a class="navbar-item title is-5 my-2" href="/">{{$store.state.idioma.productMenu }}</a>
                        </div>
                        <div class="my-4">
                            <a class="navbar-item title is-5 my-2" href="/">{{$store.state.idioma.priceMenu }}</a>
                        </div>
                       
                            <div class="navbar-item is-hidden-desktop" v-if="$store.state.login">
                                <nuxt-link to="/dashboard" class="button is-light is-fullwidth title is-5">{{$store.state.idioma.dashboardTitle}}</nuxt-link>
                                <a  class="button is-light is-fullwidth title is-5">{{$store.state.idioma.salirTitle}}</a>
                            </div>

                            <div class="navbar-item is-hidden-desktop" v-else>
                            <nuxt-link to="/login" class="button is-light is-fullwidth title is-5">{{$store.state.idioma.loginMenu}}</nuxt-link>
                            <nuxt-link to="/signup" class="button is-light is-fullwidth title is-5">{{$store.state.idioma.signupMenu}}</nuxt-link>
                            </div>

                    </div>
                </div>

                <div class="navbar-menu">
                    <div class="navbar-end">
                        <a class="navbar-item">
                            #c0D 1g0
                        </a>
                    <div class="navbar-item">
                             <button class="button is-info play "><i class="fa fa-play" aria-hidden="true"></i></button>
                        <div class="dropdown" :class="{'is-active': dropdownPublicar }" style="    margin-left: 10px;">
                            <div class="dropdown-trigger">
                            <button class="button blue" @click="dropdownPublicar = !dropdownPublicar" v-click-outside="clickHide" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span v-if="publicarDesactivar == 0">PUBLICAR</span>
                            <span v-if="publicarDesactivar == 1">DESACTIVAR</span>
                            <span class="icon is-small">
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                            </span>
                            </button>
                            </div>
                                <div class="dropdown-menu dropMover" id="dropdown-menu2" role="menu">
                                <div class="dropdown-content">
                                <a  @click="publicarEvento" class="dropdown-item" v-if="publicarDesactivar == 0">
                                PUBLICAR
                                </a>
                                 <a  @click="publicarEvento" class="dropdown-item" v-if="publicarDesactivar== 1">
                                DESACTIVAR
                                </a>
                                 <hr class="dropdown-divider">
                                <a  @click="guardarEvent" class="dropdown-item">
                                GUARDAR
                                </a>
                                <hr class="dropdown-divider">
                                <a @click="verEvento" class="dropdown-item">
                                VER
                                </a>
                                </div>
                                </div>
                        </div>
                    </div>
                       
                   
                   
                    </div>
                </div>
            </nav>

        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
import ClickOutside from 'vue-click-outside'
export default {
    props:['eventStatus'],
  data() {
    return {
        navBar: false, 
        languaje: "English", 
        languajeDrop: "Español", 
        idioma: {}, 
        dropdownPublicar: false, 
        publicarDesactivar: this.eventStatus
	};
  },
    computed: {
    ...mapState(['login'])
  },
  methods: {
      verEvento(){
            // Abrir nuevo tab
        var win = window.open('/p/'+this.$route.params.cod, '_blank');
        // Cambiar el foco al nuevo tab (punto opcional)
        win.focus();
      },
      guardarEvent(){
          this.$emit("guardarEvento")
      },
      clickHide(){
            console.log("click afuera")
            this.dropdownPublicar = false
      },
     async publicarEvento(){
       
        const response = await this.$axios.$post("publicar_evento", {
        publicarDesactivar: this.publicarDesactivar, 
        codigo: this.$route.params.cod
        });
        if(response.status == 1){
            
            
            if(this.publicarDesactivar == 1){
                this.publicarDesactivar = 0
               alert("Desactivado con exito")
            }else{
                this.publicarDesactivar = 1
                alert("Activado con exito")
            }

        }

      },
       async logout() {
      this.$cookies.remove('r_auth')
      location.href="/login"
    },
      cambiarIdioma(val){
          if(val==0){
               this.$store.commit('setIdioma', 1);
               this.$store.commit('setLang', 1);
                 this.languaje = 'Español'
          this.languajeDrop = 'English'
           this.$cookies.set(
                "_lang_poll",
                '1',
                {
                path: "/",
                maxAge: 10000 * 60 * 24 * 7,
                }
                );
          }else{
              this.$store.commit('setIdioma', 0);
               this.$store.commit('setLang', 0);
               this.languaje = 'English'
          this.languajeDrop = 'Español'
          
           this.$cookies.set(
                "_lang_poll",
                '0',
                {
                path: "/",
                maxAge: 10000 * 60 * 24 * 7,
                }
                );
          }
      }
  },
  mounted() {
       console.log("eventstatus", this.publicarDesactivar)
       this.idioma = this.$store.state.idioma
      if(this.$store.state.lang == 0){
          this.languaje = 'English'
          this.languajeDrop = 'Español'
      }else{
          this.languaje = 'Español'
          this.languajeDrop = 'English'
      }
  },
   directives: {
    ClickOutside
  }
};
</script>

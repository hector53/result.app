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
                            {{$store.state.idioma.productMenu}}
                        </a>
                        <a class="navbar-item">
                            {{$store.state.idioma.priceMenu}}
                        </a>
                            <div class="navbar-item" v-if="login">
                                <div class="buttons">
                                    <nuxt-link class="button is-info" to="/dashboard" 
                                    style="font-size: 14px; background-color:#59b1ff">
                                       {{$store.state.idioma.dashboardTitle}}
                                    </nuxt-link>
                                    <a class="button is-info"  href="#" @click="logout"
                                    style="font-size: 14px; background-color:#59b1ff">
                                    {{$store.state.idioma.salirTitle}}
                                    </a>
                                </div>
                            </div>
                            <div class="navbar-item" v-else>
                                <div class="buttons">
                                    <nuxt-link class="button is-info" to="/login"
                                     style="font-size: 14px; background-color:#59b1ff">
                                     {{$store.state.idioma.loginMenu}}
                                    </nuxt-link>
                                    <nuxt-link class="button is-info" to="/signup"
                                     style="font-size: 14px; background-color:#59b1ff">
                                     {{$store.state.idioma.signupMenu}}
                                    </nuxt-link>
                                    
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
export default {
  data() {
    return {
        navBar: false, 
        languaje: "English", 
        languajeDrop: "Español", 
        idioma: {}
	};
  },
    computed: {
    ...mapState(['login'])
  },
  methods: {
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
       this.idioma = this.$store.state.idioma
      if(this.$store.state.lang == 0){
          this.languaje = 'English'
          this.languajeDrop = 'Español'
      }else{
          this.languaje = 'Español'
          this.languajeDrop = 'English'
      }
  },
};
</script>

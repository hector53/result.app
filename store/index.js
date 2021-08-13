import { languajes } from '../plugins/lenguajes';
export const state = () => ({
  // urlBase: 'http://localhost:3000',
  urlBase: 'https://result.app',
  cookieLogin: false,
  lang: 0,
  login: false,
  p: 0,
  firtsName: '',
  lastName: '',
  email: '', 
  username: '',
  eventStatus: 0,
  eventLiveMode: 0,
  encuestaActiveLiveMode: 0,
  arrayEncuestaActiveLiveMode: [],
  candadoModoLive: 0,
  mostrarEnMoLive: false,
  usersOnline: 0,
  contadorModoLiveFront: 0,
  isLoading: true,
  premium: 0,
  planName: '',
  languajes: languajes,
  idioma: {},
  ipUser: "", 
  paisUser: "", 
  customerId: ""
})


export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}


export const mutations = {

  

  setcustomerId(state, val) {
    state.customerId = val
  },
  setpremium(state, val) {
    state.premium = val
  },
  setplanName(state, val) {
    state.planName = val
  },
  setfirtsName(state, val) {
    state.firtsName = val
  },
  setlastName(state, val) {
    state.lastName = val
  },
  setemail(state, val) {
    state.email = val
  },
  setusername(state, val) {
    state.username = val
  },

  
  setpaisUser(state, val) {
    state.paisUser = val
  },
  setipUser(state, val) {
    state.ipUser = val
  },
setisLoading(state, val) {
  state.isLoading = val
},

  setcontadorModoLiveFront(state, val) {
    state.contadorModoLiveFront = val
  },

  setusersOnline(state, val) {
    state.usersOnline = val
  },
  setmostrarEnMoLive(state, val) {
    state.mostrarEnMoLive = val
  },
  setcandadoModoLive(state, val) {
    state.candadoModoLive = val
  },
  setarrayEncuestaActiveLiveMode(state, val) {
    state.arrayEncuestaActiveLiveMode = val
  },
  setEncuestaActiveLiveMode(state, val) {
    state.encuestaActiveLiveMode = val
  },
  seteventLiveMode(state, val) {
    state.eventLiveMode = val
  },
  setIdioma(state, val) {
    state.idioma = state.languajes[val];
  },
  setLang(state, val) {
    state.lang = val
  },
  setLogin(state, val) {
    state.login = val
  },
  setP(state, val) {
    state.p = val
  },

  setEventStatus(state, val) {
    state.eventStatus = val
  },
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
export const actions = {
  async nuxtServerInit({
    commit
  }, {
    req,
    app,
    redirect
  }) {
    if (process.server && process.static) return;
    const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
 //   console.log(headers)
    const xForwardedFor = headers['x-forwarded-for']
    
    const xRealIp = headers['x-real-ip']
    console.log(xForwardedFor)
    var ipReal = xForwardedFor
    if(ipReal == undefined){
      console.log("ip undefined")
      ipReal = '192.168.1.215'
      var pais = 'Venezuela'
      ipUser = '192.168.1.215'
    }else{
      console.log("ip si hay ")
      const dataIp = await app.$axios.$get("http://ip-api.com/json/" + ipReal)
      var pais = dataIp.country
      var ipUser = dataIp.query
    }

    commit("setipUser", ipReal);
    commit("setpaisUser", pais);
    


    const cookieIdioma = this.$cookies.get('_lang_poll') 
    const cookieLoginUser = this.$cookies.get('r_auth')
    const cookieLoginNotUser = this.$cookies.get('_r_u')

    if (cookieLoginUser) {
      //si esta logueado entonces 
      console.log("con el token voy a consultar si existe el usuario ")
      //con esto nos cuidamos de gente mal intencionada 
      //seguridad fullllllll
      app.$axios.setToken(cookieLoginUser, 'Bearer')
      try {
        const response = await app.$axios.$get("getSession")
        console.log("aprobado")
        commit("setP", response.id);
        commit("setLogin", true);
        commit("setfirtsName", response.firtsName);
        commit("setlastName", response.lastName);
        commit("setemail", response.email);
        commit("setusername", response.username);

        commit("setpremium", response.premium);
        commit("setplanName", response.namePlan);
        commit("setcustomerId", response.customerId);
        



        if (response.ip == '' || response.ip == 0 ) {
          console.log("no tiene ip")
          
          var id_user = response.id

          await app.$axios.$post("update_ip_user_registered", {
            id_user: id_user,
            pais: pais,
            ipUser: ipUser
          }).then((response) => {
            if (response.status == 1) {
              console.log("user actualizado")
            }
          }).catch(({
            response
          }) => {
            console.log(response)
          })
        }
      } catch (err) {
        console.log("error")
        commit("setLogin", false);
        this.$cookies.remove('r_auth')
        //redirect 
        redirect('/')
      }
    } else {
      //no esta logueado 
      console.log("no existe la sesion de usuario del bnackend")
      if (!cookieLoginNotUser) {
        //si no tiene cookie la creo
        var cod_u = makeid(10)
        this.$cookies.set(
          "_r_u",
          cod_u, {
            path: "/",
            maxAge: 10000 * 60 * 24 * 7,
          }
        );
        commit("setP", cod_u);
        await app.$axios.$post("crear_user_invitado", {
          cookieUser: cod_u,
          pais: pais,
          ipUser: ipUser
        }).then((response) => {
          if (response.status != 0) {
            console.log("user creado")
          }
        }).catch(({
          response
        }) => {
          console.log(response)
        })
      } else {
        console.log(" la cookie existe", cookieLoginNotUser)
        commit("setP", cookieLoginNotUser);
        console.log("actualmente da un error a veces, por eso voy a consultar q la cookie exista en la db")
        //si existe no hago nada , si no existe la creo

        await app.$axios.$post("update_user_invitado", {
          cookieUser: cookieLoginNotUser,
          pais: pais,
          ipUser: ipUser
        }).then((response) => {
          if (response.status == 1) {
            console.log("user actualizado")
          }
        }).catch(({
          response
        }) => {
          console.log(response)
        })
      }
    }
    if (cookieIdioma) {
      commit("setIdioma", cookieIdioma);
      commit("setLang", cookieIdioma);
    } else {
      commit("setIdioma", 0);
      commit("setLang", 0);
    }
  },
};

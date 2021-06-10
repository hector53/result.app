<template>
<section class="section-hero">
  <loading :active="isLoading" color="#59b1ff"  />
        <div class="container cubreRegister">
            <h1 class="headingM ">{{$store.state.idioma.loginTitle}}</h1>
            <p class="hero-subhead ">{{$store.state.idioma.loginSubTitle}}</p>
            <div class="form-block w-form " style="text-align: center;">
    
                    <div class="divR" >



                        <input type="text" id="email" v-model="email"
                        @keyup.enter="Login"
                        class="text-field w-input" maxlength="50" 
                        :placeholder="$store.state.idioma.loginPlaceHolder1" required="">
                      
                        <input type="password" id="pass" v-model="pass"
                        class="text-field w-input" maxlength="50" 
                        @keyup.enter="Login"
                        :placeholder="$store.state.idioma.loginPlaceHolder2" required="">
                    </div>
                   
                    <div class="button-group">
                        <button class="buttonN blue " @click="userLogin" >{{$store.state.idioma.loginButton}}</button>
                    </div>
                   
            </div>
        </div>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
export default {
   middleware: 'guest',
     components: {
            Loading
        },
  data() {
    return {
        email:'', pass:'',
        idioma: {},
        isLoading: false
	};
  },
  methods: {
      async userLogin() {
        this.isLoading=true
      try {
          const response = await this.$axios.$post("login", {
                 email:this.email, 
                 password: this.pass,
                  });
     //   this.$router.push('/profile')
       console.log(response)
       this.$cookies.set(
            "r_auth",
            response.token,
            {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            }
            );
            location.href="/dashboard"
      } catch (err) {
        this.isLoading = false
        //console.log(err.response)
        alert(err.response.data.message)
      }
    },
     Login(){

     }, 
     async getUser(){
       this.$axios.setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzI2MjUzNCwianRpIjoiN2M4ZmIwZjYtNWNkZC00Y2FmLWE1YTctN2VmYTIzZWY2N2IwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NCwibmJmIjoxNjIzMjYyNTM0LCJleHAiOjE2MjMyNjM0MzR9.VBLaHZ_EUxJcpMw5wWQ7zqB_5jWPV8Vp3Q2RTgDYqEs', 'Bearer')
         await this.$axios
        .$get("getSession")
        .then((response) => {
          console.log(response);
        });
     }
  },
  mounted() {
 this.idioma = this.$store.state.idioma
  },
};
</script>

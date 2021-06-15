<template>
<section class="section-hero">
   <loading :active="isLoading" color="#59b1ff"  />
        <div class="container cubreRegister">
            <h1 class="headingM ">{{$store.state.idioma.signupTitle}}</h1>
            <p class="hero-subhead ">{{$store.state.idioma.signupSubTitle}}</p>
            <div class="form-block w-form " style="text-align: center;">
    
                    <div class="divR" >

                        <div style="display: flex;
                        justify-content: space-between;">
                            <input type="text" id="firstName" v-model="firstName"
                            @keyup.enter="signup"
                            class="text-field w-input" maxlength="50" 
                            :placeholder="$store.state.idioma.signupPlaceHolder1" required="" style="    margin-right: 10px;">
                            <input type="text" id="lastName" v-model="lastName"
                            @keyup.enter="signup"
                            class="text-field w-input" maxlength="50" 
                            :placeholder="$store.state.idioma.signupPlaceHolder2" required="">
                        </div>
                        


                        <input type="text" id="email" v-model="email"
                        @keyup.enter="signup"
                        class="text-field w-input" maxlength="50" 
                        :placeholder="$store.state.idioma.signupPlaceHolder3" required="">
                        <input type="text" id="username" v-model="userName"
                        @keyup.enter="signup"
                        class="text-field w-input" maxlength="50" 
                        :placeholder="$store.state.idioma.signupPlaceHolder4" required="">
                        <input type="password" id="pass" v-model="pass"
                        @keyup.enter="signup"
                        class="text-field w-input" maxlength="50" 
                        :placeholder="$store.state.idioma.signupPlaceHolder5" required="">
                    </div>
                   
                    <div class="button-group">
                        <button class="buttonN blue " @click="signup" >{{$store.state.idioma.signupButton}}</button>

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
  data() {
    return {
      firstName: '', lastName: '', 
      email:'', userName:'', pass:'',
      isLoading: false
	};
  },
   components: {
            Loading
        },
  methods: {
     async signup() {
       this.isLoading = true
       var cookieNotUser = this.$cookies.get('_r_u') 
        const response = await this.$axios.$post("register", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email, 
        userName: this.userName, 
        pass: this.pass, 
        userCookie: cookieNotUser
        });
        console.log(response)
         if(response.status != 0){
           this.isLoading = false
             this.$cookies.set(
            "r_auth",
            response.token,
            {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            }
            );

            this.$cookies.set(
            "r_user",
            {"name": response.name, "email": response.email, "username": response.username},
            {
            path: "/",
            maxAge: 10000 * 60 * 24 * 7,
            }
            );
               location.href = '/dashboard'
              }
    }
  },
  mounted() {
  },
};
</script>

<template>
  <b-dropdown v-if="$store.state.login"
              position="is-bottom-left"
              append-to-body
              aria-role="menu"
              style="    align-items: center;    cursor: pointer;"
            >
              <template #trigger >
                <div class="iconPerfil">
                <i class="fa fa-user" aria-hidden="true"></i></div>
              </template>

              <b-dropdown-item has-link aria-role="menuitem">
                <b-tag type="is-light">Plan {{$store.state.planName}}</b-tag>
                <a style="display: flex;    align-items: center;" >
                  <i class="fa fa-user mr-3" aria-hidden="true"></i>
                  <div>
                    <h5>{{$store.state.firtsName | capitalize}} {{$store.state.lastName | capitalize}}</h5>
                    <span class="is-size-7">{{$store.state.email | capitalize}}</span>

                  </div>
                </a>
              </b-dropdown-item>
              <hr class="dropdown-divider" />
              <b-dropdown-item has-link aria-role="menuitem">
                <nuxt-link :to="{name: 'user-settings'}" >
                  <i class="fa fa-address-card-o" aria-hidden="true"></i>
                  User Settings
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item
                has-link
                aria-role="menuitem" >
                <nuxt-link :to="{name: 'upgrade'}" v-if="$store.state.premium == 0" >
                  <i class="fa fa-level-up" aria-hidden="true"></i>
                  Actualizar Plan
                </nuxt-link>

                 <a v-if="$store.state.premium == 2 || $store.state.customerId != 0" @click="openCustomerPortal" >
                  <i class="fa fa-level-up" aria-hidden="true"></i>
                  Customer Portal
                </a>

             
              </b-dropdown-item>
        
              <b-dropdown-item has-link aria-role="menuitem">
                <a @click="logout">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  Salir
                </a>
              </b-dropdown-item>
            </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
    };
  },
     filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
},
  methods: {
      logout(){
          this.$emit("logout")
      },

      async openCustomerPortal(){
         var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
      let loader = this.$loading.show({
      loader: "dots",
      color: "#59b1ff",
      });

      await this.$axios
      .$get("get_portal_customer_by_user_id")
      .then((response) => {
          location.href = response.redirect
      }).catch(({response}) =>{
      loader.hide()
      console.log(response)
      })

      }
   },
  mounted() {
    console.log("customer id: ", this.$store.state.customerId)
  },
};
</script>

 
<template>
<div>
<h1>Perfil</h1>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    middleware: 'miauth',
  data() {
    return {
     
	};
  },
   computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },
  methods: {
     signup(){

     }
  },
  mounted() {
      console.log(this.user)
      var cat = localStorage.getItem('auth._token.local');
      console.log(cat)
  },
};
</script>

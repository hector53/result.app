<template>
<div>
        <get-evento v-if="login"></get-evento>
        <get-evento-not-user v-else></get-evento-not-user>
</div>
</template>

<script>
import getEvento from '../../components/eventos/getEvento.vue';
import GetEventoNotUser from '../../components/eventos/getEventoNotUser.vue';
import { mapState } from 'vuex'
export default {
  components: { getEvento, GetEventoNotUser },
  data() {
    return {
     
	};
  },
  computed: {
    ...mapState(['login'])
  },
  methods: {
   
  },
  mounted() {
      
  },
};
</script>

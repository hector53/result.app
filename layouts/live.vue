<template>
  <div class=" x100 particlesContainer">
  <nuxt   />
    <footer-t v-if="$store.state.isLoading == false"
      id="scrollAqui"
    ></footer-t>

    

      
  </div>
</template>


<script>
import footerT from '../components/footer/footerT.vue';
export default {
  
  components: { footerT },
  data() {
    return {
	};
  },
  methods: {
  },
  mounted() {
  },
};
</script>

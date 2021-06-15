<template>
  <div>
      <nav-bar-evento></nav-bar-evento>
  <nuxt />
  <footer-t></footer-t>
  </div>
</template>


<script>
import footerT from '../components/footer/footerT.vue';
import NavBarEvento from '../components/header/navBarEvento.vue';
import notifyBar from '../components/header/notifyBar.vue';
export default {
  components: { notifyBar,  footerT, NavBarEvento },
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

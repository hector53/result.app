<template>
  <div>

  <notify-bar v-if="$route.name == 'index'"></notify-bar>
  <nav-bar></nav-bar>
  <nuxt style="padding-bottom: 50px;
    padding-left: 10px;
    padding-right: 10px;" />
  <footer-t></footer-t>
  </div>
</template>


<script>
import footerT from '../components/footer/footerT.vue';
import NavBar from '../components/header/navBar.vue';
import notifyBar from '../components/header/notifyBar.vue';
export default {
  components: { notifyBar, NavBar, footerT },
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

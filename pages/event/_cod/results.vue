<template>
<div>
 <nav-bar-evento ></nav-bar-evento>
 <nav-bar-event v-if="eventT" :eventName="eventName"  ></nav-bar-event>

    <div class="cubreResults" v-for="(item, index) in encuestas" :key="index" >
        <multiple-choice-result
        v-if="item.tipo == 1" :id_encuesta="item.id" 
              :titulo_encuesta="item.titulo"
        ></multiple-choice-result>
    </div>

</div>
</template>

<script>
import MultipleChoiceResult from '../../../components/encuestas/multipleChoiceResult.vue';
import navBarEvento from '../../../components/header/navBarEvento.vue';
export default {
      layout: "dashboardEvent",
  components: { navBarEvento, MultipleChoiceResult },
   head: {
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js'},
    ],
  },
  data() {
    return {
     eventT: false, 
     eventName: '', 
     encuestas: [], 
     socket:''
	};
  },
  
  methods: {
    async get_event(){
         await this.$axios
        .$get("get_event_by_cod?codigo=" + this.$route.params.cod)
        .then((response) => {
            if(response.status == 1){
                this.eventName = response.titulo
                this.eventT = true
                this.encuestas = response.tipoEncuesta
            }
        });
    }
  },
  mounted() {
    var socket = io("http://localhost:5000/", {
      withCredentials: true,
    });
          socket.on('connect', function() {

            socket.emit('conectar', {
              username: "asdasd",
              room: "adasdasd"
            });

            
          })
        var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
      this.get_event()
  },
};
</script>

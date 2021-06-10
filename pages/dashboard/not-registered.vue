<template>
<div>
 <section class="section-hero" style=" padding: 5px;"  >
    <div class="container">
      <div class="div-block-5"><a href="/" class="link">
        <i class="fa fa-arrow-left" aria-hidden="true"></i> {{$store.state.idioma.back}}</a>
      </div>
      <h1 class="headingM has-text-left">{{$store.state.idioma.dashboardTitle}}</h1>
      <p class="hero-subhead has-text-left">{{$store.state.idioma.dashboardSubtitle}}</p>

      <div class="columns p-2 ">
        <div class="column " >
          <div class="pollBlock cubreDiv">
            <div class="pollIcon">
              <i class="fa fa-bars faIconPoll" aria-hidden="true"></i>
            </div>
            <h3 class="pollNumber" v-text="cantEncuestas" ></h3>
            <p class="pollsText">{{$store.state.idioma.dashboardStatisTitle1}}</p>
          </div>
        </div>
        <div class="column">
          <div class="pollBlock cubreDiv">
            <div class="pollIcon">
              <i class="fa fa-check faIconPoll" aria-hidden="true"></i>
            </div>
            <h3 class="pollNumber" v-text="cantVotos"  ></h3>
            <p class="pollsText">{{$store.state.idioma.dashboardStatisTitle2}}</p>
          </div>
        </div>
        <div class="column">

        </div>

      </div>

      
      


      <h1 class="headingM has-text-left"
       style="    margin-bottom: 40px; margin-top: 40px;">{{$store.state.idioma.dashboardTitle2}}</h1>
      <div v-for="(item, index) in misEncuestas" :key="index" >
       <a :href="'/p/'+item['codigo']+'+'" style="color: #222;">
        <div class="CubOption cubreDiv">
          <div class="columns">
            <div class="column is-flex is-justify-content-space-between">
              <div class="cubreIconandOption is-flex has-text-left">
                <span for="Opción " class="radio-button-label w-form-label" v-text="item['titulo']" ></span>
              </div>
              <div class="text-block-12" v-text="item['cantVoto']+ ' '+ $store.state.idioma.votes" ></div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-flex is-justify-content-space-between">
              <div class="cubreResult is-flex is-justify-content-space-between">
                <span v-text="item['fecha']"></span>
                <div>
                  <span><a :href="'/p/'+item['codigo']+'/edit'" ><i class="fa fa-pencil-square" style="font-size: 20px;" aria-hidden="true"></i></a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
       </a>
       
        
      </div>

    </div>
  </section>
</div>
</template>

<script>
export default {
  data() {
    return {
     misEncuestas: [], 
     cantVotos: 0, 
     cantEncuestas:0
	};
  },
 
  methods: {
    async getEvents(){
var cookieNotUser = this.$cookies.get('_r_u') 

     await   this.$axios.$get("events_not_registered?cookieNotUser="+cookieNotUser)
        .then((response) => {
        console.log(response)
        this.misEncuestas = response.encuestas
        this.cantEncuestas = response.cantEncuestas
        this.cantVotos = response.cantVotos
        })

    }
  },
  mounted() {
    this.getEvents()
  },
};
</script>

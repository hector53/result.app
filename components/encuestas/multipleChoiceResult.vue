<template>
<div>
     <section   >
  
    <div class="container cubreEncuesta" >
      <h1 class="headingM has-text-left">{{preguntaGetEncuesta}}</h1>
      <div class="mt-5" >
        <div class="w-form" style="padding: 10px;">
          <div 
          v-for="(item, index) in opciones" :key="index"
         
          >
            <div class="CubOption" v-if="resultados"
            :style="'border-color:'+colores[item['color']]"
          >
            <div class="columns">
              <div class="column is-flex is-justify-content-space-between">
                <div class="cubreIconandOption is-flex">
                  <div class="keyboard"><div v-text="index+1" ></div></div>
                  <div class="div-block-8">
                    <div class="div-block-9"  ></div>
                  </div>
                  <span for="Opción " class="radio-button-label w-form-label" v-text="item['valor']"  ></span>
                </div>
                <div class="text-block-12" v-if="resultados" v-text="item['porcentaje']+'%'"  ></div>
              </div>
            </div>

            <div class="columns" v-if="resultados">
              <div class="column is-flex is-justify-content-space-between">
                <div class="cubreResult is-flex">
                  <div class="poll-bar"  >
                    <div class="fill-bar" :style="'width:'+item['porcentaje']+'%; background-color:'+colores[index]+';'" ></div>
                  </div>
                  <div class="text-block-12" v-text="item['totalVoto']+' voto'"   style="    font-size: 15px;"  >
                    
                  </div>
                </div>
              </div>
            </div>
          </div>


        

          </div>
          

       
          
        </div>
      </div>

    </div>
  </section>
</div>
</template>

<script>
export default {
    props:['id_encuesta', 'titulo_encuesta'],
  data() {
    return {
        opciones: [], 
        preguntaGetEncuesta: this.titulo_encuesta, 
        totalVotos: "",
        colores: [
          '#ffaf59', 
          '#59b1ff', 
          '#59ffbf', 
          '#FF5252', 
          '#FF96E0', 
          '#BDC3C7', 
          '#F53B86', 
          '#E3500D',
          '#C287E8',
          '#8AD3A0', 
          'transparent'
        ], 
        resultados: true
	};
  },
 
  methods: {
      
    async getEncuestaById(id){
         await   this.$axios.$get("get_encuesta_by_id_result?id_encuesta="+id)
        .then((response) => {
                  this.opciones = response.opciones
                  this.totalVotos = response.totalVotos
        })
    }
  },
  mounted() {
        this.getEncuestaById(this.id_encuesta)
  },
 
};
</script>

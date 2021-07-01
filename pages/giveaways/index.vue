<template>
<section class="section-hero">
        <div class="container">
            <h1 class="headingM has-text-left">Sorteos</h1>

            <h3 class="headingM has-text-left">Lista de participantes</h3>
            <textarea class="textarea" v-model="participantes" id="participantes" placeholder="Participantes linea por linea" rows="10"></textarea>
            <h3 class="headingM has-text-left mt-3">Número de Premios</h3>
            <div class="control">
                <input class="input" type="number" v-model="premios" placeholder="Cantidad de Premios">
              </div>
              <div class="button-group">
                <button class="buttonN blue " @click="Sortear">Sortear</button>
                <button class="buttonN  " @click="borrarNombres">Borrar Participantes</button>
            </div>


            <nav class="panel" v-if="ganadores" style="    margin-bottom: 40px;">
                <p class="panel-heading headingM">
                    Resultados del Sorteo
                </p>
                <a class="panel-block is-active" v-for="(item, index) in arrayGanadores"
                 :key="index"
                 v-text="'Puesto '+(index+1)+': '+item"
                 >
                  
                </a>

               
              </nav>
        </div>
    </section>
</template>

<script>
export default {
    head: {
   script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
    ]
},
  data() {
    return {
      participantes: "" , 
        premios: 1, 
        ganadores: false, 
        arrayGanadores: []
	};
  },
 
  methods: {
      
      
        borrarNombres(){
            $("#participantes").val('')
        },
      async  Sortear(){
          if(this.participantes == ''){
            this.$swal({
                type: 'error',
                title: 'Oops...',
                text: 'Debes agregar participantes',
              })
              return false
          }
            var lines = [];
            $.each($('#participantes').val().split(/\n/), function(i, line){
                if(line){
                    lines.push(line);
                } else {
                    lines.push("");
                }
            });
            if(lines.length <=1){
                  
               this.$swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Debes agregar al menos 2 participantes',
                  })
                  return false
              }

              if(this.premios > lines.length){
                this.$swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'El numero de premios no puede ser mayor que los participantes',
                  })
                  return false
              }

                await   this.$axios.$get("_sortear1?participantes="+JSON.stringify(lines)+"&premios="+this.premios)
                .then((response) => {
                        console.log(response)
                        this.ganadores = true
                        this.arrayGanadores = response.ganadores
                }
                )
  

        }
  },
  mounted() {
  },
};
</script>

<template>
<div class="cubreEncuesta1">
 <div class="columns">
            <div class="column is-4">
                <div class="cubreNumber"> 
                    <h4 class="titleEncuesta">Sorteo</h4>
                <div class="cubreLogoNumber">
                    <div class="logotipo-copy">
                        <div class="logotipo-fill-copy">
                            <div class="numberTipeEncuesta">{{numero+1}}</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="column is-8">
                <div class="container">
            <div class="control">
                <input class="input" type="text" v-model="titulo" placeholder="Título del sorteo">
              </div>
            <h3 class="headingM has-text-left">Lista de participantes</h3>
            <textarea class="textarea" v-model="participantes" id="participantes"
             placeholder="Participantes linea por linea" rows="10"></textarea>
            <h3 class="headingM has-text-left mt-3">Número de Premios</h3>
            <div class="control">
                <input class="input" type="number" v-model="premios" placeholder="Cantidad de Premios">
              </div>
              <div class="button-group">
                <button class="buttonN blue " @click="guardarSorteo(0)">Guardar</button>
                <button class="buttonN  " @click="borrarNombres">Borrar Participantes</button>
            </div>


        </div>
            </div>
        </div>
</div>

</template>

<script>
export default {
     props: ['numero', 'idEcuesta', 'titulo', 'integrantes', 'ganadoresP' ],
       head: {
   script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
    ]
},
  data() {
    return {
       participantes: this.integrantes , 
        premios: 1, 
        titulo:'', 
        ganadores: this.ganadoresP
	};
  },
  methods: {
         borrarNombres(){
            $("#participantes").val('')
        },
        async  guardarSorteo(val){
             if(this.titulo == ''){
            this.$swal({
                type: 'error',
                title: 'Oops...',
                text: 'Debes agregar un título',
              })
              return false
          }
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

              const response = await this.$axios.$post("create_sorteo_live", {
                 titulo:this.titulo, 
                 participantes: JSON.stringify(lines),
                 premios: this.premios, 
                 codigo: this.$route.params.cod, 
                 activar: val, 
                  });

                  console.log(response)
          if(response.status ==1){
              if(val == 1){
                this.$store.commit("seteventLiveMode", 1 );
                this.$store.commit("setcandadoModoLive", 1 );
              }
               this.$emit("cerrarModal")
              }else{
                this.isLoading = false
                 this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Error en los datos ingresados',
                  confirmButtonText: `OK`,
                })
              }

        }
  },
  mounted() {
  },
};
</script>

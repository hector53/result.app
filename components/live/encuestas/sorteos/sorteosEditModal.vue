<template>
<div class="container">
            <h1 class="headingM has-text-left">Sorteo</h1>
            <div class="control">
                <input class="input" type="text" v-model="titulo" placeholder="Título del soreto">
              </div>
            <h3 class="headingM has-text-left">Lista de participantes</h3>
            <textarea class="textarea" v-model="participantes" id="participantes" placeholder="Participantes linea por linea" rows="10"></textarea>
            <h3 class="headingM has-text-left mt-3">Número de Premios</h3>
            <div class="control">
                <input class="input" type="number" v-model="premios" placeholder="Cantidad de Premios">
              </div>
              <div class="button-group">
                <button class="buttonN blue " @click="guardarSorteo(0)">Guardar</button>
                <button class="buttonN  " @click="borrarNombres">Borrar Participantes</button>
            </div>


        </div>
</template>

<script>
export default {
     props:['id_encuesta'],
       head: {
   script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
    ]
},
  data() {
    return {
       participantes: "" , 
        premios: 1, 
        titulo:''
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
                 console.log(line)
                if(line){
                   console.log("if line")
                    lines.push(line);
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

              const response = await this.$axios.$post("edit_sorteo_live_modal", {
                 titulo:this.titulo, 
                 participantes: JSON.stringify(lines),
                 premios: this.premios, 
                 codigo: this.$route.params.cod, 
                 activar: val, 
                 id_encuesta: this.id_encuesta
                  });

                  console.log(response)
          if(response.status ==1){
               this.$emit("cerrarModalEdit")
              }else{
                this.isLoading = false
                 this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Error en los datos ingresados',
                  confirmButtonText: `OK`,
                })
              }

        }, 
         async getSorteoByIdEncuesta() {
      await this.$axios
        .$get(
          "get__sorteo_by_id_encuesta_modal?id_encuesta=" +
            this.id_encuesta
            +"&p=" +
            this.$store.state.p 
        )
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
              this.titulo = response.titulo;
            this.participantes = response.participantes;
            this.premios = response.premios;
          }
        });
    },
  },
  mounted() {
      this.getSorteoByIdEncuesta()
  },
};
</script>

<template>
<div></div>
</template>

<script>

export default {
    props:["reaccion", "posicion", "nameR"],
  data() {
    return {

};
  },
  methods: {

        animar(val){

        var getRndInteger = function(min, max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }
    //emoji array
    var fbReactions = ["like", "love", "happy", "wow", "sad", "angry"];

    var contador = 0; 
   var intervalo; 
var borrando = 0

   var posicion = this.posicion
        console.log($(window).width())
         $(".particlesContainer").append("<div class='reaccionContainer_"+posicion+"' ></div>")
    
     
   intervalo =  setInterval(function(){
        contador++
        if(contador == 50){
            clearInterval(intervalo)
        }else{
           
            $(".reaccionContainer_"+posicion).append("<span id='emoji_"+posicion+"_"+contador+"'  class='particle "+fbReactions[val]+" ' ></span>")
           

            $("#emoji_"+posicion+"_"+contador).animate(
                {
                    left: getRndInteger(   ($(window).width() / 2) - 300 , ($(window).width() / 2) + 300 )  ,
                },  function(){
                 $("#emoji_"+posicion+"_"+contador).css('opacity', '1');
                   $("#emoji_"+posicion+"_"+contador).animate(
                        {
                            top:-100,
                            opacity: 0
                        },3000, function(){
                            console.log("borrando", borrando)
                            if(borrando == 44){
                               $(".reaccionContainer_"+posicion).remove()
                            }
                            borrando++
                        }
                    )
                }
            )
        }
    },100)

    },

  },
 async mounted() {
    
    await  this.animar(this.reaccion)
    this.$emit("quitarReaccion", this.posicion)
  },
};
</script>

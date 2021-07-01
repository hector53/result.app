<template>
<div>
 <div class="columns" style="margin-top: 10px;
    margin-bottom: 10px;">
          <div class="column is-3">
            <div class="evento"  @click="addNewEncuesta(1)" >
              <div class="bloque-evento">
                <div class="text-block">
                  <strong class="bold-text-6">{{
                      $store.state.idioma.pollHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-danger">
                <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
              </div>
            </div>
          </div>

          <div class="column is-3">
            <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(251, 198, 202, 0.25);">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #61060e;">{{
                      $store.state.idioma.qaHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-danger">
                <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
              </div>
            </div>
          </div>
          <div class="column is-3">

             <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(222, 205, 245, 0.25);" >
                <div class="text-block">
                  <strong class="bold-text-6" >{{
                      $store.state.idioma.dateHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-danger">
                <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
              </div>
            </div>

            
          </div>

          <div class="column is-3">

                <div class="evento" @click="addNewEncuesta(2)">
              <div class="bloque-evento" style="background-color: rgba(192, 235, 223, 0.25);">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #0a674e;">{{
                      $store.state.idioma.cloudHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-info">
                <div class="text-block-3">{{ $store.state.idioma.tagRegistro }}</div>
              </div>
            </div>
            
          </div>
        </div>
        <div class="columns" style="   padding-left: 10px;
    padding-right: 10px;">
          <div class="column is-3">

                 <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(253, 226, 194, 0.25)">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #8f5702;">{{
                      $store.state.idioma.rateHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-info">
                <div class="text-block-3">{{ $store.state.idioma.tagRegistro }}</div>
              </div>
            </div>


            
          </div>
          <div class="column is-3">
                 <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(203, 243, 248, 0.25)">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #0b676f;">{{
                      $store.state.idioma.giveHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-info">
                <div class="text-block-3">{{ $store.state.idioma.tagRegistro }}</div>
              </div>
            </div>
            
          </div>
          <div class="column is-3">

               <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(228, 235, 188, 0.25)">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #495a06;">{{
                      $store.state.idioma.quizzHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-success">
                <div class="text-block-3">{{ $store.state.idioma.tagPro }}</div>
              </div>
            </div>
            
          </div>

          <div class="column is-3">

                <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(240, 187, 225, 0.25)">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #590647;">{{
                      $store.state.idioma.triviaHeadBlock
                    }}<br /></strong>
                </div>
              </div>
              <div class="tag is-success">
                <div class="text-block-3">{{ $store.state.idioma.tagPro }}</div>
              </div>
            </div>
            
          </div>
        </div>
</div>
</template>

<script>
export default {
  data() {
    return {
     
	};
  },

  methods: {
      addNewEncuesta(val) {
        this.$emit('addNewEncuesta', val)
         this.$emit('closeModal')
    },
   createPoll(id){
     this.$emit("createPoll", id)
   }
  },
  mounted() {
  
  },
};
</script>

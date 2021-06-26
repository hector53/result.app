<template>
<div>
 <div class="columns" style="margin-top: 60px;     padding-left: 10px;
    padding-right: 10px;">
          <div class="column is-3">
            <div class="evento" @click="createPoll(1)">
              <div class="bloque-evento">
                <div class="text-block">
                  <strong class="bold-text-6">{{
                      $store.state.idioma.pollHeadBlock
                    }}<br /></strong>
                </div>
                <div class="text-block-2">  {{ $store.state.idioma.pollSubBlock }}</div>
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
                <div class="text-block-2" style="    color: #61060e;">  {{ $store.state.idioma.qaSubBlock }}</div>
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
                <div class="text-block-2" >  {{ $store.state.idioma.dateSubBlock }}</div>
              </div>
              <div class="tag is-danger">
                <div class="text-block-3">{{ $store.state.idioma.tagGratis }}</div>
              </div>
            </div>

            
          </div>

          <div class="column is-3">

                <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(192, 235, 223, 0.25);">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #0a674e;">{{
                      $store.state.idioma.cloudHeadBlock
                    }}<br /></strong>
                </div>
                <div class="text-block-2" style="    color: #0a674e;">  {{ $store.state.idioma.cloudSubBlock }}</div>
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
                <div class="text-block-2" style="    color: #8f5702;">  {{ $store.state.idioma.rateSubBlock }}</div>
              </div>
              <div class="tag is-info">
                <div class="text-block-3">{{ $store.state.idioma.tagRegistro }}</div>
              </div>
            </div>


            
          </div>
          <div class="column is-3">
            <a href="/sorteos">

            
                 <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(203, 243, 248, 0.25)">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #0b676f;">{{
                      $store.state.idioma.giveHeadBlock
                    }}<br /></strong>
                </div>
                <div class="text-block-2" style="    color: #0b676f;">  {{ $store.state.idioma.giveSubBlock }}</div>
              </div>
              <div class="tag is-info">
                <div class="text-block-3">{{ $store.state.idioma.tagRegistro }}</div>
              </div>
            </div>
            
            </a>
          </div>
          <div class="column is-3">

               <div class="evento">
              <div class="bloque-evento" style="background-color: rgba(228, 235, 188, 0.25)">
                <div class="text-block">
                  <strong class="bold-text-6" style="    color: #495a06;">{{
                      $store.state.idioma.quizzHeadBlock
                    }}<br /></strong>
                </div>
                <div class="text-block-2" style="    color: #495a06;">  {{ $store.state.idioma.quizzSubBlock }}</div>
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
                <div class="text-block-2" style="    color: #590647;">  {{ $store.state.idioma.triviaSubBlock }}</div>
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
   createPoll(id){
     this.$emit("createPoll", id)
   }
  },
  mounted() {
  
  },
};
</script>

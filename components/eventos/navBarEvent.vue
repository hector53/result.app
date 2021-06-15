<template>
    <div class="div-block-4">
      <div class="columns" style="max-width: 940px; margin: auto">
        <div class="column is-6" style="padding: 0">
          <ul role="list" class="list-3">
            <li class="list-item-4" v-if="$route.name == 'event-cod'">
               <div
            class="dropdown"
            :class="{ 'is-active': dropdownAddPoll }"
            style="    margin-left: 10px;    padding: 0;    height: 100%;"  >
            <div class="dropdown-trigger" style="    display: flex;    justify-content: center;    align-items: center;">
              <a
              class="addPoll"
                @click="dropdownAddPoll = !dropdownAddPoll"
                v-click-outside="clickHideNewEn"
                aria-haspopup="true"
                aria-controls="dropdown-menu2"
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </a>
            </div>
            <div
              class="dropdown-menu dropMover"
              id="dropdown-menu2"
              role="menu"
            >
              <div class="dropdown-content">
                <a href="#" @click="addNewEncuesta(1)" class="dropdown-item">
                  Multiple Choice
                </a>
              </div>
            </div>
          </div>
            
            </li>
        <nuxt-link :to="{name: 'event-cod'}" v-if="$route.name == 'event-cod-results'" >
            <li class="list-item-4">
              <div class="text-b4">
                <span class="text-span">evento:</span> 
                <span>{{eventName}}</span>
              </div>
            </li>
        </nuxt-link>
            <li class="list-item-4" v-else>
              <div class="text-b4">
                <span class="text-span">evento:</span> 
                <span>{{eventName}}</span>
              </div>
            </li>
         <nuxt-link :to="{name: 'event-cod'}" v-if="$route.name == 'event-cod-results'" >
                 <li class="list-item-4">
              <div class="text-b4">
                <span class="text-span">calendario:</span> 
                <span>06/06/2021</span>
              </div>
            </li>
         </nuxt-link> 
            <li class="list-item-4" v-else>
              <div class="text-b4">
                <span class="text-span">calendario:</span> 
                <span>06/06/2021</span>
              </div>
            </li>


          </ul>
        </div>

        <div class="column is-6" style="padding: 0">
          <ul role="list" class="list-4">
            <li class="list-item-6">
              <img
                src="https://uploads-ssl.webflow.com/60bce19845cbc34d57afc5a4/60be1b4ea72caeed680bbd05_settings%20(1).png"
                loading="lazy"
                alt=""
                class="image-4"
              />
            </li>
           
            <a><li class="list-item-6 linkEvent"><div>Compartir</div></li></a>
            <a><li class="list-item-6 linkEvent"><div>Integraciones</div></li></a>
            <nuxt-link :to="{name: 'event-cod-results'}"><li class="list-item-6 linkEvent" :class="{'active' : $route.name == 'event-cod-results'}"><div>Resultados</div></li></nuxt-link>
          
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    props:['eventName'],
  data() {
    return {
      dropdownAddPoll: false,
      arrayEncuestas: [],
      eventCod: "",
      arrayMostrar: false,
      isLoading: true,
      eventStatus: 0, 
      eventT: false
    };
  },

  methods: {
    
    clickHideNewEn(){
      this.dropdownAddPoll = false
    },
    
    addNewEncuesta(val) {
        this.$emit('addNewEncuesta', val)
    },

  },
  mounted() {

  },
    directives: {
    ClickOutside
  }
};
</script>

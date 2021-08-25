<template>
<div>
    <div
        class="item_pregunta mt-3" :class="{'preguntaDestacada': item.destacada}"
      >
        <div class="item_pregunta_top">
          <div class="item_pregunta_top_img">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              class="UserIcon"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          </div>
          <div class="item_pregunta_top_user">
            <span>{{ item.usuario }}</span>
            <span>{{ item.fecha }}</span>
          </div>
          <div class="item_pregunta_top_like">
            <span class="likeContador">
              <span v-if="item.likes > 0" class="mr-3">({{ item.likes }})</span>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
                class="likeIcon"
                :class="{ active: item.likes > 0 }"
                @click="likePregunta(item.id)"
              >
                <path
                  d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                ></path></svg
            ></span>
            <span class="icontree" v-if="$store.state.p == item.id_user">
              <i
                class="fa fa-pencil-square-o iconEditQyA"
                aria-hidden="true"
                @click="editarMiPregunta(item.id, item.texto)"
              ></i>
              &nbsp;&nbsp;
              <i
                class="fa fa-trash iconEditQyA"
                @click="deletePregunta(item)"
                aria-hidden="true"
              ></i>
            </span>
          </div>
        </div>
        <div class="item_pregunta_footer" style="font-style: italic;"
        v-if="extra ==1 && item.status == 0"
        >Tu comentario está pendiente de moderación. Esto es una vista previa, tu comentario estará visible cuando se apruebe.</div>
        <div class="item_pregunta_footer">{{ item.texto }}</div>
        <div class="item_pregunta_footer" v-if="item.reply.length > 0">
          <span class="replyCountAdmin" @click="replyPregunta(item)"
            >({{ item.reply.length }})-Respuestas</span
          >
        </div>
      </div>
</div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  props: [
  "item", "extra"
  ],
  directives: {
    ClickOutside,
  },
 
  data() {
    return {
     
    };
  },
  methods: {
    likePregunta(id){
        this.$emit("likePregunta", id)
    }, 
    editarMiPregunta(id, texto){
        this.$emit("editarMiPregunta", {"id": id, "texto": texto})
    },
    deletePregunta(item){
        this.$emit("deletePregunta", item)
    },
    replyPregunta(id){
        this.$emit("replyPregunta", id)
    }
    },
  mounted() {
    
  },
 
};
</script>

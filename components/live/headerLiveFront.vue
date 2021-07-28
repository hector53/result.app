<template>
  <div class="cubreNavBarPresentacion">
    <div class="navBarLeft">
      <ul role="list" class="listNavBarLeft">
        <li
          class="list-item-navLeft tareas"
          title="Lista de Encuestas"
          alt="Lista de Encuestas"
        >
          <div class="dropdown is-hoverable" style="margin-left: 10px">
            <div class="dropdown-trigger">
              <div class="cubreIconDropdown">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAQAAABQ8GUWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQflBgYWOigowSOsAAAFhklEQVR42u1bW0gUXxz+zlqW9pCK5UNh7pIPhYkFhReiwqCokJYos+jBJHpKMCIygoJ8sBLszaCHHsI0CLxAL0ZI5EPaTUISk9XAEjfzikmKe77/w/x1d9zRndnLTLZ9sDC7+7t+c34zv3PmDLAIlMnJ5J07ZE8POTPDiGN0lPz0iayuJrOzYSXIrCxycDDySS+H5mbKLVssSD4hgfz2zdrk5+F2k7m5JhNw86bVaasgp6bIvDwTCXj3zuqc/TExQblnj0kE/PhhdbraGB0ls7IilbfNe7h6tSlMG0ZiIvjiBWVGRoQJ+IMhkpMhXr4kt22LTgIAABs3Ai0tpMMRpQQAwObNQGsrmZYWpQQAQGoq0NJCmZISpQQAQHo6REMD5Zo1UUoAAOTkQFy5EqoVMX9Ajo0BCQlWp2UMExNAWpoQ4+PBWljBIwAA1q8Hjh4NxcIKJwAADh6MbgKYmhrdBCAxMRTtVbol2d4OUVYGuN36FOx2oKYGSE/XZy+A/JIQwpj8UvlxbGzZSZncscO4zYICI/aWlV/SzsePoeRtoASCYXo5Ha3/wnQ2DUB/CYiHD8myMmBoSJc8HQ6gqkq3vUDyEcIKb4QAsLNT2HbuDFb9L7gLhIZ/BFgdgNX4R4DVAViNv6ATDBOitRPUPwIs7wQ9HqC7G+jpAQYHgelpRSX4xRDAUCPU0QEY7ARFTQ2wdasue5ryv38DTU1AfT3Y2ipsExOhJLt8vIFKwFT8+kVWVoZr5XeFEfD8uZn7AwxcAyKNuTng6lXg/n1hI/1PUHw8cOgQkJ0NpKWBSUkACfHzJ9DfD7x+rZTJzExQ7q0dAdPTZEGBdlx5eWRjoyITCJOTZH09GcTkyDoCZmfJI0f84pHp6WRDQ3A2PR6ytpbSwHqhZQTIixf9Yzl8mBwfD934yAiZnx8eAuSbN2RODulw6Pvk55NfviwfYF2dfxyXLpFzc+FjeHaWLCkJAwFh7gQ5MkK5YYNa3ulUhm+44fFQHjumFaOFa4K3bwvb8PBC8jIzE3z8GLBFYIJms0HU1mptsLCoExweVp7p/d/OAiDb2oBI7wp79UqI/fu14zXzIijv3lX7djpN880lniWaS0Bmpsq3/PDBPAI6OiwmwO0mhU/pORyh2RsaIouLyaIisrc3sLyUmq22eQQ8e6b2e/ly0Kbk1JTvHkLlNq1Hr7R0XseCJbHubvX3ffsC67jdQEkJcOYM0Nur/CYlxLlzQnR2euXGxnSFIA4csG4EyAsX1H4/fw6sdPr0grzMyFB6hfJytR0hyLo6fUF0dc3rmT8bFJOT6h90PN7myMiCuq2rizx7Fnj6VC107RrgJWp5JCXNH1lQAoubo5iYwCrnz6st1NcL4Z0yk04nUFGhP4ZVCyfefAKYnKz+vnhEaOHUKXL7dk1zzMoy3kF61xHNJ0AsIgD9/YGVbDbgxg2/5GVKCtDUBLFunbEg+vqsI2Dxur9ob9enV1joOwrItWuBxkZl56hRaPg0rw8YGFD5lbt369d9/15ZKNm0iWxuDj6GXbs0CBgaMocAkrTbvX6FIAcGzPP99atvJ+pTAi5XpAe/F0VF80fK1by62jTXrKryvYP4jICyMnPPgvf2RxkbS+lyRdytdLkoY2O1iWFcHNnVZR4JJ06o/TudpJSR8+fxaC2+qkmQqanKW5xmoK+PjItTk1BRETl/169r5Sz8SYiNBYqLIY4fB+x2MIIvU4l794R48MBLgM0GPHkCFBaG19GjR0BJiWbt/2lQ7gq3boWnHKQkKysVYlcYKE+eDOlVXulyBaz5Px1kfDxZXk45PKw/8+/fKUtLl7zaL4LpW1ODIyImBti7FywoAHJzIex2ZRrt8SgTm95esK1NmRe8fSuElHpt/wdYX1ZMn/t4zQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0wNlQyMjo1ODo0MCswMDowMLIB828AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMDZUMjI6NTg6NDArMDA6MDDDXEvTAAAAAElFTkSuQmCC"
                  loading="lazy"
                  alt=""
                  class="imageNarBar"
                />
              </div>
            </div>
            <div
              class="dropdown-menu dropMover"
              id="dropdown-menu2"
              role="menu"
            >
              <div
                class="dropdown-content live"
                v-if="$store.state.arrayEncuestaActiveLiveMode.length > 0"
              >
                <a
                  class="dropdown-item"
                  v-for="(item, index) in $store.state
                    .arrayEncuestaActiveLiveMode"
                  :key="index"
                >
                  <div class="cubreEncuestaLiveFor">
                    <span style="margin-right: 10px">{{ index + 1 }}</span>
                    <i
                      class="fa fa-list-ol mr-3"
                      aria-hidden="true"
                      v-if="item.tipo == 1"
                    ></i>
                    <i
                      class="fa fa-comments mr-3"
                      aria-hidden="true"
                      v-if="item.tipo == 5"
                    ></i>
                    <i
                      class="fa fa-cloud mr-3"
                      aria-hidden="true"
                      v-if="item.tipo == 2"
                    ></i>
                    <i
                      class="fa fa-star mr-3"
                      aria-hidden="true"
                      v-if="item.tipo == 3"
                    ></i>
                    <i
                      class="fa fa-calendar mr-3"
                      aria-hidden="true"
                      v-if="item.tipo == 4"
                    ></i>

                    <span class="tituloEncuestaLiveItem">{{
                      item.titulo
                    }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </li>

        <li
          class="list-item-navLeft tareas"
          title="Pantalla Completa"
          alt="Pantalla Completa"
        >
          <div class="usersOnlineLiveFront">
            <i class="fa fa-eye" aria-hidden="true" style="font-size: 30px"></i>
            <span>{{ $store.state.usersOnline }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="navBarLeft">
      <ul role="list" class="listNavBarLeft">
        <li
          class="list-item-navLeft config"
          title="Compartir"
          @click="openModalCompartir"
          alt="Compartir"
        >
          <i class="fa fa-share" aria-hidden="true" style="font-size: 35px"></i>
        </li>

        <li
          class="list-item-navLeft config"
          title="Pantalla Completa"
          alt="Pantalla Completa"
          @click="activarFullScreen"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAQAAABQ8GUWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQflBgYXASOCY38rAAABFUlEQVR42u3bQQ6CMBCF4SkhXKMbvYmeWm8CG67RBePChSvDlIBP0v9bt/X1JSREx+TuboeYppSu1z1Och9Hs8vliJTdMZc/DwpQB1CjAHUANQpQB1BrvoAUehHy+91snuuOLiV1tXu+fPySs9kw1O3K2dLjsbaqjx02z6kbxz0us8WWIn2JrWv+EaAAdQA1ClAHUKMAdQA1ClAHUKMAdQC13mya1peVog5ar5TY3QAAAAAAANCW9B5CXOG3216/9f+KLzlbej7X1vWxCcza4YR/MAyRuzX/rTAFqAOoUYA6gBoFqAOoUYA6gBoFqAOoBWeFc47O3n78wbB0QGxafBP+NncKFKAOoEYB6gBqFKAOoNZ8AS/OFEW/caRO3gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0wNlQyMzowMTozNSswMDowMLooi9wAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMDZUMjM6MDE6MzUrMDA6MDDLdTNgAAAAAElFTkSuQmCC"
            loading="lazy"
            alt=""
            class="imageNarBar"
          />
        </li>
      </ul>
    </div>
    <div id="modalCompartir" class="modal">
      <div class="modal-background" @click="closeModalCompartir"></div>
      <div class="modal-content compartirModal">
        <div class="box" style="text-align: left">
          <h1 class="has-text-left">Compartir</h1>
          <div class="cubreTipoShare">
            <a :href="shareFacebook" target="_blank">
              <i class="fa fa-facebook-official" aria-hidden="true"></i>
              <span>Facebook</span>
            </a>
            <a :href="shareTwitter" target="_blank">
              <i class="fa fa-twitter-square" aria-hidden="true"></i>
              <span>Twitter</span>
            </a>

            <a :href="shareEmail">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span>Correo Electrónico</span>
            </a>
          </div>
          <div class="cubreClicCopiar" @click="copiarUrl">
            <span>{{ copiarUrlText }}</span>
            <div class="cubreInputClicCopiar">
              <input
                type="url"
                ref="inputCopy"
                readonly
                :value="$store.state.urlBase + '/p/' + $route.params.cod"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModalCompartir"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copiarUrlText: "Haz clic para copiar la Url",
      shareTwitter:
        "https://twitter.com/intent/tweet?text=Resultapp&amp;url=" +
        this.$store.state.urlBase +
        "/p/" +
        this.$route.params.cod,
      shareFacebook:
        "https://www.facebook.com/sharer/sharer.php?u=" +
        this.$store.state.urlBase +
        "/p/" +
        this.$route.params.cod,
      shareEmail:
        "mailto:?subject=Resultapp&amp;body=Participa en la siguiente encuesta " +
        this.$store.state.urlBase,
    };
  },
  methods: {
    copiarUrl() {
      const el = document.createElement("textarea");
      el.value = this.$store.state.urlBase + "/p/" + this.$route.params.cod;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.copiarUrlText = "Url Copiada";
      this.$refs.inputCopy.select();
    },
    openModalCompartir() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.add("is-clipped");
      document.getElementById("modalCompartir").classList.add("is-active");
    },
    closeModalCompartir() {
      var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
      root.classList.remove("is-clipped");
      document.getElementById("modalCompartir").classList.remove("is-active");
    },
    activarFullScreen() {},
  },
  mounted() {},
};
</script>

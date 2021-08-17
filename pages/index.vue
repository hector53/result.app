<template>
  <div>
    <section class="section-hero">
      <div class="container">
        <h1 class="hero-heading">
          {{ $store.state.idioma.headlineHero }} <br />
          {{ $store.state.idioma.headlineHero2 }}
        </h1>
        <p class="hero-subhead">{{ $store.state.idioma.subheadHero }}</p>

        <tipos-encuestas-index></tipos-encuestas-index>

        <div class="button-group">
          <nuxt-link v-if="!login" to="/signup" class="buttonN blue heartbeat">
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c78bcfb82c4e82764cc037_celebration_white_24dp.svg"
              loading="lazy"
              alt=""
              class="image-5"
            />
            <span>{{ $store.state.idioma.buttonHero }}</span>
          </nuxt-link>

          <nuxt-link to="/dashboard" v-if="login" class="buttonN">
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c78c828210e8904f54550c_space_dashboard_white_24dp.svg"
              loading="lazy"
              alt=""
              class="image-5"
            />
            <span>{{ $store.state.idioma.buttonSubHero }}</span>
          </nuxt-link>
          <nuxt-link to="/dashboard/not-registered" v-else class="buttonN">
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c78c828210e8904f54550c_space_dashboard_white_24dp.svg"
              loading="lazy"
              alt=""
              class="image-5"
            />
            <span>{{ $store.state.idioma.buttonSubHero }}</span>
          </nuxt-link>
        </div>

        <div class="div-block-23">
          <img
            src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204.png"
            width="940"
            sizes="(max-width: 479px) 94vw, (max-width: 767px) 95vw, (max-width: 991px) 728px, 940px"
            srcset="
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204-p-500.png   500w,
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204-p-800.png   800w,
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204-p-1080.png 1080w,
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204-p-1600.png 1600w,
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204-p-2000.png 2000w,
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204-p-2600.png 2600w,
              https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b41efbec10d104078f84a5_Recurso%204.png        3333w
            "
            alt=""
            class="image pulsate-bck"
          />
        </div>

        <div class="div-block-14">
          <h3 class="heading-3">{{ $store.state.idioma.brandTitle }}</h3>
          <div class="w-layout-grid grid-2">
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b3e9785508bb3835515e7a_home-logo-facebook.svg"
              loading="lazy"
              alt=""
              class="image-4"
            /><img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b3e987d63585722a12233d_home-logo-amazon.svg"
              loading="lazy"
              alt=""
              class="image-3"
            /><img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b3e9938e7b7ae950e9922d_home-logo-linkedin.svg"
              loading="lazy"
              alt=""
            /><img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b3e99cef9192be59080443_home-logo-whatsapp.svg"
              loading="lazy"
              alt=""
            /><img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b3e9a5388e8b33fad8a14e_home-logo-mailchimp.svg"
              loading="lazy"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section-hero" style="background-color: inherit">
      <div class="container">
        <h2 class="section-title">{{ $store.state.idioma.callHeadline }}</h2>
        <p class="section-subtitle">
          {{ $store.state.idioma.callSubheadline }}
        </p>

        <div class="columns">
          <div class="column is-6">
            <div class="div-block-18">
              <div
                style="padding-top: 56.17021276595745%"
                class="video w-video w-embed"
              >
            
                <iframe
                  class="embedly-embed"
                     src="https://www.youtube.com/embed/NAkq4o8XgNw"
                  scrolling="no"
                  title="YouTube embed"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen="true"
                ></iframe>
              </div>
            </div>
          </div>
          <div class="column is-6" style="padding-top: 79px; text-align: left">
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d5919aa5c02_4-icon-chrome.png"
              width="37px"
              alt=""
              class="grey-icon"
            />
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d4db8aa5c05_4-icon-fire.png"
              width="37px"
              alt=""
              class="grey-icon"
            />
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d8446aa5c0c_4-icon-ie.png"
              width="37px"
              alt=""
              class="grey-icon"
            />

            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d71f0aa5c0e_4-icon-safari.png"
              width="37px"
              alt=""
              class="grey-icon"
            />
            <h3>{{ $store.state.idioma.call2Headline }}</h3>
            <p>{{ $store.state.idioma.call2Subheadline }}</p>
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d4088aa5c10_5-icon-apple.png"
              width="37px"
              alt=""
              class="grey-icon"
            /><img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d02c7aa5c11_6-icon-android.png"
              width="37px"
              alt=""
              class="grey-icon"
            /><img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60b13cec71296d4894aa5c14_7-icon-microsoft.png"
              width="37px"
              alt=""
              class="grey-icon"
            />
            <h3>{{ $store.state.idioma.call3Headline }}</h3>
            <p>{{ $store.state.idioma.call3Subheadline }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-hero shake-lr" style="background-color: inherit">
      <div class="container-3 w-container">
        <h2 class="section-title">{{ $store.state.idioma.productHead }}</h2>
        <p class="section-subtitle">{{ $store.state.idioma.productSubhead }}</p>
        <div class="columns">
          <div class="column">
            <div class="div-block-21">
              <div class="div-block-20">
                <img
                  src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c76a74e35ebe1099f30a16_circle-process-1.svg"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div class="circle">
                <img
                  src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c77014fd9ca59a5279d72a_space_dashboard_black_24dp.svg"
                  width="243px"
                  alt=""
                  class="frames"
                />
              </div>
            </div>
            <h3>{{ $store.state.idioma.product1Head }}</h3>
            <p>{{ $store.state.idioma.product1Subhead }}</p>
          </div>
          <div class="column">
            <div class="div-block-21">
              <div class="div-block-20">
                <img
                  src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c76c0adaee41c383931188_circle-process-3.svg"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div class="circle">
                <img
                  src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c771e0aa3f763951371c8b_style_black_24dp.svg"
                  width="243px"
                  alt=""
                  class="frames"
                />
              </div>
            </div>
            <h3>{{ $store.state.idioma.product2Head }}</h3>
            <p>{{ $store.state.idioma.product2Subhead }}</p>
          </div>
          <div class="column">
            <div class="div-block-21">
              <div class="div-block-20">
                <img
                  src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c76c37134b87456bcd8005_circle-process-2.svg"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div class="circle">
                <img
                  src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c77203b83f55690d562465_analytics_black_24dp.svg"
                  width="243px"
                  alt=""
                  class="frames"
                />
              </div>
            </div>
            <h3>{{ $store.state.idioma.product3Head }}</h3>
            <p>{{ $store.state.idioma.product3Subhead }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-hero" style="background-color: inherit">
      <div class="container">
        <h2 class="section-title">{{ $store.state.idioma.featureHead }}</h2>
        <div class="columns">
          <div class="column">
            <div class="icons _1">
              <img
                src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c77664f20c340b678642f4_palette_black_24dp.svg"
                width="25"
                alt=""
              />
            </div>
            <h3>{{ $store.state.idioma.feature1Head }}</h3>
            <p>{{ $store.state.idioma.feature1Subhead }}</p>
          </div>
          <div class="column">
            <div class="icons _2">
              <img
                src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c7768d4d2b063f1e7acf99_verified_user_black_24dp.svg"
                width="25"
                alt=""
              />
            </div>

            <h3>{{ $store.state.idioma.feature2Head }}</h3>
            <p>{{ $store.state.idioma.feature2Subhead }}</p>
          </div>
          <div class="column">
            <div class="icons _3">
              <img
                src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c776f4febecf6d7f234e57_face_black_24dp.svg"
                width="25"
                alt=""
              />
            </div>
            <h3>{{ $store.state.idioma.feature3Head }}</h3>
            <p>L{{ $store.state.idioma.feature3Subhead }}</p>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="icons _4">
              <img
                src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c77715c88a572f86715693_qr_code_2_black_24dp.svg"
                width="25"
                alt=""
              />
            </div>
            <h3>{{ $store.state.idioma.feature4Head }}</h3>
            <p>{{ $store.state.idioma.feature4Subhead }}</p>
          </div>
          <div class="column">
            <div class="icons _5">
              <img
                src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c777bef0faa417cb3fa76d_video_library_black_24dp.svg"
                width="25"
                alt=""
              />
            </div>
            <h3>{{ $store.state.idioma.feature5Head }}</h3>
            <p>{{ $store.state.idioma.feature5Subhead }}</p>
          </div>
          <div class="column">
            <div class="icons _6">
              <img
                src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c777ebb00fa56123d58c2e_integration_instructions_black_24dp.svg"
                width="25"
                alt=""
              />
            </div>
            <h3>{{ $store.state.idioma.feature6Head }}</h3>
            <p>{{ $store.state.idioma.feature6Subhead }}</p>
          </div>
        </div>
        {{ $store.state.idioma.titleCloudWords }}

        <div class="button-group">
          <nuxt-link to="/price" class="buttonN blue">
            <span>VER PRECIOS</span>
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c78d0406a6de3f6ee384a9_credit_card_white_24dp.svg"
              loading="lazy"
              alt=""
              class="image-7"
            />
          </nuxt-link>

          <nuxt-link to="/signup" class="buttonN">
            <img
              src="https://uploads-ssl.webflow.com/60b13cec71296d20a8aa5bf0/60c78bcfb82c4e82764cc037_celebration_white_24dp.svg"
              loading="lazy"
              alt=""
              class="image-5"
            />
            <span>{{ $store.state.idioma.buttonHero }}</span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import tiposEncuestasIndex from "../components/indexComps/tiposEncuestasIndex.vue";
export default {
  components: { tiposEncuestasIndex },
  data() {
    return {
      navBar: false,
    };
  },
  computed: {
    ...mapState(["login"]),
  },
  methods: {
   
  },
  mounted() {},
};
</script>

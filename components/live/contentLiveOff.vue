<template>
<div>
 <div class="cubreContentLive" v-if="$store.state.eventLiveMode==0">
      <div class="contentColumnLive">
        <h1>Entrá a <br />result.app <br />#c0D 1g0</h1>
      </div>
      <div class="contentColumnLive">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaAQAAAAAefbjOAAAC/0lEQVR4nO2cwY3jMAxFP1cG5igDU0BKsTvYkgZb0nZglZICBrCOART8PVCSld2ZQ9YziePQB8ex9RARYb5ISooQVx/hx/UMYJBBBhlkkEEG7ROSfHQAooiMsQNCfxYZo4jeExGR8S7dM+iGUKcvwwQA8RUIIwD4kwB4IULvEgCXAABy6+4ZdDcoZgGQt9kRiB3I+SyAT9AHqiB36p5BN4O6j2/7kpQOR/miTzLoQaFwSOBUJWP0CZy+5ZMM2iRUNMITQCx3w+gSEF1C6GfK8BtoK1kbt8mgNRBIsn7bjhjmj06lwUCS08ZtMmgNpBrRCEA4nDSe1FM4nISXCrF5mwxaA2WNyCrgyMknvQJ8fkDWpzSNeBZIReEkaN3iXPMMR5Inq1A9AYT8s/ckJ7iL0cFThYJkTjhMI/YP5S+ZTCgnEtCc0xEqGeXKIsv9QyWO0ITDkVwyDCbkAMMn5LfmEXuHGo1Qtxj+0gifgGGurmIesXeo1iOWcaHqQXEBbahZh3nE3qF21BhIknNONxdXWRJU84gng2IHkUMWBRERIZkgI9pZ0MeyyaBrj0YAJl/HihJZFslwmqBaHLF/qI0sm/zywjc0xhxKS/OIXUMlNNCrPJvByae2dMUlvDSP2DvUVqgmIKcZ8O2AsdQjTCP2DzVFyhI4LCloqUxYHPFEUDv3mec5azCxTHbqlWnEM0BNPSIPHUtQqeMHmTUCVo94BqhZeStauIwdGHoHhH4mELsk+tC/l8Ybt8mgNVCNLJeUIqebOdCspeylrGkasWdIf/ZlZYxLDD/fBcBZCD8DwEmA+JoQpC6u27hNBn0BpHHEDMioN/L4kfft6JKq+vQxbDJoFRTrps7YaXgpb8yL7BBEJC+pulP3DLoj5BOAKMJf0uUaheYfR5FPodt1z6Bvhv7d5Rc7yDD3EMAlCf0MDMcXolmiv3GbDFoDXdQjatlhQlkkMZVdfm3BauM2GbQG+mxPF1CKU6VdM/u1cZsMWgOJ/TOZQQYZZJBBBhn0n9AfqUWuir7y8ngAAAAASUVORK5CYII="
          class="imgQr"
        />
      </div>
    </div>
 <div v-else>
    <div   v-for="(item, index) in $store.state.arrayEncuestaActiveLiveMode" :key="index"  style="margin-top: 70px;">
       <div class="cubreResults"  v-if="$store.state.encuestaActiveLiveMode == item.id" >
          <multiple-choice-result
          :ref="'encuestaFront_'+item.id"
          v-if="item.tipo == 1 " :id_encuesta="item.id" 
          :titulo_encuesta="item.titulo"
          ></multiple-choice-result>
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

  methods: {},
  mounted() {
  
  },
};
</script>
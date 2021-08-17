<template>
  <section class="section-hero pt-1" >
      <h1 >Upgrade yout account to <b style="    color: #59b1ff;">Pro Plan</b></h1>

       <b-field class="mt-5 mb-5">
            <div style="display: flex;    justify-content: center;    align-items: center;">
              <span :class="{'currentPlanPrice':isSwitched==false }" >Monthly</span>
            <b-switch v-model="isSwitched" @input="cambiarPlan"
            passive-type='is-info'
            type='is-success'
             style="margin-left: 20px;">
            </b-switch>
            <span :class="{'currentPlanPrice':isSwitched }">Annually</span>
            </div>
        </b-field>

     <div class='package2 brilliant' style="width: 300px;">
    <div class='name'>Pro</div>

    <hr style="    margin: 0;">
    <ul style="margin-top: 10px;    margin-bottom: 10px;">
      <li>
       Eventos ilimitados
      </li>
      <li>
        <strong>8</strong>
        tipos de encuestas
      </li>
      <li>
          Encuestas ilimitadas 
      </li>
      <li>
        Presentación en vivo 
      </li>
        <li>
        Reaccion con emojis 
      </li>
      <li>
        Analytics Avanzado
      </li>
      <li>
        Exportar Resultados
      </li>
     
    </ul>
     <hr>
    <h1 style="    font-size: 30px;">Total: {{price}} $</h1>
    <b-field
     :type="{ 'is-danger': hasError}"
              :message="{
                'Choose Billing Cycle': hasError ,
              }"
    >
      
              <b-button label="Continue to payment" type="is-info"  expanded @click="continueToPay" />
    </b-field>
   
  </div>

  

          
       
 
  </section>
</template>

<script>


export default {
  middleware: "miauth",
  head() {
    return {
      title: "Upgrade",
    };
  },
  data() {
    return {
      price: 59.90,
      hasError: false,
      isSwitched: true,
      currentPlan: 'Anual'
    };
  },
  methods: {
    cambiarPlan(val){
      console.log(val)
      if(val){
        this.price = 59.90
      }else{
        this.price = 9.90
      }
    },
    async  continueToPay(){
             
        
              let loader = this.$loading.show({
        loader: "dots",
        color: "#59b1ff",
      });

           await this.$axios
          .$post("get_data_by_stripe", {
            plan: this.isSwitched
          }).then((response) => {
           console.log(response);
          location.href = response.redirect

          })
          .catch(({ response }) => {
            console.log(response.data);
            this.$buefy.toast.open({
              duration: 5000,
              message: response.data.message,
              position: "is-bottom",
              type: "is-danger",
            });
          });
      

      },
        async getBillingData(){
          await this.$axios
        .$get("get_user_billing_data").then((response) => {
            console.log(response)
            if(response.status == 1){
              this.companyName = response.data[1]
              this.addressBilling = response.data[2]
              this.city = response.data[3]
              this.zip = response.data[4]
              this.country = response.data[5]
            }


        }).catch(({response}) => {

        })
    }
     },
  mounted() {
        var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.getBillingData()
  },
};
</script>

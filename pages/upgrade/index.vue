<template>
  <section class="section-hero pt-1" >
      <h1 class="has-text-left">Upgrade yout account to <b style="    color: #59b1ff;">Pro Plan</b></h1>
      <no-ssr>
    <div class="columns mt-5">
    <div class="column">
        <section class="has-text-left">
            <h1>Billing Info</h1>
          <b-field
            label="Company / name"
            :type="{ 'is-danger': hasError == 'company' }"
            :message="{
              'Company Name is required': hasError == 'company',
            }"
          >
            <b-input
              name="companyName"
              placeholder="Company / name"
              v-model="companyName"
            ></b-input>
          </b-field>
          <b-field
            label="Address"
            :type="{ 'is-danger': hasError == 'address' }"
            :message="{
              'Address is required': hasError == 'address',
            }"
          >
            <b-input
              name="address"
              placeholder="Address"
              v-model="addressBilling"
            ></b-input>
          </b-field>

          <b-field grouped>
            <b-field label="City" expanded  
            :type="{ 'is-danger': hasError == 'city' }"
            :message="{
              'City is required': hasError == 'city',
            }"
            >
              <b-input placeholder="City" v-model="city"></b-input>
            </b-field>
            <b-field label="Zip" expanded
            :type="{ 'is-danger': hasError == 'zip' }"
            :message="{
              'Zip is required': hasError == 'zip',
            }"
               >
              <b-input placeholder="Zip"  v-model="zip"  ></b-input>
            </b-field>
          </b-field>

          <b-field label="Country" :type="{ 'is-danger': hasError == 'country' }"
            :message="{
              'Country is required': hasError == 'country',
            }">
            <div class="control">
              <span class="select is-empty" style="width: 100%">
                <country-select
                  v-model="country"
                  :country="country"
                  style="width: 100%"
                />
              </span>
            </div>
          </b-field>

         
        </section>
    </div>
    <div class="column has-text-right">
         <div class='package2 brilliant'>
    <div class='name'>Pro</div>

    <hr>
    <ul>
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
    <h1 class="has-text-left">Total: 11$</h1>
    <hr>
    <h2 class="has-text-left" style="font-weight: bold">Payments Methods:</h2>

      <section class="has-text-left mt-5">
        <b-field  :type="{ 'is-danger': hasError == 'payment' }"
            :message="{
              'Payment Method    is required': hasError == 'payment',
            }" >
            <b-radio v-model="payment"
                native-value="1">
              <img src="/img/tarjetas.jpg" />  
            </b-radio>
        </b-field>
        <b-field  :type="{ 'is-danger': hasError == 'payment' }"
            :message="{
              'Payment Method    is required': hasError == 'payment',
            }" >
            <b-radio v-model="payment"
                native-value="2"
                type="is-info">
                <img src="/img/CRYPTO.jpg" />
            </b-radio>
        </b-field>
    </section>
   
  </div>
    </div>
 
    </div>
</no-ssr>

     <b-field
            ><!-- Label left empty for spacing -->
            <p class="control has-text-right">
              <b-button label="Continue to payment" type="is-info"  @click="continueToPay" />
            </p>
          </b-field>


          
       
 
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
      addressBilling: "",
      city: "",
      zip: "",
      country: "",
      hasError: false,
      companyName: "",
      payment: null
    };
  },
  methods: {
    async  continueToPay(){
             
        
      if (this.companyName == "") {
        this.hasError = "company";
        return false;
      }

       if (this.addressBilling == "") {
        this.hasError = "address";
        return false;
      }

       if (this.city == "") {
        this.hasError = "city";
        return false;
      }

       if (this.zip == "") {
        this.hasError = "zip";
        return false;
      }

       if (this.country == "") {
        this.hasError = "country";
        return false;
      }
     if (this.payment == null) {
        this.hasError = "payment";
        return false;
      }

         let loader = this.$loading.show({
        loader: "dots",
        color: "#59b1ff",
      });


       await this.$axios
          .$post("guardar_user_perfil_billing", {
            company: this.companyName,
            address: this.addressBilling,
            city: this.city,
            zip: this.zip,
            country: this.country,
          }).then((response) => {
            console.log(response);
            loader.hide()
           this.$router.push({name: "upgrade-success"})

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

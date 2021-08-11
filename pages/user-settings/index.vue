<template>
  <section class="section-hero pt-1 mt-0" >
    <no-ssr>
      <b-tabs v-model="activeTab" >
        <b-tab-item label="User Info" icon="account" >
          <section class="has-text-left">
            <b-field
              label="Name"
              :type="{ 'is-danger': hasError == 'name' }"
              :message="{
                'First Name and Last Name required': hasError == 'name',
              }"
            >
              <b-input
                name="firtName"
                placeholder="Firts Name"
                v-model="firstName"
                expanded
              ></b-input>
              <b-input
                name="LastName"
                placeholder="Last Name"
                v-model="lastName"
                expanded
              ></b-input>
            </b-field>

            <b-field
              label="Email"
              :type="{ 'is-danger': hasError == 'email' || hasErrorEmail }"
              :message="[
                { 'Email required': hasError == 'email' },
                { 'Email incorrect format': hasErrorEmail },
              ]"
            >
              <b-input type="email" v-model="email" maxlength="30"> </b-input>
            </b-field>

            <b-field
              label="Username"
              :type="{ 'is-danger': hasError == 'username' }"
              :message="{ 'Username required': hasError == 'username' }"
            >
              <b-input v-model="username" maxlength="30"></b-input>
            </b-field>

            <b-field
              label="Current Password"
              :type="{ 'is-danger': hasError == 'currentPass' }"
              :message="{
                'Current password no puede estar vacía':
                  hasError == 'currentPass',
              }"
            >
              <b-input
                type="password"
                placeholder="********"
                v-model="currentPass"
                maxlength="30"
              ></b-input>
            </b-field>
            <b-field
              label="New Password"
              :type="{ 'is-danger': hasError == 'newPass' }"
              :message="{
                'New password no puede estar vacía': hasError == 'newPass',
              }"
            >
              <b-input
                type="password"
                placeholder="********"
                v-model="newPass"
                maxlength="30"
              ></b-input>
            </b-field>

            <b-field
              ><!-- Label left empty for spacing -->
              <p class="control has-text-center">
                <b-button label="Save" type="is-info" @click="guardarPerfil" />
              </p>
            </b-field>
          </section>
        </b-tab-item>
        <b-tab-item label="Billing Info" icon="wallet"  v-if="$store.state.premium > 0">
          <section class="has-text-left">
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
              <b-field
                label="City"
                expanded
                :type="{ 'is-danger': hasError == 'city' }"
                :message="{
                  'City is required': hasError == 'city',
                }"
              >
                <b-input placeholder="City" v-model="city"></b-input>
              </b-field>
              <b-field
                label="Zip"
                expanded
                :type="{ 'is-danger': hasError == 'zip' }"
                :message="{
                  'Zip is required': hasError == 'zip',
                }"
              >
                <b-input placeholder="Zip" v-model="zip"></b-input>
              </b-field>
            </b-field>

            <b-field
              label="Country"
              :type="{ 'is-danger': hasError == 'country' }"
              :message="{
                'Country is required': hasError == 'country',
              }"
            >
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

            <b-field
              ><!-- Label left empty for spacing -->
              <p class="control has-text-center">
                <b-button label="Save" type="is-info" @click="guardarBilling" />
              </p>
            </b-field>
          </section>
        </b-tab-item>
        <b-tab-item label="My Suscription" icon="account-clock" v-if="$store.state.premium > 0">
          <section class="has-text-left">
            <div
              data-v-67eab706=""
              style="
                border: 1px solid rgb(232, 240, 247);
                border-radius: 4px;
                padding: 16px;
                margin-bottom: 16px;
              "
            >
              <p data-v-67eab706="">Current Plan</p>
              <h4 data-v-67eab706="" style="padding-top: unset">
                {{$store.state.planName}} (monthly)
              </h4>
              <h5 data-v-67eab706=""  v-if="activePlan==1">next renewal {{renewalDate}}</h5>
               <h5 data-v-67eab706=""  v-if="activePlan==0">End date {{renewalDate}}</h5>
            </div>

             <b-button size="is-medium" type="is-danger" @click="CancelSuscription" v-if="activePlan==1"
                >
                Cancel Suscription
            </b-button>

            <b-button size="is-medium" type="is-info" @click="yesCancelSuscription"  v-if="activePlan==0"
                >
                Renovar Suscription
            </b-button>
          </section>
        </b-tab-item>
        <b-tab-item label="Payment History" icon="clipboard-list-outline" v-if="$store.state.premium > 0">
          <section class="has-text-left">
            <b-table
              striped
              hoverable
              :data="dataPayments"
              :columns="columnspayments"
            ></b-table>
          </section>
        </b-tab-item>
      </b-tabs>
    </no-ssr>
  </section>
</template>

<script>

export default {
 
  watch: {
    currentPass: function (values, oldValues) {
      if (this.hasError == "currentPass" && values != "") {
        this.hasError = "";
      }
    },
    newPass: function (values, oldValues) {
      if (this.hasError == "newPass" && values != "") {
        this.hasError = "";
      }
    },
  },
    middleware: "miauth",
  head() {
    return {
      title: "User Settings",
    };
  },
  data() {
    return {
      //table payments history
      dataPayments: [
        
      ],
      columnspayments: [
        {
          field: "amount",
          label: "Amount",
          centered: true,
        },
        {
          field: "description",
          label: "Description",
        },
        {
          field: "payment_date",
          label: "Payment date",
        },
        {
          field: "status",
          label: "Status",
          centered: true,
        },
      ],
      //tab
      activeTab: 0,
      //billing data
      companyName: "",
      addressBilling: "",
      city: "",
      zip: "",
      country: "",
      //error var
      hasError: false,
      //user data
      firstName: this.$store.state.firtsName,
      lastName: this.$store.state.lastName,
      email: this.$store.state.email,
      username: this.$store.state.username,
      hasErrorEmail: false,
      currentPass: "",
      newPass: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      //suscription data
      renewalDate: '', 
      activePlan: ''
    };
  },
  methods: {

    async yesCancelSuscription(){
let loader = this.$loading.show({
                      loader: "dots",
                      color: "#59b1ff",
                      });
       await this.$axios
        .$post("cancel_user_suscription")
        .then((response) => {
          this.getBillingData()
          console.log(response);
          if(response.active == 1){
              this.$buefy.toast.open({
              message: "Renovada correctamente",
              type: "is-success",
              });
          }else{
             this.$buefy.toast.open({
            message: "Cancelada correctamente",
            type: "is-success",
          });
          }
         
          loader.hide()
        })
        .catch(({ response }) => {
          console.log(response.data);
             loader.hide()
          this.$buefy.toast.open({
            duration: 5000,
            message: response.data.message,
            position: "is-bottom",
            type: "is-danger",
          });
        });

    },
         CancelSuscription() {
                this.$buefy.dialog.confirm({
                    title: 'Cancel Suscription',
                    message: 'Your subscription will continue to run until the end of the billing cycle. You can always resume your subscription before it is truly canceled.',
                    confirmText: 'Yes Cancel',
                    cancelText: 'NO',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => {
                      this.yesCancelSuscription()
                    }
                })
            },


    async guardarBilling() {
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

      await this.$axios
        .$post("guardar_user_perfil_billing", {
          company: this.companyName,
          address: this.addressBilling,
          city: this.city,
          zip: this.zip,
          country: this.country,
        })
        .then((response) => {
          console.log(response);
          this.$buefy.toast.open({
            message: "Guardado correctamente",
            type: "is-success",
          });
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

    async guardarPerfil() {
      if (this.firstName == "") {
        this.hasError = "name";
        return false;
      }

      if (this.lastName == "") {
        this.hasError = "name";
        return false;
      }

      if (this.email == "") {
        this.hasError = "email";
        return false;
      }
      if (!this.reg.test(this.email)) {
        this.hasErrorEmail = true;
        return false;
      }

      if (this.username == "") {
        this.hasError = "username";
        return false;
      }

      //listo esta parte
      //ahora validad las passwordsssss

      if (this.currentPass == "" && this.newPass == "") {
        //entonces guardar los cambios de los datos de arriba
        await this.$axios
          .$post("guardar_user_perfil", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            tipo: 1,
            currentPass: this.currentPass,
            newPass: this.newPass,
          })
          .then((response) => {
            console.log(response);
            this.$buefy.toast.open({
              message: "Guardado correctamente",
              type: "is-success",
            });
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
      } else {
        //no estan vacías el usuario quiere cambar la clave
        if (this.currentPass == "") {
          this.hasError = "currentPass";
          return false;
        }
        if (this.newPass == "") {
          this.hasError = "newPass";
          return false;
        }

        //ahora enviar datos a la db y validar
        await this.$axios
          .$post("guardar_user_perfil", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            tipo: 2,
            currentPass: this.currentPass,
            newPass: this.newPass,
          })
          .then((response) => {
            console.log(response);
            this.$buefy.toast.open({
              message: "Guardado correctamente",
              type: "is-success",
            });
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
      }
    },
    async getBillingData() {
      await this.$axios
        .$get("get_user_billing_data")
        .then((response) => {
          console.log(response);
          if (response.status == 1) {
            this.companyName = response.dataBilling[1];
            this.addressBilling = response.dataBilling[2];
            this.city = response.dataBilling[3];
            this.zip = response.dataBilling[4];
            this.country = response.dataBilling[5];
            this.renewalDate = response.renewalPlan
            this.activePlan = response.activePlan

            this.dataPayments = response.payments
          }
        })
        .catch(({ response }) => {});
    },
  },
  mounted() {
    var tokenUser = this.$cookies.get("r_auth");
    this.$axios.setToken(tokenUser, "Bearer");
    this.getBillingData();
  },
};
</script>
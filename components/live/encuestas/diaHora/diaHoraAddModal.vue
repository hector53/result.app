<template>
  <div>
    <h1 class="headingM has-text-left">Encuesta Día y Hora</h1>
    <div class="control mt-2">
      <input class="input" type="text" v-model="titulo" placeholder="Título" />
    </div>
    <div class="columns mt-2" st>
      <div class="column">
        <b-datepicker
          v-model="date"
          inline
          multiple
          :unselectable-dates="unselectableDates"
          :nearby-month-days="false"
          :date-formatter="formatoFecha"
          :locale="locale"
        >
        </b-datepicker>
      </div>
      <div class="column" v-if="date.length > 0">
        <div v-for="(item, index) in date" :key="index">
          <h2 v-text="extraerDia(item)" class="diaTitulo"></h2>
          <div class="cubreHoras">
            <div
              class="columns"
              v-for="(item2, index2) in time[index].horas"
              :key="index2"
              style="
                padding-left: 10px;
                padding-right: 10px;
                margin: 0;
                margin-bottom: 10px;
                display: flex;
              "
            >
              <b-field label="Hora" style="padding-top: 10px; width: 100%">
                <b-timepicker
                  :time-formatter="formatoHora"
                  icon="clock"
                  hour-format="12"
                  placeholder="Hora"
                  :id="'tiempo_' + index"
                  v-model="time[index].horas[index2].ini"
                  inline
                ></b-timepicker>
              </b-field>
              <a
                v-if="index2 > 0"
                class="close close_option"
                style="margin-top: 55px"
                @click="quitarHoras(index, index2)"
              ></a>
            </div>
            <button @click="agregarHoras(index)" class="btnAddHoras">
              Agregar +Horas
            </button>
          </div>
        </div>
      </div>

      <div class="column columnaCentrada" v-else>
        <h2>Horarios</h2>
      </div>
    </div>
    <div class="control has-text-centered">
      <button
        class="buttonN blue"
        style="display: inline"
        @click="guardarEncuesta(0)"
      >
        Guardar
      </button>
    </div>
    {{time}}
  </div>
</template>

<script>
var today = new Date();
var days = 86400000; //number of milliseconds in a day
var fechaAyer = new Date(today - 1 * days);
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(timeZone);

var d = new Date();
console.log(d.toLocaleString("en-US", { timeZone }));
export default {
  watch: {
    time: function (values, oldValues) {
      console.log("valor colocado: ", values);
    },
    date: function (values, oldValues) {
      var first = oldValues;
      var second = values;

      var difference = first.filter((x) => second.indexOf(x) === -1);

      if (difference.length == 0) {
        console.log("es nuevo");
        //buscar el valor nuevo
        var first2 = values;
        var second2 = oldValues;
        var difference2 = first2.filter((x) => second2.indexOf(x) === -1);
        var d = new Date();

        this.time.push({
          id: this.convertDate(difference2),
          horas: [{ ini: d, fin: d }],
        });
        console.log(this.convertDate(difference2));
      } else {
        console.log("quito la selecciion", this.convertDate(difference));
        const index = this.time.findIndex(
          (fruta) => fruta.id === this.convertDate(difference)
        );
        console.log("resultado", index);
        this.time.splice(index, 1);
      }
    },
  },
  data() {
    return {
      date: [],
      time: [],
      mostarHora: true,
      horarios: false,
      locale: undefined, // Browser locale
      titulo: "",
    };
  },
  methods: {
   async  guardarEncuesta(val) {
      if (this.titulo == "") {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes agregar un título",
        });
        return false;
      }

      if (this.date.length == 0) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Debes agregar un dia en el calendario",
        });
        return false;
      }
      for (var i = 0; i < this.time.length; i++) {
        for (var e = 0; e < this.time[i].horas.length; e++) {
          console.log();
          var d = this.time[i].horas[e].ini;
          var n = d.getHours();
          console.log(n);
          if (n == 0) {
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "La hora debe ser mayor a 0",
            });
            return false;
          }
        }
      }
      //ahora si enviar a la db encuesta
      const response = await this.$axios.$post("create_diayhora_live", {
        titulo: this.titulo,
        dias: JSON.stringify(this.date),
        horas: JSON.stringify(this.time),
        codigo: this.$route.params.cod,
        activar: val,
      });
      console.log(response);
      if (response.status == 1) {
        if (val == 1) {
          this.$store.commit("seteventLiveMode", 1);
          this.$store.commit("setcandadoModoLive", 1);
        }
        this.$emit("cerrarModal");
      } else {
        this.isLoading = false;
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "Error en los datos ingresados",
          confirmButtonText: `OK`,
        });
      }
    },
    formatoHora(dt) {
      console.log("hoa", dt);
      var dateoptions = { year: "numeric", month: "short", day: "numeric" };
      return dt.toLocaleDateString("es-ES", dateoptions);
    },
    formatoFecha(dt) {
      var dateoptions = { year: "numeric", month: "short", day: "numeric" };
      return dt.toLocaleDateString("es-ES", dateoptions);
    },
    quitarHoras(index, index2) {
      this.time[index].horas.splice(index2, 1);
    },
    extraerDia(fecha) {
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayu",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      var date = fecha;
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();
      if (dt < 10) {
        dt = "0" + dt;
      }

      return dt + " de " + monthNames[month];
    },
    agregarHoras(index) {
      console.log("hola", this.time[index].horas);
      var d = new Date();
      //d.setHours(0, 0, 0, 0);
      this.time[index].horas.push({ ini: d, fin: d });
    },
    unselectableDates(day) {
      // console.log(day)

      return day <= fechaAyer;
    },
    clickCalendar(val) {
      console.log("clic calendario", val);
    },
    convertDate(val) {
      var date = new Date(val);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return  year + "-" + month + "-" + dt ;
    },
    convertTZ(date, tzString) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
        )
      );
    },
  },
  mounted() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timeZone);

    var d = new Date();
    console.log(d.toLocaleString("en-US", { timeZone }));
    var d = new Date();
    var n = d.getTimezoneOffset();
    console.log("zona horaria: ", n);
    var horaServer = "2021-07-12T08:00:00.000Z";
    var horaVenezuela = this.convertTZ(horaServer, "America/Caracas"); // Tue Apr 20 2012 17:10:30 GMT+0700 (Western Indonesia Time)
    console.log(horaVenezuela);
  },
};
</script>

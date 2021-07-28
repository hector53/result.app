<template>
  <div class="cubreEncuesta1">
    <div class="columns">
      <div class="column is-4">
        <div class="cubreNumber">
          <h4 class="titleEncuesta">Dia y Hora</h4>
          <div class="cubreLogoNumber">
            <div class="logotipo-copy">
              <div class="logotipo-fill-copy">
                <div class="numberTipeEncuesta">{{ numero + 1 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="container">
          <div class="hoverOpciones" style="margin-bottom: 20px">
            <a @click="guardarEncuesta(0)"
              ><i class="fa fa-floppy-o" aria-hidden="true"></i
            ></a>
            <a @click="moverArriba(numero)"
              ><i class="fa fa-arrow-up" aria-hidden="true"></i
            ></a>
            <a @click="moverAbajo(numero)"
              ><i class="fa fa-arrow-down" aria-hidden="true"></i
            ></a>
            <a @click="eliminar()"
              ><i class="fa fa-trash" aria-hidden="true"></i
            ></a>
          </div>
          <div class="control mt-2">
            <input
              class="input"
              type="text"
              v-model="titulo"
              placeholder="Título"
            />
          </div>
          <div class="cubreEncuestaCalendario mt-5 mb-5">
            <div class="cubreCalendario">
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
            <div class="CubreHorarios" v-if="date.length > 0">
              <div
                v-for="(item, index) in date"
                :key="index"
                class="cubreColumnH"
              >
                <h2 v-text="extraerDia(item)" class="diaTitulo"></h2>
                <div class="cubreHoras">
                  <div
                    class="xxx"
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
                    <b-timepicker
                      class="mt-3 horaT"
                      :id="'tiempo_' + index"
                      v-model="time[index].horas[index2].ini"
                      hour-format="24"
                      placeholder="Hora... "
                      icon="clock"
                      editable
                    ></b-timepicker>
                    <a
                      v-if="index2 > 0"
                      class="close close_option closeDate"
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
        </div>
      </div>
    </div>
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
  props: ["numero", "idEcuesta"],
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
        d.setHours(7, 0, 0, 0);
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
      titulo: "",
      id_encuesta: this.idEcuesta,
      date: [],
      time: [],
      mostarHora: true,
      horarios: false,
      locale: undefined, // Browser locale
      zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },

  methods: {
    eliminar() {
      this.$emit("eliminarEncuesta", {
        id_encuesta: this.id_encuesta,
        index: this.numero,
      });
    },
    moverArriba(index) {
      this.$emit("moverArriba", {
        id_encuesta: this.id_encuesta,
        index: index,
      });
    },
    moverAbajo(index) {
      this.$emit("moverAbajo", { id_encuesta: this.id_encuesta, index: index });
    },
    async guardarEncuesta(val) {
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
      await this.$axios
        .$post("create_diayhora_live", {
          titulo: this.titulo,
          dias: JSON.stringify(this.date),
          horas: JSON.stringify(this.time),
          codigo: this.$route.params.cod,
          activar: val,
          zonaHoraria: this.zonaHoraria,
        })
        .then((response) => {
          if (response.status == 1) {
            this.$emit("actualizarArray");
          } else {
            this.isLoading = false;
            this.$swal({
              type: "error",
              title: "Oops...",
              text: "Error en los datos ingresados",
              confirmButtonText: `OK`,
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
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
      console.log("tamaño;", this.time[index].horas.length);
      var lenHoras = this.time[index].horas.length;
      var d = new Date(this.time[index].horas[lenHoras - 1].ini);
      d.setSeconds(3600);
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
      return year + "-" + month + "-" + dt;
    },
    convertDateTime(val) {
      var date = new Date(val);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();
      var hora = date.getHours();
      var min = date.getMinutes();
      var seg = date.getSeconds();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + dt + " " + hora + ":" + min + ":" + seg;
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
  mounted() {},
};
</script>

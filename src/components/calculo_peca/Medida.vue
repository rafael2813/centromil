<template>
  <transition name="slide-fade">
    <v-row v-show="medida.visivel">
      <v-col cols="5">
        <v-select v-model="medida.unidade" :items="unidades"
          label="Unid." @change="mudanca_unid()" outlined
          color="blue darken-4">
        </v-select>
      </v-col>
      <v-col v-if="metro" cols="7">
        <v-text-field v-model="medida.valor" type="number"
          :label="medida.dimensao" outlined color="blue darken-4"/>
      </v-col>
      <v-col v-else cols="7">
        <v-select v-model="medida.valor"
          :items="arr_pol.map(f => `${f.frac_str}: ${f.frac_mm} mm`)"
          :label="medida.dimensao" outlined color="blue darken-4">
        </v-select>
      </v-col>
    </v-row>
  </transition>
</template>

<script>

export default {
  name: 'Medida',
  components: { },
  data: () => ({
    unidades: ['cm', 'mm', 'pol'],
    metro: true,
    pol: 25.4,
    fracoes_str: [
      '1/32', '1/16', '3/32', '1/8', '5/32',
      '3/16', '7/32', '1/4', '9/32', '5/16',
      '11/32', '3/8', '13/32', '7/16', '15/32',
      '1/2', '17/32', '9/16', '19/32', '5/8',
      '21/32', '11/16', '23/32', '3/4', '25/32',
      '13/16', '27/32', '7/8', '29/32', '15/16',
      '31/32', '1',
    ],
    fracao: 0,
    arr_pol: [],
  }),
  props: ['medida'],
  methods: {
    mudanca_unid() {
      this.metro = this.medida.unidade !== 'pol'
      this.medida.valor = null
    },
    conversao_fracoes() {
      this.fracoes_str.map(f => {
        let num = f.split('/')[0]
        let den = f.split('/')[1] ? f.split('/')[1] : 1
        this.arr_pol.push({
          'frac_str': f,
          'frac_num': num / den,
          'frac_mm': (num / den * this.pol).toFixed(3),
        })
      })
    },
  },
  created() {
    this.conversao_fracoes()
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 1.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
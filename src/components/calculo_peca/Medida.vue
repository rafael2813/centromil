<template>
  <transition name="slide-fade">
    <v-row v-show="medida.visivel">
      <v-col :cols="metro ? 4 : 3" class="pl-1 pr-0 mx-0">
        <v-select v-model="medida.unidade" :items="unidades"
          label="Unidade" @change="mudanca_unidade()" outlined
          color="blue darken-4">
        </v-select>
      </v-col>
      <v-col v-if="metro" cols="8" class="pr-1 mx-0">
        <v-text-field v-model="medida.valor" type="number"
          :label="medida.dimensao" outlined color="blue darken-4"/>
      </v-col>
      <v-col v-else cols="9" class="pr-1 mx-0">
        <v-row>
          <v-col class="pr-0 ma-0">
            <v-select v-model="polint" :items="arr_polint"
              label="Inteira" @change="conversao_polegada()" outlined
              color="blue darken-4">
            </v-select>
          </v-col>
          <v-col class="px-1 ma-0">
            <v-select v-model="polnum" :items="arr_polnum"
              label="Numer." @change="conversao_polegada()" outlined
              color="blue darken-4">
            </v-select>
          </v-col>
          <v-col class="pl-0 ma-0">
            <v-select v-model="polden" :items="arr_polden"
              label="Denom." @change="carrega_numerador()" outlined
              color="blue darken-4">
            </v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </transition>
</template>

<script>

export default {
  name: 'Medida',
  data: () => ({
    unidades: ['mm', 'pol'],
    metro: true,
    pol: 25.4,
    arr_polint: Array(21).fill().map((_, i) => i),
    arr_polden: Array(6).fill().map((_, i) => 2 ** i),
    arr_polnum: [0],
    polint: 0,
    polden: 1,
    polnum: 0,
    valor_mm: 0,
  }),
  props: ['medida'],
  methods: {
    mudanca_unidade() {
      this.metro = this.medida.unidade !== 'pol'
      this.medida.valor = null
    },
    carrega_numerador() {
      this.arr_polnum = []
      this.polnum = 0
      this.arr_polnum.push(0)
      this.arr_polnum.push(...Array(this.polden).fill()
        .map((_, i) => (i * 2) + 1).filter(n => n < this.polden))
    },
    conversao_polegada() {
      this.medida.valor = this.pol * (this.polint + this.polnum / this.polden)
      console.log(this.medida.valor)
    },
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
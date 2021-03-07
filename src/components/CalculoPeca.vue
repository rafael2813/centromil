<template>
  <v-container px-0 fluid>
    <v-card class="mx-2 my-2" tile elevation=5>
      <v-row class="px-4 pt-5 d-flex justify-space-between align-center">
        <v-col cols="4">
          <v-select v-model="material" :items="materiais.map(m => `${m.metal}: peso específico = ${m.massa_especifica}`)" @change="preco_por()" label="Material" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col>
          <Perfil :geometria='geometria' :medidas=medidas />
        </v-col>
      </v-row>
      <v-row class="px-4 d-flex justify-space-between align-center" >
        <v-col v-for="medida in medidas" :key="medida.id" >
          <Medida :medida="medida" />
        </v-col>
      </v-row>
      <v-row class="px-4 d-flex justify-space-between align-center">
        <v-col cols="2">
          <v-select v-model="preco[0].unidade" :items="precos" @change="preco_por()" label="Preço por" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="preco[0].valor" type="number" @keyup="preco_por()" :label="`R$ / ${preco[0].unidade}`" outlined color="blue darken-4"/>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="comprimento" type="number" @keyup="preco_por()" label="Comprimento (metros)" outlined color="blue darken-4"/>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="quantidade" type="number" label="Quantidade de Peças" outlined color="blue darken-4"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
          <div class="px-4 pt-5 font-weight-black">
            FÓRMULA DO CÁLCULO DA SEÇÃO TRANSVERSAL = {{ geometria.formula }}
          </div>
          <div class="px-4 pt-5 font-weight-black">
            ÁREA DA SEÇÃO TRANSVERSAL = {{ area | virgula }} cm²
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PESO POR METRO LINEAR = {{ peso_por_metro | virgula }} kg / m
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PESO POR PEÇA = {{ peso_por_peca | virgula }} kg
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PREÇO POR {{ preco[1].unidade.toUpperCase() }} = {{ preco[1].valor | moeda | virgula }}
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PREÇO POR {{ preco[2].unidade.toUpperCase() }} = {{ preco[2].valor | moeda | virgula }}
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PESO TOTAL = {{ peso_total | virgula }} kg
          </div>
          <div class="px-4 py-5 font-weight-black">
            VALOR TOTAL = {{ valor_total | moeda | virgula }}
          </div>
    </v-card>
  </v-container>
</template>

<script>
import Perfil from './Perfil'
import Medida from './Medida'
export default {
  name: 'CalculoPeca',
  components: { Perfil, Medida },
  data: () => ({
    pi: 3.14,
    geometria: { 'perfil': null, 'secao': null, 'espessura': false, 'formula': '' },
    formula: '',
    medidas: [
      { id: 0, dimensao: 'Altura', unidade: null, valor: null, visivel: true },
      { id: 1, dimensao: 'Largura', unidade: null, valor: null, visivel: true },
      { id: 2, dimensao: 'Espessura', unidade: null, valor: null, visivel: true },
    ],
    materiais: [
      { id: 0, metal: 'Alumínio', massa_especifica: 2.71 },
      { id: 1, metal: 'Cobre', massa_especifica: 8.9 },
      { id: 2, metal: 'Ferro', massa_especifica: 8 },
      { id: 3, metal: 'Latão', massa_especifica: 8.4 },
    ],
    material: '',
    precos: ['Quilo', 'Metro', 'Peça'],
    preco: [
      { 'valor': '', 'unidade': '' },
      { 'valor': '', 'unidade': '' },
      { 'valor': '', 'unidade': '' },
    ],
    comprimento: null,
    valor_kg: null,
    quantidade: null,
  }),
  computed: {
    area() {
      let arr_un = []
      let arr_valor = []
      let calculada = 0
      if (this.geometria.perfil === '') return '0.00'
      this.medidas.map(m => {
        if (m.unidade === 'cm') {
          arr_un.push(1)
          arr_valor.push(parseFloat(m.valor))
        }
        else if (m.unidade === 'mm') {
          arr_un.push(0.1)
          arr_valor.push(parseFloat(m.valor))
        }
        else if (m.unidade === 'pol') {
          arr_un.push(1)
          if (m.valor) arr_valor.push(parseFloat(m.valor.endsWith('mm') ? m.valor.split(' ')[1] : m.valor))
        }
        else {
          arr_un.push(1)
          arr_valor.push(0)
        }
      })
      if (this.geometria.secao === 'Quadrado') {
        calculada = this.geometria.espessura
          ? (4 * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] - arr_valor[2] * arr_un[2]))
          : (arr_valor[0] * arr_un[0]) ** 2
      }
      else if (this.geometria.secao === 'Redondo') {
        calculada = this.geometria.espessura
          ? (this.pi * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] - arr_valor[2] * arr_un[2]))
          : (this.pi * (arr_valor[0] * arr_un[0]) ** 2) / 4
      }
      else if (this.geometria.secao === 'Retangular') {
        calculada = this.geometria.espessura
          ? (2 * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] + arr_valor[1] * arr_un[1] - 2 * arr_valor[2] * arr_un[2]))
          : arr_valor[0] * arr_un[0] * arr_valor[1] * arr_un[1]
      }
      else if (this.geometria.secao === 'Sextavado') {
        calculada = this.geometria.espessura
          ? (2 * 3 ** 0.5 * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] - arr_valor[2] * arr_un[2]))
          : (3 ** 0.5) * ((arr_valor[0] * arr_un[0]) ** 2) / 2
      }
      else if (this.geometria.secao === 'U') {
        calculada = arr_valor[2] * arr_un[2] * (2 * arr_valor[0] * arr_un[0] + arr_valor[1] * arr_un[1] - 2 * arr_valor[2] * arr_un[2])
      }
      else if (['L', 'T'].includes(this.geometria.secao)) {
        calculada = arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] + arr_valor[1] * arr_un[1] - arr_valor[2] * arr_un[2])
      }
      calculada = Number.isNaN(calculada) ? 0 : calculada
      return (calculada).toFixed(2)
    },
    volume() {
      return (this.area * this.comprimento * 100).toFixed(2)
    },
    peso_por_metro() {
      let massa = this.material.split(' ').slice(-1) / 1000
      return (this.area * 100 * massa).toFixed(2)
    },
    peso_por_peca() {
      let massa = this.material.split(' ').slice(-1) / 1000
      return (this.volume * massa).toFixed(2)
    },
    peso_total() {
      return (this.peso_por_peca * this.quantidade).toFixed(2)
    },
    valor_total() {
      return (this.valor_kg * this.peso_total).toFixed(2)
    },
  },
  methods: {
    preco_por() {
      if (this.preco[0].unidade === 'Quilo') this.valor_kg = this.preco[0].valor
      else if (this.preco[0].unidade === 'Metro') this.valor_kg = this.preco[0].valor / this.peso_por_metro
      else this.valor_kg = this.preco[0].valor / this.peso_por_peca
      this.preco[1].unidade = (this.preco[0].unidade === 'Quilo') ? 'Metro' : 'Quilo'
      this.preco[2].unidade = (this.preco[0].unidade === 'Peça') ? 'Metro' : 'Peça'
      this.preco[1].valor = (this.preco[0].unidade === 'Quilo')
        ? (this.preco[0].valor * this.peso_por_metro).toFixed(2)
        : (this.preco[0].valor / this.peso_por_metro).toFixed(2)
      this.preco[2].valor = (this.preco[0].unidade === 'Peça')
        ? (this.preco[0].valor * this.peso_por_metro).toFixed(2)
        : (this.preco[0].valor * this.comprimento).toFixed(2)
    },
  },
  filters: {
    moeda: value => {
      return 'R$ ' + value.toLocaleString('pt-br')
    },
    virgula: value => {
      return typeof(value) === 'string' ? value.replace('.', ',') : '0,00'
    },
  },
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
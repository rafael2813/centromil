<template>
  <v-container px-0 fluid>
    <v-card class="mx-2 my-2" tile elevation=10>
      <v-row class="px-4 pt-4 d-flex justify-space-between align-center">
        <v-col cols="4">
          <v-select v-model="material"
            :items="materiais.map(
              m => `${m.metal}: peso específico = ${m.massa_especifica}`)"
            @change="preco_por()" label="Material" outlined
            color="blue darken-4">
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
          <v-select v-model.number="preco[0].unidade" :items="precos"
            @change="preco_por()" label="Preço por" outlined
            color="blue darken-4">
          </v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model.number="preco[0].valor" type="number"
            @keyup="preco_por()" :label="`R$ / ${preco[0].unidade}`"
            outlined color="blue darken-4"/>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model.number="comprimento" type="number"
            @keyup="preco_por()" label="Comprimento (metros)" outlined
            color="blue darken-4"/>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model.number="quantidade" type="number"
            label="Quantidade de Peças" outlined color="blue darken-4"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
          <div class="px-4 pt-5 font-weight-black">
            FÓRMULA DO CÁLCULO DA SEÇÃO TRANSVERSAL = {{ geometria.formula }}
          </div>
          <div class="px-4 pt-3 font-weight-black">
            ÁREA DA SEÇÃO TRANSVERSAL = {{ area | virgula }} cm²
          </div>
          <div class="px-4 pt-3 font-weight-black">
            PESO POR METRO LINEAR = {{ peso_por_metro | virgula }} kg / m
          </div>
          <div class="px-4 pt-3 font-weight-black">
            PESO POR PEÇA = {{ peso_por_peca | virgula }} kg
          </div>
          <div class="px-4 pt-3 font-weight-black">
            PREÇO POR {{ preco[1].unidade.toUpperCase() }} = R$ {{ preco[1].valor | virgula }}
          </div>
          <div class="px-4 pt-3 font-weight-black">
            PREÇO POR {{ preco[2].unidade.toUpperCase() }} = R$ {{ preco[2].valor | virgula }}
          </div>
          <div class="px-4 pt-3 font-weight-black">
            PESO TOTAL = {{ peso_total | virgula }} kg
          </div>
          <div class="px-4 py-4 font-weight-black">
            VALOR TOTAL = R$ {{ valor_total | virgula }}
          </div>
    </v-card>
  </v-container>
</template>

<script>
import Perfil from './Perfil'
import Medida from './Medida'
import funcoes_area from '@/functions/funcoes_area'

export default {
  name: 'CalculoPeca',
  components: { Perfil, Medida },
  data: () => ({
    geometria: { 'perfil': null, 'secao': null, 'espessura': false, 'formula': '' },
    formula: '',
    medidas: [
      { id: 0, dimensao: 'Altura', unidade: null, valor: null, visivel: true },
      { id: 1, dimensao: 'Largura', unidade: null, valor: null, visivel: true },
      { id: 2, dimensao: 'Espessura', unidade: null, valor: null, visivel: true },
    ],
    materiais: [
      { id: 0, metal: 'Alumínio', massa_especifica: 2.8 /*2.71*/ },
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
      let arr_ajustes = funcoes_area.ajuste_valores(this.geometria.perfil, this.medidas)
      return funcoes_area.area_calculada(this.geometria.secao, arr_ajustes, this.geometria.espessura)
    },
    volume() {
      return parseFloat((this.area * this.comprimento * 100).toFixed(2))
    },
    peso_por_metro() {
      let massa = this.material.split(' ').slice(-1) / 1000
      return parseFloat((this.area * 100 * massa).toFixed(2))
    },
    peso_por_peca() {
      let massa = this.material.split(' ').slice(-1) / 1000
      return parseFloat((this.volume * massa).toFixed(2))
    },
    peso_total() {
      return parseFloat((this.peso_por_peca * this.quantidade).toFixed(2))
    },
    valor_total() {
      return parseFloat((this.valor_kg * this.peso_total).toFixed(2))
    },
  },
  methods: {
    preco_por() {
      if (this.preco[0].unidade === 'Quilo') {
        this.valor_kg = parseFloat(this.preco[0].valor)
      }
      else if (this.preco[0].unidade === 'Metro') {
        this.valor_kg = parseFloat(this.preco[0].valor) / parseFloat(this.peso_por_metro)
      }
      else {
        this.valor_kg = parseFloat(this.preco[0].valor) / parseFloat(this.peso_por_peca)
      }
      this.preco[1].unidade = (this.preco[0].unidade === 'Quilo') ? 'Metro' : 'Quilo'
      this.preco[2].unidade = (this.preco[0].unidade === 'Peça') ? 'Metro' : 'Peça'
      this.preco[1].valor = (this.preco[0].unidade === 'Quilo')
        ? this.preco[0].valor * this.peso_por_metro
        : this.preco[0].valor / this.peso_por_metro
      this.preco[2].valor = (this.preco[0].unidade === 'Peça')
        ? this.preco[0].valor * this.peso_por_metro
        : this.preco[0].valor * this.peso_por_peca
    },
  },
  filters: {
    virgula: value => {
      if (value) return value.toLocaleString('pt-br', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      else return '0,00'
    },
  },
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
  .v-input, .v-select {
    font-size: 0.9rem;
  }
</style>
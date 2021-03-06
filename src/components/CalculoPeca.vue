<template>
  <v-container px-0 fluid>
    <v-card class="mx-2 my-2" tile elevation=5>
      <v-row class="px-4 pt-5 d-flex justify-space-between align-center">
        <v-col>
          <v-select :items="materiais" label="Material" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col>
          <v-select v-model="perfil" :items="perfis" @change="perfil_tubo()" label="Perfil" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col>
          <v-select v-model="secao" :items="secoes" @change="secao_transversal()" label="Seção Transversal" outlined color="blue darken-4">
          </v-select>
        </v-col>
      </v-row>
      <v-row class="px-4 d-flex justify-space-between align-center" >
        <v-col v-for="medida in medidas" :key="medida.id" >
          <Medida :medida="medida" />
        </v-col>
      </v-row>
      <v-row class="px-4 d-flex justify-space-between align-center">
        <v-col>
          <v-text-field v-model="comprimento" type="number" label="Comprimento (metros)" outlined color="blue darken-4"/>
        </v-col>
        <v-col>
          <v-text-field v-model="valor_kg" type="number" label="Preço por Quilo (R$ / kg)" outlined color="blue darken-4"/>
        </v-col>
        <v-col>
          <v-text-field v-model="quantidade" type="number" label="Quantidade de Peças" outlined color="blue darken-4"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
          <div class="px-4 pt-5 font-weight-black">
            FÓRMULA DO CÁLCULO DA SEÇÃO TRANSVERSAL = {{ formula }}
          </div>
          <div class="px-4 pt-5 font-weight-black">
            ÁREA SEÇÃO TRANSVERSAL = {{ area | virgula }} cm²
          </div>
          <div class="px-4 pt-5 font-weight-black">
            VOLUME = {{ volume | virgula }} cm³
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PESO ESPECÍFICO = {{ peso_especifico | virgula }} kg / m³
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PESO POR PEÇA = {{ peso_por_peca | virgula }} kg
          </div>
          <div class="px-4 pt-5 font-weight-black">
            PREÇO POR PEÇA = {{ preco_por_peca | moeda | virgula }}
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
import Medida from './Medida'
export default {
  name: 'CalculoPeca',
  components: { Medida },
  data: () => ({
    polegada: 2.54,
    pi: 3.14,
    perfis: ['Barra', 'Tubo'],
    perfil: '',
    secoes: ['Quadrado', 'Redondo', 'Retangular', 'Sextavado'],
    secao: '',
    formula: '',
    materiais: ['Alumínio', 'Cobre', 'Latão', 'Ferro'],
    medidas: [
      { id: 0, dimensao: 'Altura', unidade: null, valor: null, visivel: true },
      { id: 1, dimensao: 'Largura', unidade: null, valor: null, visivel: true },
      { id: 2, dimensao: 'Espessura', unidade: null, valor: null, visivel: true },
    ],
    espessura: false,
    comprimento: null,
    peso_especifico: null,
    valor_kg: null,
    quantidade: null,
  }),
  computed: {
    area() {
      let calculada = 0
      if (this.perfil === '') {
        return '0.00'
      }
      if (this.secao === 'Quadrado') {
        calculada = this.espessura ?
          (4 * this.medidas[2].valor * (this.medidas[0].valor - this.medidas[2].valor))
          : this.medidas[0].valor ** 2
      }
      else if (this.secao === 'Redondo') {
        calculada = this.espessura ?
          (this.pi * this.medidas[2].valor * (this.medidas[0].valor - this.medidas[2].valor))
          : (this.pi * this.medidas[0].valor ** 2) / 4
      }
      else if (this.secao === 'Retangular') {
        calculada = this.espessura ?
          (2 * this.medidas[2].valor * (parseInt(this.medidas[0].valor) + parseInt(this.medidas[1].valor) - 2 * this.medidas[2].valor))
          : this.medidas[0].valor * this.medidas[1].valor
      }
      else if (this.secao === 'Sextavado') {
        calculada = this.espessura ?
          (2 * 3 ** 0.5 * this.medidas[2].valor * (this.medidas[0].valor - this.medidas[2].valor))
          : (3 ** 0.5) * (this.medidas[0].valor ** 2) / 2
      }
      return (calculada).toFixed(2)
    },
    volume() {
      return (this.area * this.comprimento * 100).toFixed(2)
    },
    peso_por_peca() {
      return (this.volume * this.peso_especifico).toFixed(2)
    },
    preco_por_peca() {
      return (this.peso_por_peca * this.valor_kg).toFixed(2)
    },
    peso_total() {
      return (this.peso_por_peca * this.quantidade).toFixed(2)
    },
    valor_total() {
      return (this.valor_kg * this.peso_total).toFixed(2)
    },
  },
  methods: {
    perfil_tubo() {
      let vazio = this.perfil === 'Tubo'
      this.medidas[2].visivel = vazio
      this.medidas[2].valor = vazio ? this.medidas[2].valor : 0
      this.espessura = vazio
    },
    secao_transversal() {
      if (this.secao === 'Quadrado') {
        this.medidas[0].dimensao = 'Lado'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.formula = 'Lado x Lado'
      }
      else if (this.secao === 'Redondo') {
        this.medidas[0].dimensao = 'Diâmetro'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.formula = '3,14 x Diâmetro x Diâmetro / 4'
      }
      else if (this.secao === 'Retangular') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].dimensao = 'Largura'
        this.medidas[1].visivel = true
        this.formula = 'Altura x Largura'
      }
      else if (this.secao === 'Sextavado') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.formula = 'Altura x Altura * Raiz_quadrada(3) / 2'
      }
    },
  },
  filters: {
    moeda: value => {
      return 'R$ ' + value.toLocaleString('pt-br')
    },
    virgula: value => {
      return typeof(value) === 'string' ? value : '0,00'
    },
  },
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
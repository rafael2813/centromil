<template>
  <v-container px-0 fluid>
    <v-card class="mx-2 my-2" tile elevation=5>
      <v-row class="px-4 pt-5 d-flex justify-space-between align-center">
        <v-col>
          <v-select v-model="material" :items="materiais.map(m => `${m.metal}: peso específico = ${m.massa_especifica}`)" label="Material" outlined color="blue darken-4">
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
    polegada: 25.4,
    pi: 3.14,
    perfis: ['Barra', 'Tubo'],
    perfil: '',
    secoes: ['Quadrado', 'Redondo', 'Retangular', 'Sextavado'],
    secao: '',
    formula: '',
    medidas: [
      { id: 0, dimensao: 'Altura', unidade: null, valor: null, visivel: true },
      { id: 1, dimensao: 'Largura', unidade: null, valor: null, visivel: true },
      { id: 2, dimensao: 'Espessura', unidade: null, valor: null, visivel: true },
    ],
    espessura: false,
    materiais: [
      { id: 0, metal: 'Alumínio', massa_especifica: 2.71 },
      { id: 1, metal: 'Cobre', massa_especifica: 8.9 },
      { id: 2, metal: 'Ferro', massa_especifica: 8 },
      { id: 3, metal: 'Latão', massa_especifica: 8.4 },
    ],
    material: '',
    comprimento: null,
    valor_kg: null,
    quantidade: null,
  }),
  computed: {
    area() {
      let arr_un = []
      let arr_valor = []
      let calculada = 0
      if (this.perfil === '') return '0.00'
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
      })
      if (this.secao === 'Quadrado') {
        calculada = this.espessura ?
          (4 * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] - arr_valor[2] * arr_un[2]))
          : (arr_valor[0] * arr_un[0]) ** 2
      }
      else if (this.secao === 'Redondo') {
        calculada = this.espessura ?
          (this.pi * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] - arr_valor[2] * arr_un[2]))
          : (this.pi * (arr_valor[0] * arr_un[0]) ** 2) / 4
      }
      else if (this.secao === 'Retangular') {
        calculada = this.espessura ?
          (2 * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] + arr_valor[1] * arr_un[1] - 2 * arr_valor[2] * arr_un[2]))
          : arr_valor[0] * arr_un[0] * arr_valor[1] * arr_un[1]
      }
      else if (this.secao === 'Sextavado') {
        calculada = this.espessura ?
          (2 * 3 ** 0.5 * arr_valor[2] * arr_un[2] * (arr_valor[0] * arr_un[0] - arr_valor[2] * arr_un[2]))
          : (3 ** 0.5) * ((arr_valor[0] * arr_un[0]) ** 2) / 2
      }
      calculada = Number.isNaN(calculada) ? 0 : calculada
      return (calculada).toFixed(2)
    },
    volume() {
      return (this.area * this.comprimento * 100).toFixed(2)
    },
    peso_por_peca() {
      let massa = this.material.split(' ').slice(-1) / 1000
      return (this.volume * massa).toFixed(2)
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
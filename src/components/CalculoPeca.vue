<template>
  <v-app>
    <v-card class="mx-2 my-2" tile elevation=10>
      <v-row class="px-4 pt-5 d-flex justify-space-between align-center">
        <v-col>
          <v-select :items="perfis" label="Perfil" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col>
          <v-select :items="secoes" label="Seção Transversal" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col>
          <v-select :items="materiais" label="Material" outlined color="blue darken-4">
          </v-select>
        </v-col>
      </v-row>
      <v-row class="px-4 d-flex justify-space-between align-center">
        <v-col>
          <Medida />
        </v-col>
        <v-col>
          <Medida />
        </v-col>
        <v-col>
          <Medida />
        </v-col>
      </v-row>
      <v-row class="px-4 d-flex justify-space-between align-center">
        <v-col>
          <v-text-field v-model="comprimento" type="number" label="Comprimento (metros)" outlined color="blue darken-4"/>
        </v-col>
        <v-col>
          <v-text-field v-model="valor" type="number" label="Valor por Metro Linear" outlined color="blue darken-4"/>
        </v-col>
        <v-col>
          <v-text-field v-model="quantidade" type="number" label="Quantidade de Peças" outlined color="blue darken-4"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
          <div class="px-4 pt-5 font-weight-black">
          FÓRMULA DO CÁLCULO DA SEÇÃO TRANSVERSAL = Altura x Largura
          </div>
          <div class="font-weight-black pb-5">
            ÁREA SEÇÃO TRANSVERSAL = {{ area }} cm²
          </div>
          <div class="font-weight-black pb-5">
            VOLUME = {{ volume }} cm³
          </div>
          <div class="font-weight-black pb-5">
            PESO ESPECÍFICO = {{ peso_especifico }} kg / m³
          </div>
          <div class="font-weight-black pb-5">
            PESO POR PEÇA = {{ peso_por_peca }} kg
          </div>
          <v-text-field class="font-weight-black" flat readonly solo value="VALOR TOTAL = R$ 125,00"/>
    </v-card>
  </v-app>
</template>

<script>
import Medida from './Medida'
export default {
  name: 'CalculoPeca',
  components: { Medida },
  data: () => ({
    perfis: ['Barra', 'Tubo'],
    secoes: ['Quadrado', 'Redondo', 'Retangular', 'Sextavado'],
    materiais: ['Alumínio', 'Cobre', 'Latão', 'Ferro'],
    altura: 0,
    largura: 0,
    espessura: 0,
    comprimento: null,
    peso_especifico: 1,
    valor: null,
    quantidade: null,
  }),
  computed: {
    area() {
      return this.altura * this.largura
    },
    volume() {
      return this.area * this.comprimento * 100
    },
    peso_por_peca() {
      return this.volume * this.peso_especifico
    },
  }
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
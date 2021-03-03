<template>
  <v-app>
    <v-toolbar dense color="blue darken-4" dark elevation=10>
      <v-tabs dense>
        <v-tab>Cálculo de Peça</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-card class="mx-2 my-2" tile elevation=10>
      <v-row class="px-4 pt-5 d-flex justify-space-between">
        <v-col class="align-center">
          <v-select :items="perfis" label="Perfil" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col class="align-center">
          <v-select :items="secoes" label="Seção Transversal" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col class="align-center">
          <v-select :items="unidades" label="Unidade de Medida" outlined color="blue darken-4">
          </v-select>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="px-4 pt-5 d-flex justify-space-between">
        <v-col class="align-center">
          <v-text-field v-model="numberValue" type="number" label="Altura" outlined color="blue darken-4"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field v-model="numberValue" type="number" label="Largura" outlined color="blue darken-4"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field v-model="numberValue" type="number" label="Espessura" outlined color="blue darken-4"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="px-4 pt-5 d-flex justify-space-between">
        <v-col>
          <v-text-field class="font-weight-black" flat readonly solo value="FÓRMULA DO CÁLCULO DA SEÇÃO TRANSVERSAL = Altura x Largura"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="px-4 pt-5 d-flex justify-space-between">
        <v-col class="align-center">
          <v-text-field class="font-weight-black" flat readonly solo value="ÁREA SEÇÃO TRANSVERSAL = 1125 cm²"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field v-model="numberValue" type="number" label="Comprimento (metros)" outlined color="blue darken-4"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field class="font-weight-black" flat readonly solo value="VOLUME = 125 cm³"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="px-4 pt-5 d-flex justify-space-between">
        <v-col class="align-center">
          <v-select :items="materiais" label="Material" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col class="align-center">
          <v-text-field class="font-weight-black" flat readonly solo value="PESO ESPECÍFICO = 125 kg / m³"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field class="font-weight-black" flat readonly solo value="PESO TOTAL = 125 kg"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="px-4 pt-5 d-flex justify-space-between">
        <v-col class="align-center">
          <v-text-field v-model="numberValue" type="number" label="Valor por Metro Linear" outlined color="blue darken-4"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field v-model="numberValue" type="number" label="Número de Peças" outlined color="blue darken-4"/>
        </v-col>
        <v-col class="align-center">
          <v-text-field class="font-weight-black" flat readonly solo value="VALOR TOTAL = R$ 125,00"/>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    perfis: ['Barra', 'Tubo'],
    secoes: ['Quadrado', 'Redondo', 'Retangular', 'Sextavado'],
    unidades: ['centímetros', 'milímetro', 'polegada'],
    materiais: ['Alumínio', 'Cobre', 'Latão', 'Ferro'],
  }),
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
<template>
  <v-app>
    <v-toolbar dense color="blue darken-4" dark elevation=5>
      <v-tabs grow dense v-model="ativa">
        <v-tab>
          <v-icon class="pr-3">mdi-calculator</v-icon>
          Cálculo de Peça
        </v-tab>
        <v-tab>
          <v-icon class="pr-3">mdi-cart-variant</v-icon>
          Lista de Produtos
        </v-tab>
        <v-tab-item>
          <CalculoPeca />
        </v-tab-item>
        <v-tab-item>
          <TabelaPecas />
        </v-tab-item>
      </v-tabs>
    </v-toolbar>
  </v-app>
</template>

<script>
import CalculoPeca from '@/components/calculo_peca/CalculoPeca'
import TabelaPecas from '@/components/lista_produtos/TabelaPecas'
export default {
  name: 'App',
  components: {
    CalculoPeca, TabelaPecas
  },
  data: () => ({
    ativa: 1
  }),
  created() {
    this.ativa = 1
  },
  mounted() {
    this.ativa = 0
  }
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
<template>
  <v-app>
    <v-toolbar dense color="blue darken-4" dark elevation=5>
      <v-tabs dense>
        <v-tab>Cálculo de Peça</v-tab>
        <v-tab>Orçamento</v-tab>
        <v-tab-item>
          <CalculoPeca />
        </v-tab-item>
        <v-tab-item>
          <TabelaOrcamento />
        </v-tab-item>
      </v-tabs>
    </v-toolbar>
  </v-app>
</template>

<script>
import CalculoPeca from '@/components/calculo_peca/CalculoPeca'
import TabelaOrcamento from '@/components/orcamento/TabelaOrcamento'
export default {
  name: 'App',

  components: {
    CalculoPeca, TabelaOrcamento
  },

  data: () => ({
    
  }),
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
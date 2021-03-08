<template>
  <v-app>
    <v-toolbar dense color="blue darken-4" dark elevation=5>
      <v-tabs dense>
        <v-tab>Cálculo de Peça</v-tab>
        <v-tab>Catálogo de Materiais</v-tab>
        <v-tab-item>
          <CalculoPeca />
        </v-tab-item>
        <v-tab-item>
          <TabelaCatalogo />
        </v-tab-item>
      </v-tabs>
    </v-toolbar>
  </v-app>
</template>

<script>
import CalculoPeca from '@/components/calculo_peca/CalculoPeca'
import TabelaCatalogo from '@/components/tabela_catalogo/TabelaCatalogo'
export default {
  name: 'App',

  components: {
    CalculoPeca, TabelaCatalogo
  },

  data: () => ({
    
  }),
};
</script>

<style>
  
</style>
<template>
  <v-app>
    <v-toolbar dense color="blue darken-4" dark elevation=10>
      <v-tabs dense>
        <v-tab>Cálculo de Peça</v-tab>
      </v-tabs>
    </v-toolbar>
    <CalculoPeca />
  </v-app>
</template>

<script>
import CalculoPeca from './components/CalculoPeca'
export default {
  name: 'App',

  components: {
    CalculoPeca
  },

  data: () => ({
    
  }),
};
</script>

<style>
  
</style>
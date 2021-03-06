<template>
  <v-row  v-show="medida.visivel">
    <v-col cols="7">
      <v-text-field v-model="medida.valor" type="number" :label="medida.dimensao" outlined color="blue darken-4"/>
    </v-col>
    <v-col cols="5">
      <v-select :items="unidades" label="Unidade" outlined color="blue darken-4">
      </v-select>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Medida',
  components: { },
  data: () => ({
    unidades: ['cm', 'mm', 'pol'],
  }),
  props: ['medida'],
};
</script>

<style>
  
</style>
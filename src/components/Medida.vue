<template>
  <v-text-field v-model="altura" type="number" label="Altura" outlined color="blue darken-4"/>
</template>

<script>

export default {
  name: 'Medida',
  components: { },
  data: () => ({
    unidades: ['cm', 'mm', 'pol'],
  }),
};
</script>

<style>
  
</style>
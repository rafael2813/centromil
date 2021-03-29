<template>
<v-container px-0 fluid>
  <v-card class="mx-1" tile elevation=10>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1">
      <template v-for="(h, index) in headers" v-slot:[`item.${h.value}`]="{ item }">
        <div :key="index" class="align-center">
          {{ virgula(item[h.value], h) }}
        </div>
      </template>
      <template slot="footer">
        <v-row class="px-4 d-flex justify-space-between align-center" >
          <v-col class="title">TOTAL</v-col>
          <v-col class="title red--text">{{ valorTotal() }}</v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
  import funcoes_formato from '@/functions/funcoes_formato'
  export default {
    data: () => ({
      items: [],
      headers: [
        { text: 'Item', value: 'id', formato: '' },
        { text: 'Perfil', value: 'perfil', formato: '' },
        { text: 'Seção', value: 'secao', formato: '' },
        { text: 'Material', value: 'material', formato: '' },
        { text: 'Dimensões', value: 'dimensoes', formato: '' },
        { text: 'Nº_Peças', value: 'pecas', align: 'end', formato: '' },
        { text: 'Área_mm²', value: 'area', align: 'end', formato: 'virgula' },
        { text: 'Preço_por_quilo', value: 'preco_kg', align: 'end', formato: 'moeda' },
        { text: 'Peso_por_metro', value: 'peso_m', align: 'end', formato: 'virgula' },
        { text: 'Preço_por_metro', value: 'preco_m', align: 'end', formato: 'moeda' },
        { text: 'Peso_por_peça', value: 'peso_peca', align: 'end', formato: 'virgula' },
        { text: 'Preço_por_peça', value: 'preco_peca', align: 'end', formato: 'moeda' },
        { text: 'Peso_Total', value: 'peso_total', align: 'end', formato: 'virgula' },
        { text: 'Valor_Totalizado', value: 'valor_total', align: 'end', formato: 'moeda' },
      ],
    }),
    methods: {
      valorTotal() {
        const valor = this.items.reduce((acc, i) => acc + (i['valor_total'] || 0), 0)
        return funcoes_formato.moeda(valor)
      },
      virgula: (value, header) => {
        const formato = header.formato
        if (formato === 'virgula') return funcoes_formato.virgula(value)
        else if (formato === 'moeda') return funcoes_formato.moeda(value)
        else return value
      },
    },
    mounted() {
      const produtos = JSON.parse(localStorage.getItem('produtos'))
      if (produtos) this.items.push(produtos)
      console.log(this.items)
    }
  }
</script>

<style>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 1.0rem !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
   font-size: 0.9rem !important;
}
</style>
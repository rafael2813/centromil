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
      items: [
        {
          id: 1,
          perfil: 'Chapa',
          secao: 'Chapa',
          material: 'Alumínio',
          dimensoes: '1250mm X 2mm X 3m',
          pecas: 1,
          area: 2500.000,
          preco_kg: 56.000,
          peso_m: 7.000,
          preco_m: 392.000,
          peso_peca: 21.000,
          preco_peca: 1176.000,
          peso_total: 21.000,
          valor_total: 1176.000,
        },
        {
          id: 2,
          perfil: 'Vergalhão',
          secao: 'Sextavado',
          material: 'Latão',
          dimensoes: '7/32" X 3m',
          pecas: 1,
          area: 26.736,
          preco_kg: 84.000,
          peso_m: 0.238,
          preco_m: 19.992,
          peso_peca: 0.714,
          preco_peca: 59.976,
          peso_total: 0.714,
          valor_total: 59.976,
        },
        {
          id: 3,
          perfil: 'Tubo',
          secao: 'Redondo',
          material: 'Alumínio',
          dimensoes: '50,8mm x 3,17mm x 6m',
          pecas: 2,
          area: 474.099,
          preco_kg: 52.800,
          peso_m: 1.328,
          preco_m: 70.119,
          peso_peca: 7.965,
          preco_peca: 420.552,
          peso_total: 15.930,
          valor_total: 841.104,
        },
        {
          id: 4,
          perfil: 'Vergalhão',
          secao: 'Quadrado',
          material: 'Alumínio',
          dimensoes: '25.4mm X 25.44mm X 3m',
          pecas: 1,
          area: 645.160,
          preco_kg: 1.000,
          peso_m: 1.807,
          preco_m: 1.807,
          peso_peca: 5.420,
          preco_peca: 5.420,
          peso_total: 5.420,
          valor_total: 5.420,
        },
      ],
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
      }
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
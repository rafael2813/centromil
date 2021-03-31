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
          <span v-if="h.icon">
            <v-icon large color="red" @click="excluir(item)">
              mdi-delete
            </v-icon>
          </span>
        </div>
      </template>
      <template slot="footer">
        <v-row class="px-6">
          <v-col class="title">TOTAL</v-col>
          <v-col cols="3" class="title red--text justify-content-end"
            align="right">
             {{ valorTotal() }}
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
  import eventbus from '@/eventbus'
  import funcoes_formato from '@/functions/funcoes_formato'
  import funcao_renumerar from '@/functions/funcao_renumerar'

  export default {
    data: () => ({
      items: [],
      headers: [
        { text: '', value: 'excluir', align: 'center', sortable: false, icon: 'delete' },
        { text: 'Item', value: 'id' },
        { text: 'Perfil', value: 'perfil' },
        { text: 'Seção', value: 'secao' },
        { text: 'Material', value: 'material' },
        { text: 'Dimensões', value: 'dimensoes' },
        { text: 'Nº_Peças', value: 'pecas', align: 'center' },
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
        if (this.items !== {}) {
          const valor = this.items.reduce((acc, i) => acc + (i['valor_total'] || 0), 0)
          return funcoes_formato.moeda(valor)
        }
        return 'R$ 0,000'
      },
      virgula: (value, header) => {
        const formato = header.formato
        if (formato === 'virgula') return funcoes_formato.virgula(value)
        else if (formato === 'moeda') return funcoes_formato.moeda(value)
        else return value
      },
      excluir(item) {
        this.items.splice(this.items.indexOf(item), 1)
        funcao_renumerar.renumerar(this.items)
        localStorage.setItem('produtos', JSON.stringify(this.items))
      },
    },
    created() {
      eventbus.$on('novoProduto', () => {
        this.items = JSON.parse(localStorage.getItem('produtos'))
      })
    },
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
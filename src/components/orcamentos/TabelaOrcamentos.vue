<template>
<v-container px-0 fluid>
  <v-card class="mx-1" tile elevation=10>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="10"
      :page.sync="page"
      @page-count="pageCount = $event"
      class="elevation-1">
      <template v-for="(h, index) in headers" v-slot:[`item.${h.value}`]="{ item }">
        <div :key="index" class="align-center">
          {{ item[h.value] }}
          <span v-if="h.icon">
            <v-icon v-if="h.icon === 'delete'"
              large :color=h.color @click="excluir(item)">
              mdi-{{ h.icon }}
            </v-icon>
            <v-icon v-else
              large :color=h.color @click="carregar(item)">
              mdi-{{ h.icon }}
            </v-icon>
          </span>
        </div>
      </template>
      <template slot="footer">
        <v-pagination class="mt-5"
          v-model="page"
          :length="pageCount">
        </v-pagination>
      </template>
    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
  import eventbus from '@/eventbus'

  export default {
    data: () => ({
      items: [],
      headers: [
        { text: '', value: 'excluir', align: 'center', sortable: false, icon: 'delete', color: 'red' },
        { text: 'Cliente_Fornecedor', value: 'client_fornec' },
        { text: 'Empresa', value: 'empresa' },
        { text: 'Nome', value: 'nome' },
        { text: 'Data_e_Hora', value: 'data_hora' },
        { text: 'Nº_Itens', value: 'n_itens', align: 'end' },
        { text: 'Peso_Totalizado', value: 'peso_total', align: 'end' },
        { text: 'Valor_Totalizado', value: 'valor_total', align: 'end' },
        { text: '', value: 'carregar', align: 'center', sortable: false, icon: 'cart-variant', color: 'green' },
      ],
      page: 1,
      pageCount: 0,
    }),
    methods: {
      excluir(item) {
        this.items.splice(this.items.indexOf(item), 1)
        localStorage.setItem('orcamentos', JSON.stringify(this.items))
        eventbus.$emit('removeOrcamento')
        eventbus.$emit('cancelarOrcamento')
      },
      carregar(item) {
        const id = this.items.indexOf(item)
        const it = JSON.stringify(item)
        localStorage.setItem('produtos', JSON.stringify(JSON.parse(it)['items']))
        localStorage.setItem('id', id)
        localStorage.setItem('empresa', JSON.stringify(JSON.parse(it)['empresa']))
        localStorage.setItem('nome', JSON.stringify(JSON.parse(it)['nome']))
        localStorage.setItem('descricao', JSON.stringify(JSON.parse(it)['descricao']))
        localStorage.setItem('client_fornec', JSON.stringify(JSON.parse(it)['client_fornec']))
        eventbus.$emit('carregarOrcamento')
      },
    },
    created() {
      eventbus.$on('novoOrcamento', () => {
        this.items = JSON.parse(localStorage.getItem('orcamentos'))
      })
      eventbus.$on('editarOrcamento', () => {
        this.items = JSON.parse(localStorage.getItem('orcamentos'))
      })
    },
  }
</script>

<style>
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
      font-size: 0.85rem !important;
  }
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    font-size: 0.85rem !important;
  }
</style>
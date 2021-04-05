<template>
<v-container px-0 fluid>
  <v-card class="mx-1" tile elevation=10>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="4"
      :page.sync="page"
      @page-count="pageCount = $event"
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
        <v-pagination
          v-model="page"
          :length="pageCount">
        </v-pagination>
        <v-row class="px-6">
          <v-col class="title">TOTAIS</v-col>
          <v-col class="title red--text justify-content-end"
            align="right">
              <span class="pr-5">{{ pesoTotal() }}</span>
              <span class="pl-5">{{ valorTotal() }}</span>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <v-divider></v-divider>
  </v-card>
  <v-card class="mx-1 mt-8 mb-4" tile elevation=10>
    <v-row class="px-4 align-center">
      <v-col cols="4">
        <v-text-field
          v-model="empresa" label="Empresa"
          dense outlined color="blue darken-4"/>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="nome" label="Nome"
          dense outlined color="blue darken-4"/>
      </v-col>
      <v-col cols="4">
        <v-radio-group v-model="client_fornec" row>
          <v-radio label="Cliente" value="Cliente"
            color="blue darken-4" class="px-8"></v-radio>
          <v-radio label="Fornecedor" value="Fornecedor" color="blue darken-4"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row class="px-4 mt-n8 mb-n12">
      <v-col cols="12">
        <v-textarea v-model="descricao" outlined rows="3"
          label="Descrição"></v-textarea>
      </v-col>
    </v-row>
    <v-row class="justify-space-between pl-4 pr-7">
      <v-col cols="4">
        <v-btn v-show="editar" block class="red white--text"
          @click="cancelarOrcamento">
          Cancelar Alteração
          <div>
            <v-icon class="pl-3 pr-2">mdi-close-thick</v-icon>
            <v-icon>mdi-currency-brl</v-icon>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn block class="green white--text"
          @click="salvarOrcamento">
          Salvar como Orçamento
          <div>
            <v-icon class="pl-3 pr-2">mdi-plus-thick</v-icon>
            <v-icon>mdi-currency-brl</v-icon>
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-snackbar v-model="snackbar" :timeout="2500"
    absolute bottom :color="cor_snackbar">
    {{ texto_snackbar }}
  </v-snackbar>
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
        { text: 'Dimensões_e_Comprimento', value: 'dimensoes' },
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
      nome: '',
      empresa: '',
      descricao: '',
      client_fornec: null,
      orcamentos: [],
      page: 1,
      pageCount: 0,
      snackbar: false,
      texto_snackbar: 'Orçamento não pode ser salvo!',
      cor_snackbar: 'red',
      editar: false,
    }),
    methods: {
      valorTotal() {
        if (this.items !== {}) {
          const valor = this.items.reduce((acc, i) => acc + (i['valor_total'] || 0), 0)
          return funcoes_formato.moeda(valor)
        }
        return 'R$ 0,000'
      },
      pesoTotal() {
        if (this.items !== {}) {
          const valor = this.items.reduce((acc, i) => acc + (i['peso_total'] || 0), 0)
          return funcoes_formato.virgula(valor) + ' kg'
        }
        return '0,000 kg'
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
        eventbus.$emit('removeProduto')
      },
      salvarOrcamento() {
        if (this.items.length && this.empresa && this.nome && this.client_fornec) {
          this.orcamentos.push({
            client_fornec: this.client_fornec,
            empresa: this.empresa,
            nome: this.nome,
            descricao: this.descricao,
            data_hora: new Date().toLocaleString(),
            n_itens: this.items.length,
            items: this.items,
            peso_total: this.pesoTotal(),
            valor_total: this.valorTotal()
          })
          localStorage.setItem('orcamentos', JSON.stringify(this.orcamentos))
          localStorage.setItem('produtos', JSON.stringify([]))
          this.empresa = ''
          this.nome = ''
          this.client_fornec = null
          this.descricao = ''
          this.texto_snackbar = 'Orçamento salvo!'
          this.cor_snackbar = 'blue'
          eventbus.$emit('novoProduto')
          eventbus.$emit('novoOrcamento')
        }
        else {
          this.texto_snackbar = 'Orçamento não pode ser salvo!'
          this.cor_snackbar = 'red'
        }
        this.snackbar = true
      },
      cancelarOrcamento() {
        
      }
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
      font-size: 0.85rem !important;
  }
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    font-size: 0.85rem !important;
  }
</style>
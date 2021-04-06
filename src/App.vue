<template>
  <v-app>
    <v-toolbar dense color="blue darken-4" dark elevation=5>
      <v-tabs grow dense v-model="ativa">
        <v-tab>
          <v-icon class="pr-3">mdi-calculator</v-icon>
          Cálculo de Peça
        </v-tab>
        <v-tab>
          <v-badge class="center" :content="quant_produtos"
            :value="quant_produtos" color="red" overlap>
          </v-badge>
          <v-icon class="px-3">mdi-cart-variant</v-icon>
          Lista de Produtos
        </v-tab>
        <v-tab>
          <v-badge class="center" :content="quant_orcamentos"
            :value="quant_orcamentos" color="red" overlap>
          </v-badge>
          <v-icon class="px-3">mdi-currency-brl</v-icon>
          Orçamentos
        </v-tab>
        <v-tab-item :style="{visibility: visivel}">
          <CalculoPeca />
        </v-tab-item>
        <v-tab-item :style="{visibility: visivel}">
          <TabelaProdutos />
        </v-tab-item>
        <v-tab-item :style="{visibility: visivel}">
          <TabelaOrcamentos />
        </v-tab-item>
      </v-tabs>
    </v-toolbar>
  </v-app>
</template>

<script>
import eventbus from '@/eventbus'
import CalculoPeca from '@/components/calculo_peca/CalculoPeca'
import TabelaProdutos from '@/components/lista_produtos/TabelaProdutos'
import TabelaOrcamentos from '@/components/orcamentos/TabelaOrcamentos'
export default {
  name: 'App',
  components: {
    CalculoPeca, TabelaProdutos, TabelaOrcamentos
  },
  data: () => ({
    ativa: 0,
    visivel: 'hidden',
    qtde_abas: 2,
    quant_produtos: 0,
    quant_orcamentos: 0,
  }),
  created() {
    eventbus.$on('novoProduto', () => {
      this.quant_produtos++
    })
    eventbus.$on('removeProduto', () => {
      this.quant_produtos--
    })
    eventbus.$on('novoOrcamento', () => {
      this.quant_produtos = 0
      this.quant_orcamentos++
    })
    eventbus.$on('removeOrcamento', () => {
      this.quant_orcamentos--
    })
    eventbus.$on('carregarOrcamento', () => {
      this.quant_produtos = JSON.parse(localStorage.getItem('produtos')).length
    })
    eventbus.$on('editarOrcamento', () => {
      this.quant_produtos = 0
      this.quant_orcamentos = JSON.parse(localStorage.getItem('orcamentos')).length
    })
    eventbus.$on('cancelarOrcamento', () => {
      this.quant_produtos = 0
    })
    for (let i = this.qtde_abas; i >= 0; i--) {
      setTimeout(() => {
        this.ativa = i
      }, 0)
    }
    localStorage.clear()
  },
  mounted() {
    setTimeout(() => {
      this.visivel = 'visible'
    }, 1000)
  }
};
</script>

<style>
  .v-toolbar {
    max-height: 50px;
  }
</style>
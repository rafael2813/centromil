<template>
  <transition name="slide-fade">
    <v-row class="my-n5">
      <v-col cols="6" class="px-1 mx-0">
        <v-select v-model="geometria.perfil" :items="perfis"
          @change="tipo_perfil(), secao_transversal()" label="Perfil"
          outlined color="blue darken-4">
        </v-select>
      </v-col>
      <v-col cols="6" class="px-1 mx-0">
        <v-select v-model="geometria.secao" :items="secoes"
          @change="secao_transversal()" label="Seção Transversal"
          outlined color="blue darken-4">
        </v-select>
      </v-col>
    </v-row>
  </transition>
</template>

<script>

export default {
  name: 'Medida',
  components: { },
  data: () => ({
    perfis: ['Chapa', 'Perfil', 'Tubo', 'Vergalhão'],
    secoes: [''],
  }),
  props: ['geometria', 'medidas'],
  methods: {
    tipo_perfil() {
      let macico = this.geometria.perfil === 'Vergalhão'
      this.medidas[2].visivel = !macico
      this.medidas[2].valor = !macico ? this.medidas[2].valor : 0
      this.geometria.espessura = !macico
      if (this.geometria.perfil === 'Vergalhão') {
        this.secoes = ['Quadrado', 'Redondo', 'Retangular', 'Sextavado']
      }
      else if (this.geometria.perfil === 'Tubo') {
        this.secoes = ['Quadrado', 'Redondo', 'Retangular']
      }
      else if (this.geometria.perfil === 'Perfil') {
        this.secoes = ['L', 'T', 'U']
      }
      else if (this.geometria.perfil === 'Chapa') {
        this.secoes = ['Chapa']
      }
    },
    secao_transversal() {
      if (this.geometria.secao === 'Quadrado') {
        this.medidas[0].dimensao = 'Lado'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = this.geometria.espessura
          ? '4 x Espessura x (Lado - Espessura)'
          : 'Lado x Lado'
      }
      else if (this.geometria.secao === 'Redondo') {
        this.medidas[0].dimensao = 'Diâmetro'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = this.geometria.espessura
        ? '3,14 x Espessura x (Diâmetro - Espessura)'
        : '3,14 x Diâmetro x Diâmetro / 4'
      }
      else if (this.geometria.secao === 'Retangular') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].dimensao = 'Largura'
        this.medidas[1].visivel = true
        this.geometria.formula = this.geometria.espessura
        ? '(Altura - 2 x Espessura) x (Largura - 2 x Espessura)'
        : 'Altura x Largura'
      }
      else if (this.geometria.secao === 'Sextavado') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = this.geometria.espessura
        ? 'Espessura x (Altura - Espessura) x raiz_quadrada(3) / 2'
        : 'Altura x Altura x raiz_quadrada(3) / 2'
      }
      else if (this.geometria.perfil === 'Perfil') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].dimensao = 'Largura'
        this.medidas[1].visivel = true
        this.geometria.formula = this.geometria.secao === 'U'
          ? 'Espessura x (2 x Altura + Largura - 2 x Espessura )'
          : 'Espessura x (Altura + Largura - Espessura )'
      }
      else if (this.geometria.perfil === 'Chapa' &&
          this.geometria.secao === 'Chapa') {
        this.medidas[0].dimensao = 'Largura'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = 'Largura x Espessura'
      }
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 1.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
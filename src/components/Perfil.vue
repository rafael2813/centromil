<template>
  <transition name="slide-fade">
    <v-row>
      <v-col cols="6">
        <v-select v-model="geometria.perfil" :items="perfis" @change="tipo_perfil()" label="Perfil" outlined color="blue darken-4">
          </v-select>
        </v-col>
        <v-col cols="6">
        <v-select v-model="geometria.secao" :items="secoes" @change="secao_transversal()" label="Seção Transversal" outlined color="blue darken-4">
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
    perfis: ['Perfil', 'Tubo', 'Vergalhão'],
    secoes: [''],
  }),
  props: ['geometria', 'medidas'],
  methods: {
    tipo_perfil() {
      let macico = this.geometria.perfil === 'Vergalhão'
      this.medidas[2].visivel = !macico
      this.medidas[2].valor = !macico ? this.medidas[2].valor : 0
      this.geometria.espessura = !macico
      if (this.geometria.perfil !== 'Perfil') this.secoes = ['Quadrado', 'Redondo', 'Retangular', 'Sextavado']
      else this.secoes = ['L', 'T', 'U']
    },
    secao_transversal() {
      if (this.geometria.secao === 'Quadrado') {
        this.medidas[0].dimensao = 'Lado'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = 'Lado x Lado'
      }
      else if (this.geometria.secao === 'Redondo') {
        this.medidas[0].dimensao = 'Diâmetro'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = '3,14 x Diâmetro x Diâmetro / 4'
      }
      else if (this.geometria.secao === 'Retangular') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].dimensao = 'Largura'
        this.medidas[1].visivel = true
        this.geometria.formula = 'Altura x Largura'
      }
      else if (this.geometria.secao === 'Sextavado') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].visivel = false
        this.medidas[1].valor = 0
        this.geometria.formula = 'Altura x Altura x raiz_quadrada(3) / 2'
      }
      else if (this.geometria.perfil === 'Perfil') {
        this.medidas[0].dimensao = 'Altura'
        this.medidas[1].dimensao = 'Largura'
        this.medidas[1].visivel = true
        if (this.geometria.secao === 'U') this.geometria.formula = 'Espessura x (2 x Altura + Largura - 2 x Espessura )'
        else this.geometria.formula = 'Espessura x (Altura + Largura - Espessura )'
      }
    },
  },
};
</script>

<style>
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
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store ({
    state: {
        pi: 3.14,
        perfis: ['Perfil', 'Tubo', 'Vergalhão'],
        perfil: '',
        secoes: [''],
        secao: '',
        espessura: false,
        formula: '',
        medidas: [
            { id: 0, dimensao: 'Altura', unidade: null, valor: null, visivel: true },
            { id: 1, dimensao: 'Largura', unidade: null, valor: null, visivel: true },
            { id: 2, dimensao: 'Espessura', unidade: null, valor: null, visivel: true },
        ],
        materiais: [
            { id: 0, metal: 'Alumínio', massa_especifica: 2.71 },
            { id: 1, metal: 'Cobre', massa_especifica: 8.9 },
            { id: 2, metal: 'Ferro', massa_especifica: 8 },
            { id: 3, metal: 'Latão', massa_especifica: 8.4 },
        ],
        material: '',
        precos: ['Quilo', 'Metro', 'Peça'],
        preco: [
            { 'valor': '', 'unidade': '' },
            { 'valor': '', 'unidade': '' },
            { 'valor': '', 'unidade': '' },
        ],
        comprimento: null,
        valor_kg: null,
        quantidade: null,
    },
    getters: {
        /*valorTotal(state) {
            return state.produtos.map(p => p.quantidade * p.preco)
            .reduce((total, atual) => total + atual, 0)
        }*/
    },
    mutations: {
        /*adicionarProduto(state, payload) {
            state.produtos.push(payload)
        },*/
    },
    actions: {
        /*adicionarProduto({ commit }, payload) {
            setTimeout(() => {
                commit('adicionarProduto', payload)
            }, 1000)
        }*/
    }
})
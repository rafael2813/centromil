function virgula(value) {
    if (value) return value.toLocaleString('pt-br', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    })
    else return '0,000'
}

function moeda(value) {
    if (value) return `R$ ${virgula(value)}`
    else return 'R$ 0,000'
}

export default { virgula, moeda }
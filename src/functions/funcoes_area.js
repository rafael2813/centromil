function ajuste_valores(perfil, arr_medidas) {
    let arr_ajustes = []
    if (perfil === '') return [0, 0, 0]
    arr_medidas.map(m => {
        if (m.unidade === 'cm') {
            arr_ajustes.push(parseFloat(m.valor))
        }
        else if (m.unidade === 'mm') {
            arr_ajustes.push(0.1 * parseFloat(m.valor))
        }
        else if (m.unidade === 'pol') {
            if (m.valor) {
                arr_ajustes.push(0.1 * (parseFloat(m.valor.endsWith('mm')
                    ? m.valor.split(' ')[1] : m.valor)))
            }
        }
        else {
            arr_ajustes.push(0)
        }
    })
    return arr_ajustes
}

function area_calculada(secao, arr_valores, espessura) {
    const pi = 3.14
    let calculada = 0
    if (secao === 'Quadrado') {
      calculada = espessura
        ? (4 * arr_valores[2] * (arr_valores[0] - arr_valores[2]))
        : (arr_valores[0]) ** 2
    }
    else if (secao === 'Redondo') {
      calculada = espessura
        ? (pi * arr_valores[2] * (arr_valores[0] - arr_valores[2]))
        : (pi * (arr_valores[0]) ** 2) / 4
    }
    else if (secao === 'Retangular') {
      calculada = espessura
        ? (2 * arr_valores[2] * (arr_valores[0] + arr_valores[1] - 2 * arr_valores[2]))
        : arr_valores[0] * arr_valores[1]
    }
    else if (secao === 'Sextavado') {
      calculada = espessura
        ? (2 * 3 ** 0.5 * arr_valores[2] * (arr_valores[0] - arr_valores[2]))
        : (3 ** 0.5) * ((arr_valores[0]) ** 2) / 2
    }
    else if (secao === 'U') {
      calculada = arr_valores[2] * (2 * arr_valores[0] + arr_valores[1] - 2 * arr_valores[2])
    }
    else if (['L', 'T'].includes(secao)) {
      calculada = arr_valores[2] * (arr_valores[0] + arr_valores[1] - arr_valores[2])
    }
    else if (secao === 'Chapa') {
      calculada = arr_valores[0] * arr_valores[2]
    }
    calculada = Number.isNaN(calculada) ? 0 : calculada
    return parseFloat(calculada.toFixed(2))
}

export default { ajuste_valores, area_calculada }
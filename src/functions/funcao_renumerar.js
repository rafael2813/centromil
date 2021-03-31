function renumerar(array_items) {
    for (let i = 0; i < array_items.length; i++) {
        array_items[i].id = i + 1
    }
}

export default { renumerar }
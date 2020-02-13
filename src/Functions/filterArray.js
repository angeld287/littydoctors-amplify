export const filterByValue = (array, string) => {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string)));
}
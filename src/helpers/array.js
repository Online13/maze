export function createArray2D(row, col) {
    let arr = new Array(row);
    for (let i = 0; i < row; i++)
        arr[i] = new Array(col);
    return arr;
}
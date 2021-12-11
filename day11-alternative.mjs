import fs from 'node:fs/promises'

const offsets = [
    [0,0],[-1, -1], [-1, 0], [-1, 1], [0, -1],
    [0, 1], [1, -1], [1, 0], [1, 1]
]

const input = await fs.readFile('./inputs/day11.txt', 'utf-8')
let grid = input.split('\n').map(line => `${line}X`.split('').map(Number))

grid[10] = new Array(11).fill(NaN)


let flashCount = 0
for (let iteration = 0; ; iteration++) {
    grid = grid.map(row => row.map(val => val < 11 || isNaN(val) ? val + 1 : 1))
    grid[-1] = grid[10]

    let flashPos
    while ((flashPos = grid.flat().findIndex(val => val == 10)) > -1) {
        flashCount++
        const x = flashPos % 11
        const y = (flashPos / 11) | 0
        grid[y][x] = 11
        offsets.forEach(
            ([yo, xo]) => grid[y + yo][x + xo] += grid[y + yo][x + xo] < 10 ? 1 : 0
        )
    }
    if (iteration == 99) {
        console.log(flashCount)
    }
    if (!(grid.flat().find(value => value < 11))) {
        console.log(iteration + 1)
        break
    }
}

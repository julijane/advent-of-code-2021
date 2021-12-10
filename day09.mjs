import fs from 'node:fs/promises'

const offsets = [[-1, 0], [0, -1], [0, 1], [1, 0]]

function cellNeighborvalue(x, y, [xo, yo] = [0, 0]) {
    let cx = x + xo
    let cy = y + yo

    if (grid[cy][cx] == 9) return 0
    grid[cy][cx] = 9

    return offsets.reduce(
        (acc, offset) => acc + cellNeighborvalue(cx, cy, offset),
        0
    ) + 1
}

/* -- */

const input = await fs.readFile('./inputs/day09.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

const width = lines[0].length
const height = lines.length

const grid = [
    new Array(width + 2).fill(9),
    ...lines.map(line => [9, ...line.split('').map(Number), 9]),
    new Array(width + 2).fill(9),
]

let sum = 0
let lows = []

for (let x = 1; x <= width; x++) {
    for (let y = 1; y <= height; y++) {
        let thisCell = grid[y][x]
        if (offsets.filter(
            ([yo, xo]) => grid[y + yo][x + xo] > thisCell
        ).length == 4) {
            sum += thisCell + 1
            lows.push([y, x])
        }
    }
}

let basinSizes = lows.map(
    pos => cellNeighborvalue(pos[1], pos[0])
).sort(
    (a, b) => b - a
)

console.log(sum)
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])

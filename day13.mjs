import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day13.txt', 'utf-8')
const [coordinates, instructions] = input.split('\n\n').map(
    section => section
        .split('\n')
        .filter(line => line.length)
        .map(
            line => line.split(/[ ,=]/)
        )
)


const [maxX, maxY] = [0, 1].map(i => Math.max(...coordinates.map(c => c[i])))
let grid = new Array(maxY + 1).fill(null).map(() => new Array(maxX + 1).fill(false))

coordinates.forEach(c => grid[c[1]][c[0]] = true)

instructions.forEach(([, , axis, value], index) => {

    if (axis == 'x') {
        grid = grid.map(
            row => row.slice(0, value).map(
                (col, colIndex) => col || row[2 * value - colIndex]
            )
        )
    } else {
        grid = grid.slice(0, value).map(
            (row, rowIndex) => row.map(
                (col, colIndex) => col || (grid[2 * value - rowIndex] || [])[colIndex]
            )
        )
    }

    if (index == 0) {
        console.log(
            grid.reduce(
                (acc, row) => acc + row.reduce(
                    (acc, col) => acc + (col ? 1 : 0),
                    0
                ), 0
            )
        )
    }
})

console.log(
    grid.map(
        row => row.map(col => col ? '#' : '.').join('')
    ).join('\n')
)

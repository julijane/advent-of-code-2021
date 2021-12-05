import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day05.txt', 'utf-8')
const lines = input.split('\n').filter(l => l.length).map(
    l => l.split(/,| -> /).map(n => parseInt(n))
)

const maxXY = Math.max(...lines.flat()) +1
let field = new Array(maxXY).fill(null).map(l => new Array(maxXY).fill(0))

for (let nodiagonal of [true, false]) {
    for (let line of lines) {

        const steps = line[2] != line[0] ? Math.abs(line[2] - line[0]) + 1 : Math.abs(line[3] - line[1]) + 1
        const deltaX = line[2] != line[0] ? line[2] > line[0] ? 1 : -1 : 0
        const deltaY = line[3] != line[1] ? line[3] > line[1] ? 1 : -1 : 0

        if (nodiagonal == (deltaX == 0 || deltaY == 0) )
            for (let step = 0; step < steps; step++) {
                field[line[1] + deltaY * step][line[0] + deltaX * step]++
            }
    }
    console.log(field.flat().filter(n => n > 1).length)
}

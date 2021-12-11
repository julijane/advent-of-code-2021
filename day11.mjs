import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day11.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

const width = lines[0].length
const height = lines.length

let flatGrid = lines.map(
    line => line.split('').map(Number)
).flat()

function energize(pos) {
    if (flatGrid[pos] != undefined && flatGrid[pos] < 10)
        flatGrid[pos]++
}

let flashPos
let flashCount = 0

for (let iteration = 0; ; iteration++) {
    flatGrid = flatGrid.map(value => value == 11 ? 1 : value + 1)
    while ((flashPos = flatGrid.findIndex(value => value == 10)) > -1) {
        flashCount++
        flatGrid[flashPos] = 11

        if (flashPos % width) {
            energize(flashPos - 1)
            energize(flashPos - 1 - width)
            energize(flashPos - 1 + width)
        }
        if ((flashPos + 1) % width) {
            energize(flashPos + 1)
            energize(flashPos + 1 - width)
            energize(flashPos + 1 + width)
        }
        energize(flashPos - width)
        energize(flashPos + width)
    }

    if (iteration == 99)
        console.log(flashCount)

    if (!(flatGrid.find(value => value != 11))) {
        console.log(iteration + 1)
        break
    }
}

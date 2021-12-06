import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day06.txt', 'utf-8')
const population = input.split(',').map(Number)

let fishByDay = population.reduce(
    (acc, val) => {
        acc[val]++
        return acc
    },
    new Array(9).fill(0)
)

for (let day = 0; day < 256; day++) {
    fishByDay[8] = fishByDay.shift()
    fishByDay[6] += fishByDay[8]

    if (day == 79 || day == 255)
        console.log(fishByDay.reduce(
            (acc, val) => acc + val,
            0
        ))
}

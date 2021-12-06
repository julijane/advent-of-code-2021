import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day06.txt', 'utf-8')
const lines = input.split('\n')

let population = lines[0].split(',').map(n => parseInt(n))

let fishByDay = population.reduce(
    (acc, val) => {
        acc[val]++
        return acc
    },
    new Array(9).fill(0)
)

for (let day = 0; day < 256; day++) {
    const zeroDayFish = fishByDay.shift()
    fishByDay[6] += zeroDayFish
    fishByDay[8] = zeroDayFish

    if (day == 79 || day == 255)
        console.log(fishByDay.reduce(
            (acc, val) => acc + val,
            0
        ))
}


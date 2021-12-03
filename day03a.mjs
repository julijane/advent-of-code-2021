import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day03.txt', 'utf-8')
const measurements = input.split('\n').filter(l=>l.length)

let sums = measurements.reduce(
    (acc, val) => {
        for (let bit = 0; bit < val.length; bit++) {
            acc[bit] ||= 0
            acc[bit] += (val.substr(bit, 1) == '1' ? 1 : -1)
        }
        return acc
    },
    []
)

let gamma = parseInt(sums.map(s => s < 0 ? '0' : '1').join(''), 2)
let epsilon = gamma ^ (2 ** 12 - 1)

console.log(gamma * epsilon)

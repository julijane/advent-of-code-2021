import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day03.txt', 'utf-8')
const inputs = input.split('\n').filter(l => l.length)
const numBits = inputs[0].length

function getSums(inputs) {
    return inputs.reduce(
        (acc, val) => {
            for (let bit = 0; bit < numBits; bit++) {
                acc[bit] += (val.substr(bit, 1) == '1' ? 1 : -1)
            }
            return acc
        },
        new Array(numBits).fill(0)
    )
}

function getSingle(inputs, a, b) {
    for (let x = 0; x < numBits; x++) {
        const sums = getSums(inputs)
        inputs = inputs.filter(
            i => i.substr(x, 1) == (sums[x] >= 0 ? a : b)
        )
        if (inputs.length == 1) {
            break
        }
    }
    return parseInt(inputs[0], 2)
}

console.log(
    getSingle(inputs, '1', '0') *
    getSingle(inputs, '0', '1')
)
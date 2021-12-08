import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day07.txt', 'utf-8')
const positions = input.split(',').map(Number)

const from = Math.min(...positions)
const to = Math.max(...positions)

let candidates = []
for (let pos = from; pos <= to; pos++) {
    candidates.push(
        positions.reduce(
            (acc, val) => {
                let diff = Math.abs(pos - val)
                return [
                    acc[0] + diff,
                    acc[1] + diff * (diff + 1) / 2,
                ]
            },
            [0, 0]
        ),
    )
}

console.log(Math.min(...candidates.map(c=>c[0])))
console.log(Math.min(...candidates.map(c=>c[1])))

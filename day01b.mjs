import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day01.txt', 'utf-8')
const values = input.split('\n').filter(l => l != '').map(l => parseInt(l))

let increases = 0

for (let idx = 3; idx < values.length; idx++) {
    if (values[idx - 3] < values[idx]) increases++
}

console.log(increases)

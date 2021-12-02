import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day01.txt', 'utf-8')
const values = input.split('\n').filter(l => l != '').map(l => parseInt(l))

let increases = 0

for (let idx = 1; idx < values.length; idx++) {
    if (values[idx - 1] < values[idx]) increases++
}

console.log(increases)

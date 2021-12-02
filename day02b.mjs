import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day02.txt', 'utf-8')
const commands = input.split('\n').filter(l => l != '')

let deltaX = 0
let deltaY = 0
let aim = 0

for (let command of commands) {
    const [op, valueStr] = command.split(' ')
    const value = parseInt(valueStr)

    if (op == 'forward') { deltaX += value; deltaY += aim * value }
    else if (op == 'down') aim += value
    else if (op == 'up') aim -= value
}

console.log(deltaX * deltaY)

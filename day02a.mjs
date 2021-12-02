import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day02.txt', 'utf-8')
const commands = input.split('\n').filter(l => l != '')

let deltaX = 0
let deltaY = 0

for (let command of commands) {
    const [op, valueStr] = command.split(' ')
    const value = parseInt(valueStr)

    if (op == 'forward') deltaX += value
    else if (op == 'down') deltaY += value
    else if (op == 'up') deltaY -= value
}

console.log(deltaX * deltaY)

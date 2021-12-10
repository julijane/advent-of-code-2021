import fs from 'node:fs/promises'

const opener = ['(', '[', '{', '<']
const closer = [')', ']', '}', '>']

const input = await fs.readFile('./inputs/day10.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length).map(str => str.split(''))

let completerScores = []
let offenders = closer.reduce((acc, char) => Object.assign(acc, { [char]: 0 }), {})

for (let line of lines) {
    let stack = []
    for (let char of line) {
        const opos = opener.indexOf(char)
        if (opos > -1)
            stack.unshift(opos)
        else if (stack.shift() != closer.indexOf(char)) {
            offenders[char]++
            stack = []
            break
        }
    }
    if (stack.length)
        completerScores.push(
            stack.reduce(
                (acc, val) => acc * 5 + val + 1,
                0
            )
        )
}

console.log(
    offenders[')'] * 3 + offenders[']'] * 57 + offenders['}'] * 1197 + offenders['>'] * 25137
)

console.log(
    completerScores.sort((a, b) => a - b)[Math.floor(completerScores.length / 2)]
)

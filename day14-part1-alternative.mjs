import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day14d.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

let template = lines.shift()
let rules = {}

lines.forEach(line => {
    const parts = line.split(/[^A-Z]+/)
    rules[parts[0]] = parts[0][0]+parts[1]
})

for (let iter=0; iter<10; iter++) {
    template = template.replace(
        /([A-Z])(?=[A-Z])/g,
        (firstChar, undefined, index) => {
            const pair = firstChar + template[index+1]
            return rules[pair] || firstChar
        }
    )
}

let counts = {}
template.split('').forEach(
    char => {
        counts[char] ||= 0
        counts[char]++
    }
)

const sortedCounts = Object.values(counts).sort((a,b)=>a-b)
console.log(counts)
console.log(sortedCounts)

console.log(sortedCounts[sortedCounts.length-1] - sortedCounts[0])
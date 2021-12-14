import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day14.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

const modifyObjKey = (obj, key, offset) => { obj[key] ||= 0; obj[key] += offset }

let polymer = lines.shift() + '_'
let pairs = {}

const rules = lines.map(line => {
    const parts = line.split(' -> ')
    return { pair: parts[0], newPairs: [parts[0][0] + parts[1], parts[1] + parts[0][1]] }
})

for (let x = 0; x < polymer.length - 1; x++) {
    modifyObjKey(pairs, polymer.substr(x, 2), 1)
}

for (let iter = 0, diff = {}, num; iter < 40; iter++, diff = {}) {
    rules.forEach(rule => {
        modifyObjKey(diff, rule.pair, -(num = pairs[rule.pair] || 0))
        rule.newPairs.forEach(np => modifyObjKey(diff, np, num))
    })
    Object.entries(diff).forEach(([pair, offset]) => modifyObjKey(pairs, pair, offset))

    if (iter == 9 || iter == 39) {
        const counts = Object.values(Object.entries(pairs).reduce(
            (acc, pairCount) => {
                modifyObjKey(acc, pairCount[0][0], pairCount[1])
                return acc
            }, {}
        )).sort((a, b) => a - b)
        console.log(counts.pop() - counts.shift())
    }
}
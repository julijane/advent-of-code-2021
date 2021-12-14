import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day12.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

let nexthops = {}

for (let line of lines) {
    const [a, b] = line.split('-')
    nexthops[a] ||= []
    nexthops[b] ||= []

    nexthops[a].push(b)
    nexthops[b].push(a)
}

let [part1, part2] = [0,0]

function recurse(prior, smalltwice, istwice) {
    for (let nexthop of nexthops[prior[0]]) {
        if (nexthop == 'end') continue

        if (nexthop == 'start') {
            part2++
            if (!istwice) part1++
            continue
        }

        const isSmall = nexthop[0] >= 'a'
        const visited = isSmall && prior.includes(nexthop)

        if (visited && !smalltwice) continue

        recurse([nexthop, ...prior], !visited && smalltwice, istwice || visited)
    }
}

recurse(['end'], true, false)
console.log(part1)
console.log(part2)
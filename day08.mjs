import fs from 'node:fs/promises'

const input = await fs.readFile('./inputs/day08.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

function sortString(str) {
    return str.split('').sort((a, b) => a < b ? -1 : a > b ? 1 : 0).join('')
}

function findMapping(observations) {

    const segsToDigit = {
        'ABCEFG': '0',
        'CF': '1',
        'ACDEG': '2',
        'ACDFG': '3',
        'BCDF': '4',
        'ABDFG': '5',
        'ABDEFG': '6',
        'ACF': '7',
        'ABCDEFG': '8',
        'ABCDFG': '9'
    }

    const countChars = observations.reduce(
        (acc, val) => {
            val.split('').forEach(char => {
                acc[char] ||= 0
                acc[char]++
            });
            return acc
        },
        {}
    )

    let segmentMap = {}

    segmentMap.E = Object.keys(countChars).find(char => countChars[char] == 4)
    segmentMap.B = Object.keys(countChars).find(char => countChars[char] == 6)
    segmentMap.F = Object.keys(countChars).find(char => countChars[char] == 9)

    const candidatesCF = observations.find(str => str.length == 2).split('')
    segmentMap.C = candidatesCF.find(char => char != segmentMap.F)

    const candidatesACF = observations.find(str => str.length == 3).split('')
    segmentMap.A = candidatesACF.find(char => char != segmentMap.C && char != segmentMap.F)

    const candidatesDG = Object.keys(countChars).filter(char => countChars[char] == 7)
    const sixSegmenters = observations.filter(str => str.length == 6).map(str => str.split(''))

    segmentMap.G = candidatesDG.find(
        char => sixSegmenters[0].includes(char) && sixSegmenters[1].includes(char) && sixSegmenters[2].includes(char)
    )
    segmentMap.D = candidatesDG.find(char => char != segmentMap.G)

    let digitMap = {}
    Object.keys(segsToDigit).forEach(
        segments => {
            digitMap[
                sortString(segments.split('').map(segment => segmentMap[segment]).join(''))
            ] = segsToDigit[segments]
        }
    )
    return digitMap
}

// Part 1
console.log(
    lines.map(
        line => line
            .split(' | ')[1]
            .split(' ')
            .filter(v => v.length < 5 || v.length == 7)
    ).flat().length
)

// Part 2
let sum = 0
for (let line of lines) {
    const [observations, measurement] = line.split(' | ').map(str => str.split(' '))
    const digitMap = findMapping(observations)

    sum += parseInt(measurement.map(
        str => digitMap[sortString(str)]
    ).join(''))
}
console.log(sum)

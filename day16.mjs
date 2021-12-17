import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day16.txt', 'utf-8')

let bits = input
    .replace(/./g, (char) =>
        parseInt(char, 16)
            .toString(2)
            .padStart(4, '0')
    )

let consumedBitsStack = []
let versionSum = 0

function getValue(numBits) {
    consumedBitsStack = consumedBitsStack.map(e => e + numBits)
    const thisBits = bits.substr(0, numBits)
    bits = bits.substr(numBits)
    return parseInt(thisBits, 2)
}

function fetchAndDecode() {
    const packetVersion = getValue(3)
    const packetType = getValue(3)

    versionSum += packetVersion

    if (packetType == 4) {
        let result = 0n
        for (; ;) {
            const isLast = !getValue(1)
            result = result * 16n + BigInt(getValue(4))
            if (isLast) break
        }
        return result
    } else {
        const lengthType = getValue(1)
        const opValues = []

        if (lengthType == 0) {
            const toConsumeBits = getValue(15)

            consumedBitsStack.unshift(0)

            while (consumedBitsStack[0] < toConsumeBits) {
                opValues.push(fetchAndDecode())
            }

            consumedBitsStack.shift()
        }
        else {
            const numSub = getValue(11)
            for (let x = 0; x < numSub; x++)
                opValues.push(fetchAndDecode())
        }

        if (packetType == 0) return opValues.reduce((acc, val) => acc + val, 0n)
        if (packetType == 1) return opValues.reduce((acc, val) => acc * val)
        if (packetType == 2) return opValues.reduce((acc, val) => val < acc ? val : acc)
        if (packetType == 3) return opValues.reduce((acc, val) => val > acc ? val : acc)
        if (packetType == 5) return opValues[0] > opValues[1] ? 1n : 0n
        if (packetType == 6) return opValues[0] < opValues[1] ? 1n : 0n
        if (packetType == 7) return opValues[0] == opValues[1] ? 1n : 0n
    }
}

const result = fetchAndDecode()
console.log(versionSum)
console.log(result.toString())

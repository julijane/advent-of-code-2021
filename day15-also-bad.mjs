import fs from 'node:fs/promises'
const input = await fs.readFile('./inputs/day15.txt', 'utf-8')
const lines = input.split('\n').filter(str => str.length)

const offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]]

const pos2Str = (x, y) => `${x}:${y}`

let grid = lines.map(
    line => line.split('').map(
        c => ({ cellRisk: parseInt(c), pathRisk: Infinity })
    )
)

const width = grid[0].length
const height = grid.length

let queue = []

function walk() {
    const [x,y,priorRisk,priorPath] = queue.shift()

    const risk = priorRisk + grid[y][x].cellRisk
    if (risk >= grid[y][x].pathRisk) return

    grid[y][x].pathRisk = risk

    if (y == height - 1 && x == width - 1) {
        console.log(risk)
        console.log(priorPath)
        return
    }

    for (let offset of offsets) {
        const newY = y + offset[1]
        const newX = x + offset[0]
        const posStr = `${y}:${x}`

        if (priorPath.includes(posStr)) continue
        if (newX < 0 || newY < 0 || newX >= width || newY >= height) continue

        // walk(newX, newY, risk, [posStr, ...priorPath])
        queue.push([
            newX, newY, risk, [posStr, ...priorPath]
        ])
    }
}

queue.push([0, 0, -grid[0][0].cellRisk, []])
while (queue.length > 0 ) {
    walk()
}

// walk(0, 0, -grid[0][0].cellRisk, [])

console.log(grid[height - 1][width - 1].pathRisk)
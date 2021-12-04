import fs from 'node:fs/promises'

function getBoardStats(boardIn, drawsIn) {
    let board = [...boardIn]
    let draws = [...drawsIn]
    let countDraws = 0
    let bingo = false
    let draw = 0
    while (!bingo && draws.length) {
        draw = draws.shift()
        countDraws++
        board = board.map(
            field => field == draw ? null : field
        )

        for (let n = 0; n < 5; n++) {
            if (
                (!board[n * 5] && !board[n * 5 + 1] && !board[n * 5 + 2] && !board[n * 5 + 3] && !board[n * 5 + 4]) ||
                (!board[n] && !board[n + 5] && !board[n + 10] && !board[n + 15] && !board[n + 20])
            ) {
                bingo = true
                break
            }
        }
    }

    const remaining = board.reduce(
        (acc, val) => {
            if (val) acc += parseInt(val)
            return acc
        },
        0
    )

    return {
        bingo,
        countDraws,
        score: bingo ? remaining * parseInt(draw) : 0
    }
}



const input = await fs.readFile('./inputs/day04.txt', 'utf-8')
const lines = input.split('\n').filter(l => l.length).map(l => l.trim())

const draws = lines.shift().split(',')

const numBoards = lines.length / 5
let boards = []

for (let board = 0; board < numBoards; board++) {
    boards.push([
        ...lines.shift().split(/\s+/),
        ...lines.shift().split(/\s+/),
        ...lines.shift().split(/\s+/),
        ...lines.shift().split(/\s+/),
        ...lines.shift().split(/\s+/),
    ])
}

const stats = boards
    .map(board => getBoardStats(board, draws))
    .filter(board => board.bingo)
    .sort(
        (a, b) => a.countDraws - b.countDraws
    )

console.log(stats[0].score)
console.log(stats[stats.length - 1].score)

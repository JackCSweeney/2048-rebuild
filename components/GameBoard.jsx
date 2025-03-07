'use client'

import React, { useState, useEffect } from "react"


const GameBoard = () => {
  const [board, setBoard] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {
    initializeBoard()
  }, [])

  const initializeBoard = () => {
    const newBoard = Array(4).fill().map(() => Array(4).fill(0))
    addNewTile(addNewTile(newBoard))
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }

  const addNewTile = (currentBoard) => {
    const emptyTiles = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) {
          emptyTiles.push({x: i, y: j})
        }
      }
    }

    if (emptyTiles.length > 0) {
      const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.Length)]
      currentBoard[x][y] = Math.random() < 0.9 ? 2 : 4
    }
    return currentBoard
  }

  const move = (direction) => {
    if (gameOver || won) return
    let newBoard = JSON.parst(JSON.stringify(board))
    let moved = false
    let newScore = score

    for (let i = 0; i < direction; i++) {
      newBoard = rotateBoard(newBoard)
    }

    for (let i = 0; i < 4; i++) {
      let row = newBoard[i]
      let newRow = row.filter(cell => cell !== 0)

      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j+1]) {
          newRow[j] *= 2
          newScore += newRow[j]
          if (newRow[j] === 2048) setWon(true);
          newRow.splice(j + 1, 1)
          moved = true
        }
      }

      while (newRow.length < 4) {
        newRow.push(0)
      }

      if (row.join(',') !== newRow.join(',')) {
        moved = true
      }
      newBoard[i] = newRow
    }

    for (let i = 0; i < (4 - direction) % 4; i++) {
      newBoard = rotateBoard(newBoard)
    }

    if (moved) {
      addNewTile(newBoard)
      setBoard(newBoard)
      setScore(newScore)

      if (!canMove(newBoard)) {
        setGameOver(true)
      }
    }
  }

  const rotateBoard = (currentBoard) => {
    const rotated = Array(4).fill().map(() => Array(4).fill(0))
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        rotated[j][3-i] = currentBoard[i][j]
      }
    }
    return rotated
  }

  return (
    <div>
      <div className='bg-gray-300 p-4 rounded-lg'>
        <div className='grid grid-cols-4 gap-2'>
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div key={`${i}-${j}`} className='w-16 h-16 flex items-center justify-center font-bold text-xl rounded'>
                {cell !== 0 && cell}
              </div>
          )))}
        </div>
      </div>
      <button onClick={initializeBoard}>
      </button>
    </div>
  )
}

export default GameBoard
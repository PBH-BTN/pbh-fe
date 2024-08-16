const rotateLeft = function (matrix: number[][]) {
  const rows = matrix.length
  const columns = matrix[0].length
  const res = [] as number[][]
  for (let row = 0; row < rows; ++row) {
    res.push([])
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1]
    }
  }
  return res
}

export class Tile {
  // Static property to keep track of IDs
  static id: number = 0

  // Member properties with explicit types
  value: number
  row: number
  column: number
  oldRow: number
  oldColumn: number
  markForDeletion: boolean
  mergedInto: Tile | null
  id: number

  // Constructor with parameter types
  constructor(value?: number, row?: number, column?: number) {
    this.value = value || 0
    this.row = row || -1
    this.column = column || -1
    this.oldRow = -1
    this.oldColumn = -1
    this.markForDeletion = false
    this.mergedInto = null
    this.id = Tile.id++
  }

  // Methods with typed parameters
  moveTo(row: number, column: number): void {
    this.oldRow = this.row
    this.oldColumn = this.column
    this.row = row
    this.column = column
  }

  // Helper methods
  isNew(): boolean {
    return this.oldRow === -1 && !this.mergedInto
  }

  hasMoved(): boolean {
    return (
      (this.fromRow() !== -1 &&
        (this.fromRow() !== this.toRow() || this.fromColumn() !== this.toColumn())) ||
      this.mergedInto !== null
    )
  }

  fromRow(): number {
    return this.mergedInto ? this.row : this.oldRow
  }

  fromColumn(): number {
    return this.mergedInto ? this.column : this.oldColumn
  }

  toRow(): number {
    return this.mergedInto ? this.mergedInto.row : this.row
  }

  toColumn(): number {
    return this.mergedInto ? this.mergedInto.column : this.column
  }
}

export class Board {
  tiles: Tile[]
  cells: Tile[][]
  won: boolean

  // Initially setting the static variables
  static size: number = 4
  static fourProbability: number = 0.1
  static deltaX: number[] = [-1, 0, 1, 0]
  static deltaY: number[] = [0, -1, 0, 1]

  constructor() {
    this.tiles = []
    this.cells = []
    for (let i = 0; i < Board.size; ++i) {
      this.cells[i] = [this.addTile(), this.addTile(), this.addTile(), this.addTile()]
    }
    this.addRandomTile()
    this.setPositions()
    this.won = false
  }

  addTile(value?: number): Tile {
    const tile = new Tile(value)
    this.tiles.push(tile)
    return tile
  }

  moveLeft(): boolean {
    let hasChanged = false
    for (let row = 0; row < Board.size; ++row) {
      const currentRow = this.cells[row].filter((tile) => tile.value != 0)
      const resultRow: Tile[] = []
      for (let target = 0; target < Board.size; ++target) {
        let targetTile = currentRow.length > 0 ? (currentRow.shift() as Tile) : this.addTile()
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          const tile1 = targetTile
          targetTile = this.addTile(targetTile.value)
          tile1.mergedInto = targetTile
          const tile2 = currentRow.shift() as Tile
          tile2.mergedInto = targetTile
          targetTile.value += tile2.value
        }
        resultRow[target] = targetTile
        this.won = this.won || targetTile.value === 2048
        hasChanged = hasChanged || targetTile.value !== this.cells[row][target].value
      }
      this.cells[row] = resultRow
    }
    return hasChanged
  }

  setPositions(): void {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row
        tile.oldColumn = tile.column
        tile.row = rowIndex
        tile.column = columnIndex
        tile.markForDeletion = false
      })
    })
  }

  addRandomTile(): void {
    const emptyCells: { r: number; c: number }[] = []
    for (let r = 0; r < Board.size; ++r) {
      for (let c = 0; c < Board.size; ++c) {
        if (this.cells[r][c].value === 0) {
          emptyCells.push({ r, c })
        }
      }
    }
    const index = Math.floor(Math.random() * emptyCells.length)
    const cell = emptyCells[index]
    const newValue = Math.random() < Board.fourProbability ? 4 : 2
    this.cells[cell.r][cell.c] = this.addTile(newValue)
  }

  move(direction: number): this {
    this.clearOldTiles()
    for (let i = 0; i < direction; ++i) {
      this.cells = this.rotateLeft(this.cells)
    }
    const hasChanged = this.moveLeft()
    for (let i = direction; i < 4; ++i) {
      this.cells = this.rotateLeft(this.cells)
    }
    if (hasChanged) {
      this.addRandomTile()
    }
    this.setPositions()
    return this
  }

  clearOldTiles(): void {
    this.tiles = this.tiles.filter((tile) => !tile.markForDeletion)
    this.tiles.forEach((tile) => (tile.markForDeletion = true))
  }

  hasWon(): boolean {
    return this.won
  }

  hasLost(): boolean {
    let canMove = false
    for (let row = 0; row < Board.size; ++row) {
      for (let column = 0; column < Board.size; ++column) {
        canMove = canMove || this.cells[row][column].value === 0
        for (let dir = 0; dir < 4; ++dir) {
          const newRow = row + Board.deltaX[dir]
          const newColumn = column + Board.deltaY[dir]
          if (newRow < 0 || newRow >= Board.size || newColumn < 0 || newColumn >= Board.size) {
            continue
          }
          canMove = canMove || this.cells[row][column].value === this.cells[newRow][newColumn].value
        }
      }
    }
    return !canMove
  }

  private rotateLeft(matrix: Tile[][]): Tile[][] {
    const rows = matrix.length
    const columns = matrix[0].length
    const res = [] as Tile[][]
    for (let row = 0; row < rows; ++row) {
      res.push([])
      for (let column = 0; column < columns; ++column) {
        res[row][column] = matrix[column][columns - row - 1]
      }
    }
    return res
  }
}

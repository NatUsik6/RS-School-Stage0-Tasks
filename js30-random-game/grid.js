import { Cell } from "./cell.js ";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
    constructor(gridElement) {
        this.cells = [];
        for (let i = 0; i < CELLS_COUNT; i++) {
            const cell = new Cell(gridElement, i % GRID_SIZE, Math.floor (i / GRID_SIZE));
            this.cells.push(cell);
        }
    }

    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
}
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

        this.cellsGroupedByColum = this.groupCellByColumn();
        this.cellsGroupedByReversedColumn = this.cellsGroupedByColum.map(colum => [...colum].reverse());
        this.cellsGroupedByRow = this.cellsGroupedByRow();
        this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map(colum => [...colum].reverse);
    }

    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    groupCellByColumn() {
        // return this.cells.reduce((groupedCells, cell) => {
        //     groupedCells[cell.x] = groupedCells[cell.x] || [];
        //     groupedCells[cell.x][cell.y] = cell;
        // }, []);

        const groupedCells = [];
        for (let cell of this.cells) {
            groupedCells[cell.x] = groupedCells[cell.x] || [];
            groupedCells[cell.x][cell.y] = cell;
        }

        return groupedCells;
    }

    cellsGroupedByRow() {
        const groupedCells = [];
        for (let cell of this.cells) {
            groupedCells[cell.y] = groupedCells[cell.y] || [];
            groupedCells[cell.y][cell.x] = cell;
        }

        return groupedCells;
    }
}
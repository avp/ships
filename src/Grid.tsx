// @format

import { applyDir, Dir, Point } from './Geometry';
import { Ship } from './Fleet';

export const GRID_SIZE = 10;

export enum HoverState {
  None,
  Valid,
  Invalid,
}

export class Grid {
  grid: Array<Array<Cell>>;

  constructor() {
    this.grid = [];
    for (let r = 0; r < GRID_SIZE; ++r) {
      let row = [];
      for (let c = 0; c < GRID_SIZE; ++c) {
        row.push(new Cell());
      }
      this.grid.push(row);
    }
  }

  handleHover([r, c]: Point, enter: boolean, ship: Ship, dir: Dir): void {
    const size = ship.size();
    const points = [];
    let state = HoverState.Valid;
    for (let i = 0; i < size; ++i) {
      points.push([r, c]);
      if (this.grid[r][c].ship) {
        state = HoverState.Invalid;
      }
      [r, c] = applyDir([r, c], dir);
      if (r >= GRID_SIZE || c >= GRID_SIZE) {
        break;
      }
    }
    for (const [r, c] of points) {
      this.grid[r][c].hover = enter ? state : HoverState.None;
    }
  }
}

export class Cell {
  hover: HoverState;
  ship: Ship | null;

  constructor() {
    this.hover = HoverState.None;
    this.ship = null;
  }
}

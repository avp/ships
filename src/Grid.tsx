// @format

import { applyDir, Dir, Point } from './Geometry';
import { Fleet, Ship } from './Fleet';

export const GRID_SIZE = 10;

export enum HoverState {
  None,
  Valid,
  Invalid,
}

enum Result {
  Hit,
  Miss,
}

interface Attempt {
  p: Point;
  result: Result;
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

  static randomize(fleet: Fleet): Grid {
    const grid = new Grid();

    for (const ship of fleet.ships) {
      while (!ship.pos) {
        const r = Math.floor(Math.random() * GRID_SIZE);
        const c = Math.floor(Math.random() * GRID_SIZE);
        const dir = Math.random() < 0.5 ? Dir.Across : Dir.Down;
        const pos: Point = [r, c];
        if (grid.isValidPlacement(pos, ship, dir)) {
          grid.placeShip(pos, ship, dir);
        }
      }
    }

    return grid;
  }

  clearHover(): void {
    for (const r of this.grid) {
      for (const c of r) {
        c.hover = HoverState.None;
      }
    }
  }

  isValidPlacement(
    [r, c]: Point,
    ship: Ship,
    dir: Dir
  ): [boolean, Array<Point>] {
    const size = ship.size();
    const points: Array<Point> = [];
    let result = true;
    for (let i = 0; i < size; ++i) {
      if (r >= GRID_SIZE || c >= GRID_SIZE) {
        return [false, points];
      }
      points.push([r, c]);
      if (this.grid[r][c].ship) {
        result = false;
      }
      [r, c] = applyDir([r, c], dir);
    }
    return [result, points];
  }

  handlePlacementHover(p: Point, enter: boolean, ship: Ship, dir: Dir): void {
    let [valid, points] = this.isValidPlacement(p, ship, dir);
    let state = valid ? HoverState.Valid : HoverState.Invalid;
    for (const [r, c] of points) {
      this.grid[r][c].hover = enter ? state : HoverState.None;
    }
  }

  placeShip(p: Point, ship: Ship, dir: Dir): boolean {
    let [valid, points] = this.isValidPlacement(p, ship, dir);
    if (!valid) {
      return false;
    }

    for (const [r, c] of points) {
      this.grid[r][c].ship = ship;
    }
    ship.dir = dir;
    ship.pos = p;

    return true;
  }
}

export class Cell {
  hover: HoverState;
  ship: Ship | null;
  attempt: boolean;

  constructor() {
    this.hover = HoverState.None;
    this.ship = null;
    this.attempt = false;
  }
}

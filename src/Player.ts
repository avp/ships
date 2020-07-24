// @format

import { Grid, GRID_SIZE } from './Grid';
import { Point } from './Geometry';
import { Fleet } from './Fleet';

export class Player {
  grid: Grid;
  fleet: Fleet;

  constructor(grid: Grid, fleet: Fleet) {
    this.grid = grid;
    this.fleet = fleet;
  }
}

export class Human extends Player {}

export class Computer extends Player {
  constructor() {
    const fleet = new Fleet();
    const grid = Grid.randomize(fleet);
    super(grid, fleet);
  }

  makeMove(grid: Grid): Point {
    while (true) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (!grid.grid[r][c].attempt) {
        grid.grid[r][c].attempt = true;
        return [r, c];
      }
    }
  }
}

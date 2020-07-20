// @format

import { Grid } from './Grid';
import { Fleet, Ship } from './Fleet';

export class Player {
  grid: Grid;
  fleet: Fleet;

  constructor(grid: Grid, fleet: Fleet) {
    this.grid = grid;
    this.fleet = fleet;
  }
}

export class Human extends Player {
  constructor(grid: Grid, fleet: Fleet) {
    super(grid, fleet);
  }
}

export class Computer extends Player {
  constructor() {
    const fleet = new Fleet();
    const grid = Grid.randomize(fleet);
    super(grid, fleet);
  }
}

// @format

import { Dir, applyDir } from './Geometry';
import { Grid } from './Grid';

interface Kind {
  name: string;
  className: string;
  size: number;
}

const kinds: Record<string, Kind> = {
  destroyer: {
    name: 'Destroyer',
    className: 'Destroyer',
    size: 2,
  },
  submarine: {
    name: 'Submarine',
    className: 'Submarine',
    size: 3,
  },
  cruiser: {
    name: 'Cruiser',
    className: 'Cruiser',
    size: 3,
  },
  battleship: {
    name: 'Battleship',
    className: 'Battleship',
    size: 4,
  },
  carrier: {
    name: 'Aircraft Carrier',
    className: 'Carrier',
    size: 5,
  },
};

export class Ship {
  kind: Kind;
  pos: [number, number] | null;
  dir: Dir;

  constructor(kind: string) {
    this.kind = kinds[kind];
    this.pos = null;
    this.dir = Dir.Across;
    return this;
  }

  size(): number {
    return this.kind.size;
  }

  isSunk(grid: Grid): boolean {
    if (!this.pos) {
      return false;
    }
    let [r, c] = this.pos;
    for (let i = 0; i < this.size(); ++i) {
      if (!grid.grid[r][c].attempt) {
        return false;
      }
      [r, c] = applyDir([r, c], this.dir);
    }
    return true;
  }
}

export class Fleet {
  ships: Array<Ship>;

  constructor() {
    this.ships = [
      new Ship('destroyer'),
      new Ship('submarine'),
      new Ship('cruiser'),
      new Ship('battleship'),
      new Ship('carrier'),
    ];
    return this;
  }
}

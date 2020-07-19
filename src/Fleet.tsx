// @format

import { Dir } from './Geometry';

interface Kind {
  name: string;
  size: number;
}

const kinds: Record<string, Kind> = {
  destroyer: {
    name: 'Destroyer',
    size: 2,
  },
  submarine: {
    name: 'Submarine',
    size: 3,
  },
  cruiser: {
    name: 'Cruiser',
    size: 3,
  },
  battleship: {
    name: 'Battleship',
    size: 4,
  },
  carrier: {
    name: 'Aircraft Carrier',
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

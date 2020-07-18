// @format

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

  constructor(kind: string) {
    this.kind = kinds[kind];
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

// @format

const kinds = {
  submarine: {
    name: 'Submarine',
    size: 1,
  },
  destroyer: {
    name: 'Destroyer',
    size: 2,
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
  constructor(kind) {
    this.kind = kinds[kind];
  }
}

export class Fleet {
  constructor() {
    this.ships = [
      new Ship('submarine'),
      new Ship('submarine'),
      new Ship('destroyer'),
      new Ship('destroyer'),
      new Ship('cruiser'),
      new Ship('battleship'),
      new Ship('carrier'),
    ];
  }
}

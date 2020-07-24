// @format

import React from 'react';
import './Ship.css';
import { Ship } from './Fleet';
import { Grid } from './Grid';

interface Props {
  selected: boolean;
  ship: Ship;
  onClick?(activated: boolean, ship: Ship): void;
  dimIfPlaced?: boolean;
  dimOnSunk?: Grid;
}

export function ShipView({
  selected,
  ship,
  onClick,
  dimIfPlaced,
  dimOnSunk,
}: Props) {
  const size: number = ship.kind.size;

  const className = ['Ship'];
  className.push(selected ? 'ShipSelected' : 'ShipUnselected');
  if (dimIfPlaced && ship.pos) {
    className.push('ShipDimmed');
  }
  if (dimOnSunk && ship.isSunk(dimOnSunk)) {
    className.push('ShipSunk');
  }

  const cells = [];
  for (let i = 0; i < size; ++i) {
    cells.push(
      <div key={i} className={`GridElement ${ship.kind.className}`} />
    );
  }

  return (
    <div
      className={className.join(' ')}
      onClick={() => onClick?.(!selected, ship)}
    >
      {cells}
    </div>
  );
}

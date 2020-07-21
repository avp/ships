// @format

import React, { useState } from 'react';
import './Ship.css';
import { Fleet, Ship } from './Fleet';
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

  const className = ['Ship', ship.kind.className];
  className.push(selected ? 'selected' : 'unselected');
  if (dimIfPlaced && ship.pos) {
    className.push('dimmed');
  }
  if (dimOnSunk && ship.isSunk(dimOnSunk)) {
    className.push('sunk');
  }

  return (
    <div
      className={className.join(' ')}
      style={{ width: size * 25 }}
      onClick={() => onClick?.(!selected, ship)}
    />
  );
}

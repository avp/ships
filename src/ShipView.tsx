// @format

import React, { useState } from 'react';
import './Ship.css';
import { Fleet, Ship } from './Fleet';

interface Props {
  selected: boolean;
  ship: Ship;
  onClick?(activated: boolean, ship: Ship): void;
}

export function ShipView({ selected, ship, onClick }: Props) {
  const size: number = ship.kind.size;

  return (
    <div
      className={`Ship ${selected ? 'selected' : 'unselected'} ${
        ship.kind.className
      } ${ship.pos ? 'dimmed' : ''}`}
      style={{ width: size * 30 }}
      onClick={() => onClick?.(!selected, ship)}
    />
  );
}

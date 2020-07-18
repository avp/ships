// @format

import React, { useState } from 'react';
import './Ship.css';
import * as Fleet from './Fleet';

interface Props {
  selected: boolean,
  ship: Fleet.Ship,
}

export default function Ship({ selected, ship }: Props) {
  const size: number = ship.kind.size;

  return (
    <div
      className={`Ship ${selected ? 'selected' : ''}`}
      style={{ width: size * 30 }}
    />
  );
}

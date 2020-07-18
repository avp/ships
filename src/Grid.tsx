// @format

import React, { useState } from 'react';
import './Grid.css';
import { Fleet } from './Fleet';

const GRID_SIZE = 8;

interface Props {
  fleet: Fleet;
}

export default function Grid({ fleet }: Props) {
  const [grid, setGrid] = useState([]);

  const rows = [];
  for (let r = 0; r < GRID_SIZE; ++r) {
    const cells = [];
    for (let c = 0; c < GRID_SIZE; ++c) {
      cells.push(<td className={'Cell'} />);
    }
    rows.push(<tr className={'Row'}>{cells}</tr>);
  }

  return (
    <table cellSpacing={0} className={'Grid'}>
      {rows}
    </table>
  );
}

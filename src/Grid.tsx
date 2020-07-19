// @format

import React, { useState } from 'react';
import './Grid.css';
import { Fleet } from './Fleet';

const GRID_SIZE = 10;

interface Props {
  fleet: Fleet;
}

/// Displays the given fleet on a grid.
export function Grid({ fleet }: Props) {
  const [grid, setGrid] = useState([]);

  const rows = [];

  const cells = [];
  for (const ch of ' ABCDEFGHIJ') {
    cells.push(<td>{ch}</td>);
  }
  rows.push(<tr className={'Row'}>{cells}</tr>);

  for (let r = 0; r < GRID_SIZE; ++r) {
    const cells = [];
    cells.push(<td>{r + 1}</td>);
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

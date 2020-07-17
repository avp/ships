// @format

import React, { useState } from 'react';
import './Grid.css';

const GRID_SIZE = 8;

export default function Grid() {
  const [grid, setGrid] = useState([]);

  const rows = [];
  for (let r = 0; r < GRID_SIZE; ++r) {
    const cells = [];
    for (let c = 0; c < GRID_SIZE; ++c) {
      cells.push(<td class="Cell" />);
    }
    rows.push(<tr class="Row">{cells}</tr>);
  }

  return (
    <table cellSpacing={0} class="Grid">{rows}</table>
  );
}

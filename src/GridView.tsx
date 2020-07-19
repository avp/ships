// @format

import React, { useState } from 'react';
import './Grid.css';
import { Fleet } from './Fleet';
import { GRID_SIZE, HoverState, Grid } from './Grid';

export interface Props {
  fleet: Fleet;
  grid: Grid;
  onMouseEnter: (r: number, c: number) => void;
  onMouseLeave: (r: number, c: number) => void;
}

/// Displays the given fleet on a grid.
export function GridView({ grid, onMouseEnter, onMouseLeave }: Props) {
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
      let className = ['Cell'];
      switch (grid.grid[r][c].hover) {
        case HoverState.None:
          className.push('HoverNone');
          break;
        case HoverState.Valid:
          className.push('HoverValid');
          break;
        case HoverState.Invalid:
          className.push('HoverInvalid');
          break;
      }
      cells.push(
        <td
          className={className.join(' ')}
          onMouseOver={() => onMouseEnter(r, c)}
          onMouseOut={() => onMouseLeave(r, c)}
        />
      );
    }
    rows.push(<tr className={'Row'}>{cells}</tr>);
  }

  return (
    <table cellSpacing={0} className={'Grid'}>
      <tbody>{rows}</tbody>
    </table>
  );
}

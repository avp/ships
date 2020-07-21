// @format

import React, { useState } from 'react';
import './Grid.css';
import { Fleet } from './Fleet';
import { GRID_SIZE, HoverState, Grid } from './Grid';

export interface Props {
  fleet: Fleet;
  grid: Grid;
  hideFleet?: boolean;
  onMouseEnter?: (r: number, c: number) => void;
  onMouseLeave?: (r: number, c: number) => void;
  onClick?: (r: number, c: number) => void;
}

/// Displays the given fleet on a grid.
export function GridView({
  grid,
  onMouseEnter,
  onMouseLeave,
  onClick,
  hideFleet,
}: Props) {
  const rows = [];

  const cells = [];
  for (const ch of ' ABCDEFGHIJ') {
    cells.push(
      <td key={ch}>
        <div className={'content'}>{ch}</div>
      </td>
    );
  }
  rows.push(
    <tr key={-1000} className={'Row'}>
      {cells}
    </tr>
  );

  let key = 0;
  for (let r = 0; r < GRID_SIZE; ++r) {
    const cells = [];
    cells.push(
      <td className={'CellLabel'} key={-1 * r}>
        <div className={'content'}>{r + 1}</div>
      </td>
    );
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
      const cell = grid.grid[r][c];
      const ship = cell.ship;
      if (ship && !hideFleet) {
        className.push(ship.kind.className);
      }
      const attempt = (
        <div
          className={`Attempt ${
            cell.attempt ? (cell.ship ? 'AttemptHit' : 'AttemptMiss') : ''
          }`}
        ></div>
      );
      cells.push(
        <td
          key={++key}
          className={className.join(' ')}
          onMouseOver={() => onMouseEnter?.(r, c)}
          onMouseOut={() => onMouseLeave?.(r, c)}
          onClick={() => onClick?.(r, c)}
        >
          {attempt}
        </td>
      );
    }
    rows.push(
      <tr key={++key} className={'Row'}>
        {cells}
      </tr>
    );
  }

  return (
    <table cellSpacing={0} className={'Grid'}>
      <tbody>{rows}</tbody>
    </table>
  );
}

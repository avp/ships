// @format

import React, { useState, useEffect } from 'react';
import './Game.css';
import { GridView } from './GridView';
import { ShipView } from './ShipView';

import { HoverState, Grid } from './Grid';
import { Point } from './Geometry';
import { Fleet } from './Fleet';
import { Player, Human, Computer } from './Player';

interface Props {
  grid: Grid;
  fleet: Fleet;
}

export function Game({ grid, fleet }: Props) {
  const [forcer, setForcer] = useState(0);
  let [computer, setComputer] = useState(() => new Computer());
  let [human, setHuman] = useState(() => new Human(grid, fleet));
  let [turn, setTurn] = useState<Player>(human);

  const renderTurn = () => {
    if (turn === human) {
      return 'Your turn';
    } else if (turn === computer) {
      return 'Computer is thinking...';
    }
  };

  const handleHover = (grid: Grid, [r, c]: Point, entered: boolean) => {
    if (turn !== human) {
      return;
    }
    if (entered && !grid.grid[r][c].attempt) {
      grid.grid[r][c].hover = HoverState.Valid;
    } else {
      grid.grid[r][c].hover = HoverState.None;
    }
    setForcer(1 - forcer);
  };

  const makeMove = (grid: Grid, [r, c]: Point) => {
    if (turn !== human) {
      return;
    }
    const cell = grid.grid[r][c];
    if (cell.attempt) {
      return;
    }
    cell.attempt = true;
    cell.hover = HoverState.None;
    setTurn(computer);
    setTimeout(() => {
      computer.makeMove(human.grid);
      setTurn(human);
    }, 500);
  };

  return (
    <div className="Game">
      <h2>{renderTurn()}</h2>
      <div className="GameContainer">
        <div className="GamePlayer GameHuman">
          <h3 className="GamePlayerHeader">You</h3>
          <GridView fleet={human.fleet} grid={human.grid}></GridView>
          <GameFleet fleet={human.fleet}></GameFleet>
        </div>
        <div className="GamePlayer GameComputer">
          <h3 className="GamePlayerHeader">Computer</h3>
          <GridView
            fleet={computer.fleet}
            grid={computer.grid}
            onMouseEnter={(r, c) => handleHover(computer.grid, [r, c], true)}
            onMouseLeave={(r, c) => handleHover(computer.grid, [r, c], false)}
            onClick={(r, c) => makeMove(computer.grid, [r, c])}
            hideFleet={true}
          ></GridView>
          <GameFleet fleet={computer.fleet}></GameFleet>
        </div>
      </div>
    </div>
  );
}

interface GameFleetProps {
  fleet: Fleet;
}

function GameFleet(props: GameFleetProps) {
  const ships = [];
  for (const ship of props.fleet.ships) {
    ships.push(<ShipView selected={false} key={ship.kind.name} ship={ship} />);
  }
  return <div className={'GameFleet'}>{ships}</div>;
}

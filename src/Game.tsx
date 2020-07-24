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
  onComplete(): void;
}

export function Game({ grid, fleet, onComplete }: Props) {
  const [forcer, setForcer] = useState(0);
  let [computer, setComputer] = useState(() => new Computer());
  let [human, setHuman] = useState(() => new Human(grid, fleet));
  let [turn, setTurn] = useState<Player | null>(human);
  let [winner, setWinner] = useState<Player | null>(null);

  const renderTurn = () => {
    if (winner) {
      return winner === human ? 'You win!' : 'Computer wins';
    }
    if (turn === human) {
      return 'Your turn';
    }
    if (turn === computer) {
      return 'Computer is thinking...';
    }
  };

  const changePlayer = (player: Player) => {
    if (human.fleet.ships.every((s) => s.isSunk(human.grid))) {
      setWinner(computer);
      setTurn(null);
      return;
    }

    if (computer.fleet.ships.every((s) => s.isSunk(computer.grid))) {
      setWinner(human);
      setTurn(null);
      return;
    }

    setTurn(player);
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
    changePlayer(computer);
    setTimeout(() => {
      computer.makeMove(human.grid);
      changePlayer(human);
    }, 100);
  };

  return (
    <div className="Game">
      <h2>{renderTurn()}</h2>
      <div className="GameContainer">
        <div className="GamePlayer GameHuman">
          <h3 className="GamePlayerHeader">You</h3>
          <GameFleet fleet={human.fleet} grid={human.grid}></GameFleet>
          <GridView fleet={human.fleet} grid={human.grid}></GridView>
        </div>
        <div className="GamePlayer GameComputer">
          <h3 className="GamePlayerHeader">Computer</h3>
          <GridView
            fleet={computer.fleet}
            grid={computer.grid}
            onMouseEnter={(r, c) => handleHover(computer.grid, [r, c], true)}
            onMouseLeave={(r, c) => handleHover(computer.grid, [r, c], false)}
            onClick={(r, c) => makeMove(computer.grid, [r, c])}
            hideFleet={!winner}
          ></GridView>
          <GameFleet fleet={computer.fleet} grid={computer.grid}></GameFleet>
        </div>
      </div>
      <div className={'GameButtons'}>
        <button className={'btn'} onClick={onComplete}>
          Reset
        </button>
      </div>
    </div>
  );
}

interface GameFleetProps {
  fleet: Fleet;
  grid: Grid;
}

function GameFleet(props: GameFleetProps) {
  const ships = [];
  for (const ship of props.fleet.ships) {
    ships.push(
      <ShipView
        selected={false}
        key={ship.kind.name}
        ship={ship}
        dimOnSunk={props.grid}
      />
    );
  }
  return <div className={'GameFleet'}>{ships}</div>;
}

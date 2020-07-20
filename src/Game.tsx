// @format

import React, { useState } from 'react';
import './Game.css';
import { GridView } from './GridView';
import { ShipView } from './ShipView';

import { Grid } from './Grid';
import { Point } from './Geometry';
import { Fleet } from './Fleet';
import { Player, Human, Computer } from './Player';

interface Props {
  grid: Grid;
  fleet: Fleet;
}

enum Result {
  Hit,
  Miss,
}

interface Attempt {
  p: Point;
  result: Result;
}

export function Game({ grid, fleet }: Props) {
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

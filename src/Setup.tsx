// @format

import React, { useState } from 'react';
import './Setup.css';
import { GridView } from './GridView';
import { ShipView } from './ShipView';

import { Fleet, Ship } from './Fleet';
import { Grid } from './Grid';
import { Dir } from './Geometry';

export default function Setup() {
  const [forcer, setForcer] = useState(0);
  const [fleet, setFleet] = useState(() => new Fleet());
  const [grid, setGrid] = useState(() => new Grid());
  const [mouseLoc, setMouseLoc] = useState<[number, number] | null>(null);
  const [dir, setDir] = useState(Dir.Across);
  const [activeShip, setActiveShip] = useState<Ship | null>(null);

  const clickShip = (activated: boolean, ship: Ship) => {
    if (activated) {
      setActiveShip(ship);
    } else {
      setActiveShip(null);
    }
  };

  const handleHover = (r: number, c: number, enter: boolean): void => {
    if (!activeShip) {
      return;
    }
    if (enter) {
      setMouseLoc([r, c]);
    } else {
      setMouseLoc(null);
    }
    grid.handleHover([r, c], enter, activeShip, dir);
    setGrid(grid);
    setForcer(1 - forcer);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    console.log(e.key);
    if (e.key === 'r') {
      grid.clearHover();
      const newDir = dir === Dir.Across ? Dir.Down : Dir.Across;
      if (mouseLoc && activeShip) {
        grid.handleHover(mouseLoc, true, activeShip, newDir);
      }
      setDir(newDir);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <h2>Setup</h2>
      <p>
        Press <code>r</code> to rotate
      </p>
      <div className={'SetupContainer'}>
        <div className={'SetupGrid'}>
          <GridView
            fleet={fleet}
            grid={grid}
            onMouseEnter={(r: number, c: number) => handleHover(r, c, true)}
            onMouseLeave={(r: number, c: number) => handleHover(r, c, false)}
          ></GridView>
        </div>
        <SetupFleet
          fleet={fleet}
          onClick={clickShip}
          activeShip={activeShip}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

interface SetupFleetProps {
  fleet: Fleet;
  activeShip: Ship | null;
  onClick(activated: boolean, ship: Ship): void;
  onKeyPress(e: React.KeyboardEvent<HTMLDivElement>): void;
}

function SetupFleet(props: SetupFleetProps) {
  const ships = [];
  for (const ship of props.fleet.ships) {
    ships.push(
      <ShipView
        selected={ship === props.activeShip}
        key={ship.kind.name}
        ship={ship}
        onClick={props.onClick}
      />
    );
  }
  return (
    <div
      className={'SetupFleet'}
      onKeyPress={(e) => props.onKeyPress(e)}
      tabIndex={-1}
    >
      {ships}
    </div>
  );
}

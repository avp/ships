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
    grid.handleHover([r, c], enter, activeShip, Dir.Across);
    setGrid(grid);
    setForcer(1 - forcer);
  };

  return (
    <div>
      <h2>Setup</h2>
      <p>
        Press <code>r</code> to rotate
      </p>
      <div className={'SetupContainer'}>
        <GridView
          fleet={fleet}
          grid={grid}
          onMouseEnter={(r: number, c: number) => handleHover(r, c, true)}
          onMouseLeave={(r: number, c: number) => handleHover(r, c, false)}
        ></GridView>
        <SetupFleet fleet={fleet} onClick={clickShip} activeShip={activeShip} />
      </div>
    </div>
  );
}

function SetupGrid(props: any) {
  return (
    <div className={'SetupGrid'}>
      <GridView {...props} />
    </div>
  );
}

interface SetupFleetProps {
  fleet: Fleet;
  activeShip: Ship | null;
  onClick(activated: boolean, ship: Ship): void;
}

function SetupFleet(props: SetupFleetProps) {
  const ships = [];
  for (const ship of props.fleet.ships) {
    ships.push(
      <ShipView
        selected={ship === props.activeShip}
        ship={ship}
        onClick={props.onClick}
      />
    );
  }
  return <div className={'SetupFleet'}>{ships}</div>;
}

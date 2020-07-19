// @format

import React, { useState } from 'react';
import './Setup.css';
import { Grid } from './Grid';
import { ShipView } from './ShipView';

import { Fleet, Ship } from './Fleet';

export default function Setup() {
  const [fleet, setFleet] = useState(() => new Fleet());
  const [activeShip, setActiveShip] = useState<Ship | null>(null);

  const clickShip = (activated: boolean, ship: Ship) => {
    if (activated) {
      setActiveShip(ship);
    } else {
      setActiveShip(null);
    }
  };

  return (
    <div>
      <h2>Setup</h2>
      <p>
        Press <code>r</code> to rotate
      </p>
      <div className={'SetupContainer'}>
        <SetupGrid fleet={fleet}></SetupGrid>
        <SetupFleet
          fleet={fleet}
          onClick={clickShip}
          activeShip={activeShip}
        ></SetupFleet>
      </div>
    </div>
  );
}

function SetupGrid({ fleet }: any) {
  return (
    <div className={'SetupGrid'}>
      <Grid fleet={fleet}></Grid>
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
  console.log(ships);
  return <div className={'SetupFleet'}>{ships}</div>;
}

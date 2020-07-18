// @format

import React, { useState } from 'react';
import './Setup.css';
import Grid from './Grid';
import Ship from './Ship';

import { Fleet } from './Fleet';

export default function Setup() {
  const [fleet, setFleet] = useState(() => new Fleet());

  return (
    <div>
      <h2>Setup</h2>
      <p>
        Press <code>r</code> to rotate
      </p>
      <div className={'SetupContainer'}>
        <SetupGrid fleet={fleet}></SetupGrid>
        <SetupFleet fleet={fleet}></SetupFleet>
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
}

function SetupFleet(props: SetupFleetProps) {
  const ships = [];
  for (const ship of props.fleet.ships) {
    console.log(ship);
    ships.push(<Ship selected={false} ship={ship} />);
  }
  console.log(ships);
  return <div className={'SetupFleet'}>{ships}</div>;
}

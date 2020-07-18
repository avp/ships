// @format

import React, { useState } from 'react';
import Grid from './Grid';
import Ship from './Ship';

import { Fleet } from './Fleet';

export default function Setup() {
  const [fleet, setFleet] = useState(() => new Fleet());

  return (
    <div>
      <Grid fleet={fleet}></Grid>
      <SetupFleet fleet={fleet}></SetupFleet>
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
  return <div>{ships}</div>;
}

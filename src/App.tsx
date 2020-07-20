// @format

import React, { useState } from 'react';
import './App.css';
import { Setup } from './Setup';
import { Game } from './Game';
import { Grid } from './Grid';
import { Fleet } from './Fleet';

export default function App() {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [fleet, setFleet] = useState<Fleet | null>(null);

  const completeSetup = (grid: Grid, fleet: Fleet) => {
    setGrid(grid);
    setFleet(fleet);
  };

  let inside;
  if (grid && fleet) {
      inside = <Game grid={grid} fleet={fleet} />;
  } else {
      inside = <Setup onSetup={completeSetup} />;
  }

  return (
    <div className="App">
      <h1>SUPER DELUXE SHIP BATTLE</h1>
      {inside}
    </div>
  );
}

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

  const reset = () => {
    setGrid(null);
    setFleet(null);
  }

  let inside;
  if (grid && fleet) {
    inside = <Game grid={grid} fleet={fleet} onComplete={reset} />;
  } else {
    inside = <Setup onSetup={completeSetup} />;
  }

  return (
    <div className="App">
      <h1>SHIPS IN A GRID</h1>
      {inside}
    </div>
  );
}

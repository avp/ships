// @format

import React, { useState } from 'react';
import './App.css';
import { Setup } from './Setup';
import { Game } from './Game';
import { Grid } from './Grid';
import { Fleet } from './Fleet';

enum Phase {
  Setup,
  Play,
}

export default function App() {
  const [phase, setPhase] = useState(Phase.Setup);

  const completeSetup = (grid: Grid, fleet: Fleet) => {
    setPhase(Phase.Play);
  };

  const inside =
    phase === Phase.Setup ? <Setup onSetup={completeSetup} /> : <Game />;

  return (
    <div className="App">
      <h1>SUPER DELUXE SHIP BATTLE</h1>
      {inside}
    </div>
  );
}

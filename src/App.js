// @format

import React, { useState } from 'react';
import './App.css';
import Setup from './Setup.js';
import Game from './Game.js';

const PHASE_SETUP = 0;
const PHASE_PLAY = 1;

export default function App() {
  const [phase, setPhase] = useState(PHASE_SETUP);

  const completeSetup = (positions) => {};

  const inside = phase == PHASE_SETUP ? <Setup /> : <Game />;

  return (
    <div class="App">
      <h1>SUPER DELUXE SHIP BATTLE</h1>
      {inside}
    </div>
  );
}

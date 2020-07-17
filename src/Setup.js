// @format

import React, { useState } from 'react';
import Grid from './Grid.js';
import { Fleet } from './Fleet.js';

function Setup() {
  const [fleet, setFleet] = useState(new Fleet());

  return (
    <Grid fleet={fleet} />
  );
}

export default Setup;

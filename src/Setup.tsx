// @format

import React, { useState } from 'react';
import './Setup.css';
import { GridView } from './GridView';
import { ShipView } from './ShipView';

import { Fleet, Ship } from './Fleet';
import { Grid } from './Grid';
import { Dir, Point } from './Geometry';

interface Props {
  onSetup(grid: Grid, fleet: Fleet): void;
}

/**
 * Handles setup of the ships on a grid for the player.
 * Pass the onSetup() hook in order to get the grid and fleet which will
 * be used for playing the actual game.
 */
export function Setup({ onSetup }: Props) {
  // Use this to force updates without shallow copying things like `grid`,
  // when necessary.
  // Can't find a React hooks way to force a reconciliation without this hack.
  const [forcer, setForcer] = useState(0);
  const [fleet, setFleet] = useState(() => new Fleet());
  const [grid, setGrid] = useState(() => new Grid());
  const [mouseLoc, setMouseLoc] = useState<[number, number] | null>(null);
  const [dir, setDir] = useState(Dir.Across);
  const [activeShip, setActiveShip] = useState<Ship | null>(null);

  // Activate/Deactivate a ship on clicking it.
  const clickShip = (activated: boolean, ship: Ship) => {
    if (ship.pos) {
      return;
    }
    if (activated) {
      setActiveShip(ship);
    } else {
      setActiveShip(null);
    }
  };

  // Place activeShip at position p in direction `dir`.
  const placeShip = (p: Point): void => {
    if (!activeShip) {
      return;
    }
    const placed = grid.placeShip(p, activeShip, dir);
    if (!placed) {
      return;
    }
    setActiveShip(null);
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
    grid.handlePlacementHover([r, c], enter, activeShip, dir);
    // setGrid(grid) doesn't actually do anything because `grid` hasn't changed.
    // Use the forcer to circumvent that.
    setForcer(1 - forcer);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'r') {
      grid.clearHover();
      const newDir = dir === Dir.Across ? Dir.Down : Dir.Across;
      if (mouseLoc && activeShip) {
        grid.handlePlacementHover(mouseLoc, true, activeShip, newDir);
      }
      setDir(newDir);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const reset = (): void => {
    setGrid(new Grid());
    setFleet(new Fleet());
  };

  const randomize = (): void => {
    const newFleet = new Fleet();
    setFleet(newFleet);
    setGrid(Grid.randomize(newFleet));
  };

  const playGame = (): void => {
    onSetup(grid, fleet);
  };

  const renderPlayButton = () => {
    if (fleet.ships.every((s) => s.pos)) {
      return (
        <button className="btn" onClick={playGame}>
          Play!
        </button>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>Ship Placement</h2>
      <p>
        Click on a ship to select it, then put it on the grid.
        Press <code>r</code> to rotate.
      </p>
      <p>
        Or, just click the "Randomize" button!
      </p>
      <div className={'SetupContainer'}>
        <div className={'SetupGrid'}>
          <GridView
            fleet={fleet}
            grid={grid}
            onMouseEnter={(r: number, c: number) => handleHover(r, c, true)}
            onMouseLeave={(r: number, c: number) => handleHover(r, c, false)}
            onClick={(r: number, c: number) => placeShip([r, c])}
          ></GridView>
        </div>
        <SetupFleet
          fleet={fleet}
          onClick={clickShip}
          activeShip={activeShip}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={'SetupButtons'}>
        <div>
          <button className="btn" onClick={reset}>
            Reset
          </button>
          <button className="btn" onClick={randomize}>
            Randomize
          </button>
        </div>
        <div>{renderPlayButton()}</div>
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
        dimIfPlaced={true}
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

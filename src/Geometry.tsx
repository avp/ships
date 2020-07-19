// @format

export type Point = [number, number];

export enum Dir {
  Across,
  Down,
}

export function applyDir([r, c]: [number, number], dir: Dir): [number, number] {
  switch (dir) {
    case Dir.Across:
      return [r, c + 1];
    case Dir.Down:
      return [r + 1, c];
  }
}

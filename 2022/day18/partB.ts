import { Coords, Cubes, parseInput, sides } from './partA';

type CubeMap = Map<string, boolean>;

const buildCubeMap = (cubes: Cubes): CubeMap => {
  const map = new Map() as CubeMap;
  const { x: minX, y: minY, z: minZ } = cubes.mins;
  const { x: maxX, y: maxY, z: maxZ } = cubes.maxs;
  for (let i = minX - 1; i <= maxX + 1; i++) {
    for (let j = minY - 1; j <= maxY + 1; j++) {
      for (let k = minZ - 1; k <= maxZ + 1; k++) {
        const loc = [i, j, k].join('-');
        if (cubes[loc]) {
          map.set(loc, true);
        } else {
          map.set(loc, false);
        }
      }
    }
  }
  return map;
};

const flood = (loc: Coords, map: CubeMap): void => {
  const coords = [loc.x, loc.y, loc.z].join('-');
  map.delete(coords);
  for (const side of sides) {
    const x = side[0] + loc.x;
    const y = side[1] + loc.y;
    const z = side[2] + loc.z;
    const xyz = [x, y, z].join('-');
    if (map.has(xyz) && map.get(xyz) === false) {
      flood({ x, y, z }, map);
    }
  }
};

const count = (cubes: Cubes, map: CubeMap): number => {
  let openSides = 0;
  for (const [key, cube] of Object.entries(cubes)) {
    if (key === 'mins' || key === 'maxs') continue;
    for (const side of sides) {
      const x = side[0] + cube.x;
      const y = side[1] + cube.y;
      const z = side[2] + cube.z;
      const xyz = [x, y, z].join('-');
      if (!map.has(xyz)) {
        openSides++;
      }
    }
  }
  return openSides;
};

const main = (input: string): number => {
  const cubes = parseInput(input);
  const map = buildCubeMap(cubes);
  flood(cubes.mins, map);
  return count(cubes, map);
};

export default function (input: string): number {
  console.log('\nDay 18: Boiling Boulders\nPart B');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}

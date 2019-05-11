const config = require('../config');
const SuraceBoundary = require('../TableSurface');
const Robot = require('../Robot');

describe('Robot', () => {
  let robot;
  const { dimension } = config.tableSurface;
  beforeEach(() => {
    robot = new Robot(config.robot, new SuraceBoundary(config.tableSurface));
  });
  it('should set correct initial position', () => {
    const expected = { x: undefined, y: undefined, face: undefined };
    expect(robot.getCurrentPosition).toEqual(expected);
  });
  it('should say "place me first to begin" at start', function() {
    expect(robot.report).toEqual('Place the robot before Report');
  });
  it('should return Error if place is outside the surface boundary', () => {
    expect(robot.place(7, 7, 'south')).toEqual(new Error(`Robot is placed outside boundary, should within x:${dimension.X} y:${dimension.X}`));
  });
  it('should return report', () => {
    robot.place(2, 4, 'south');
    expect(robot.report).toEqual('2,4,SOUTH');
  });
});
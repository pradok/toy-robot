const config = require('../config');
const SuraceBoundary = require('../TableSurface');
const Robot = require('../Robot');

describe('Robot', () => {
  let robot;
  beforeEach(() => {
    robot = new Robot(config.robot, new SuraceBoundary(config.tableSurface))
  });
  it('should set correct initial position', () => {
    const expected = {x: undefined, y: undefined, face: undefined};
    expect(robot.getCurrentPosition).toEqual(expected);
  });
  it('should say "place me first to begin" at start', function() {
    expect(robot.report).toEqual('Place the robot before Report');
  });
});
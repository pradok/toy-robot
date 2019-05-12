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
  it('should say ignore if place not executed at start', function() {
    expect(robot.report).toEqual(undefined);
  });
  it('should return Error for invalid face direction', () => {
    expect(robot.place(2, 3, 'some')).toEqual(
      new TypeError(
        'Incorrect Face direction, please provide one from: NORTH,EAST,SOUTH,WEST'
      )
    );
  });
  it('should return set to 0,0 if place is outside the surface boundary', () => {
    robot.place(7, 7, 'south');
    expect(robot.report).toEqual('0,0,SOUTH');
  });
  it('should return report', () => {
    robot.place(2, 4, 'south');
    expect(robot.report).toEqual('2,4,SOUTH');
  });

  describe('move()', () => {
    it('should do correct move in south facing direction', () => {
      robot.place(2, 2, 'south');
      robot.move();
      expect(robot.report).toEqual('2,1,SOUTH');
    });
    it('should do correct move in north facing direction', () => {
      robot.place(2, 3, 'north');
      robot.move();
      expect(robot.report).toEqual('2,4,NORTH');
    });
    it('should do correct move in east facing direction', () => {
      robot.place(2, 3, 'east');
      robot.move();
      expect(robot.report).toEqual('3,3,EAST');
    });
    it('should do correct move in west facing direction', () => {
      robot.place(2, 3, 'west');
      robot.move();
      expect(robot.report).toEqual('1,3,WEST');
    });
  });

  describe('right()', () => {
    it('right() should correctly change direction to east when facing north', () => {
      robot.place(2, 3, 'north');
      robot.right();
      expect(robot.report).toEqual('2,3,EAST');
    });
    it('right() should correctly change direction to south when facing east', () => {
      robot.place(2, 3, 'east');
      robot.right();
      expect(robot.report).toEqual('2,3,SOUTH');
    });
    it('right() should correctly change direction to west when facing south', () => {
      robot.place(2, 3, 'south');
      robot.right();
      expect(robot.report).toEqual('2,3,WEST');
    });
    it('right() should correctly change direction to north when facing west', () => {
      robot.place(2, 3, 'west');
      robot.right();
      expect(robot.report).toEqual('2,3,NORTH');
    });
  });

  describe('left()', () => {
    it('right() should correctly change direction to west when facing north', () => {
      robot.place(2, 3, 'north');
      robot.left();
      expect(robot.report).toEqual('2,3,WEST');
    });
    it('right() should correctly change direction to south when facing west', () => {
      robot.place(2, 3, 'west');
      robot.left();
      expect(robot.report).toEqual('2,3,SOUTH');
    });
    it('right() should correctly change direction to east when facing south', () => {
      robot.place(2, 3, 'south');
      robot.left();
      expect(robot.report).toEqual('2,3,EAST');
    });
    it('right() should correctly change direction to north when facing east', () => {
      robot.place(2, 3, 'east');
      robot.left();
      expect(robot.report).toEqual('2,3,NORTH');
    });
    it('left() should correctly increment x and change direction to north when facing east', () => {
      robot.place(2, 3, 'east');
      robot.move();
      robot.left();
      expect(robot.report).toEqual('3,3,NORTH');
    });
    it('left() should correctly change direction to north when facing east and move towards y', () => {
      robot.place(2, 3, 'east');
      robot.left();
      robot.move();
      expect(robot.report).toEqual('2,4,NORTH');
    });
  });
});

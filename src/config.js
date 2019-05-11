const config = {};

config.tableSurface = {
  start: {
    X: 0,
    Y: 0
  },
  dimension: {
    X: 5,
    Y: 5
  }
};
config.robot = {
  commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
  initialCommands: ['PLACE'],
  directions: ['NORTH', 'EAST', 'SOUTH', 'WEST']
};

module.exports = config;

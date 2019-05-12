const os = require('os');
const { stdin, stdout } = process;
const { EOL } = os;

const Robot = require('./src/Robot');
const config = require('./src/config');
const SuraceBoundary = require('./src/TableSurface');
const robot = new Robot(config.robot, new SuraceBoundary(config.tableSurface));

const CHAR_NEW_LINE = '> ';

// Read input from CLI
stdin.setEncoding('utf8');
stdin.on('data', function(data) {
  cliOut(data);
});

/**
 * Perform commands based on cli input
 *
 * @param  {String} input - command from a cli"
 * @return {Error|String|undefined}
 * - Error for invalid input.
 * - Current position coordinates from robot.report
 * - undefined implies other commands were executed successfully
 * @private
 */
const readCommand = input => {
  const command = input.toUpperCase().trim();
  if (command.startsWith('PLACE')) {
    const [x, y, face] = command.trim().substr('PLACE'.length).trim().replace(/\s/g, '').split(',');
    robot.place(x, y, face);
  } else if (command === 'MOVE') {
    robot.move();
  } else if (command === 'LEFT') {
    robot.left();
  } else if (command === 'RIGHT') {
    robot.right();
  } else if (command === 'REPORT') {
    return robot.report;
  } else {
    return new Error('Unknown command');
  }
};

/**
 * process stdout from cli input
 * @param data
 * @return {undefined} only sends to stdout
 */
const cliOut = data => {
  let out = readCommand(data);

  if (out instanceof Error) {
    stdout.write(`${out.message}${EOL}${CHAR_NEW_LINE}`);
  } else if (typeof out == 'string') {
    stdout.write(`${out}${EOL}${CHAR_NEW_LINE}`);
  } else {
    stdout.write(`${CHAR_NEW_LINE}`);
  }
};

const runToyRobot = () => {
  stdout.write(`Toy Robot Simulator, please start with placing Robot via "PLACE X, Y, F". Press Ctrl+C to exit${EOL}${CHAR_NEW_LINE}`);
  stdin.resume();
};

runToyRobot();

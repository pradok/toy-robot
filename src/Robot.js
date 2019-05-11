class Robot {

  /**
   *
   * @param config
   * @param surfaceBoundary
   */
  constructor(config, surfaceBoundary) {
    this.config = config;
    this.surfaceBoundary = surfaceBoundary;

    this.placeInitiated = false;
    this.currentPosition = {
      x: undefined,
      y: undefined,
      face: undefined
    };
  }

  /**
   * Validate Place inputs
   * @param x {number|string} x coordinate
   * @param y {number|string} y coordinate
   * @param f {String} Face direction, can be upper or lower case ('NORTH','EAST', 'SOUTH', 'WEST')
   * @returns {*} {Error|Robot}
   */
  place(x, y, f) {
    let placeInputs;
    try {
      placeInputs = this._validatePlaceInputs(x, y, f);
    } catch (error) {
      return error;
    }
    const { placeX, placeY, faceDirection } = placeInputs;
    if (this.surfaceBoundary.isOutOfBounds(placeX, placeY)) {
      const { x, y } = this.surfaceBoundary.dimension;
      return new Error(`Robot is placed outside boundary, should within x:${x} y:${y}`);
    }
    if (!this.placeInitiated) {
      this.placeInitiated = true;
    }
    this._updatePosition(placeX, placeY, faceDirection);
  }

  get getCurrentPosition () {
    return this.currentPosition;
  }

  get report () {
    const {x, y, face} = this.currentPosition;
    if (x === undefined && y === undefined && face === undefined) {
      return 'Place the robot before Report';
    }
    return `Robot's current position: ${x}, ${y}, ${face}`;
  }

  /**
   *
   * @param x {number|string} x coordinate
   * @param y {number|string} y coordinate
   * @param f {String} Face direction, can be upper or lower case ('NORTH','EAST', 'SOUTH', 'WEST')
   * @returns {{faceDirection: string, placeY: number, placeX: number}}
   * @private
   */
  _validatePlaceInputs(x, y, face) {
    if (!face) {
      throw new TypeError('Face direction not provided');
    }
    if (typeof face !== 'string') {
      throw new TypeError('Face direction should be a string');
    }

    const faceDirection = face.toUpperCase();
    const placeX = parseInt(x);
    const placeY = parseInt(y);

    if (isNaN(x) || isNaN(y)) {
      throw new TypeError('Invalid coordinates');
    }

    if (placeX < 0 || placeY < 0) {
      throw new TypeError('Negative coordinates not allowed');
    }

    if (!this.config.directions.find(f)) {
      throw new TypeError('Incorrect Face direction');
    }

    return {
      placeX,
      placeY,
      faceDirection
    };
  }

  /**
   *
   * @param x
   * @param y
   * @param face
   * @private
   */
  _updatePosition(x, y, face) {
    this.currentPosition.x = x;
    this.currentPosition.y = y;
    this.currentPosition.f = this.config.directions.indexOf(face);
  }

}

module.exports = Robot;

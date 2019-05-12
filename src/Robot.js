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

    let { placeX, placeY, faceDirection } = placeInputs;
    // Place to 0, 0 if set to outside boundary
    if (this.surfaceBoundary.isOutOfBounds(placeX, placeY)) {
      placeX = 0;
      placeY = 0;
    }
    this._updatePosition(placeX, placeY, faceDirection);
    if (!this.placeInitiated) {
      this.placeInitiated = true;
    }
  }

  get getCurrentPosition() {
    const { x, y, face } = this.currentPosition;
    return {
      x,
      y,
      face: this.config.directions[face]
    };
  }

  get report() {
    const { x, y, face } = this.getCurrentPosition;
    // Ignore if not placed on surface
    if (x === undefined && y === undefined && face === undefined) {
      return;
    }
    return `${x},${y},${face}`;
  }

  /**
   * Change direction to left based on the numerical representation of face direction.
   */
  left() {
    // Ignore right if not placed on table
    if (!this.placeInitiated) {
      return;
    }
    this.currentPosition.face = (this.currentPosition.face - 1) < 0 ? 3 : this.currentPosition.face - 1;
  }

  /**
   * Change direction to right based on the numerical representation of face direction.
   */
  right() {
    // Ignore right if not placed on table
    if (!this.placeInitiated) {
      return;
    }
    this.currentPosition.face = (this.currentPosition.face + 1) > 3 ? 0 : this.currentPosition.face + 1;
  }

  /**
   * Move the robot one step
   * Ignore if moving out of bounds so it remains within surface boundary
   */
  move() {
    // Ignore move if not placed on surface.
    if (!this.placeInitiated) {
      return;
    }
    let { x, y, face } = this.currentPosition;

    // Increment x and y based on numerical representation of the face direction
    switch (face) {
      case 0: // North
        y++;
        break;
      case 1: // East
        x++;
        break;
      case 2: // South
        y--;
        break;
      case 3: // West
        x--;
        break;
    }

    // Ignore if falling outside boundary
    if (this.surfaceBoundary.isOutOfBounds(x, y)) {
      return;
    }
    this._updatePosition(x, y, this.config.directions[face]);
  }

  /**
   *
   * @param x {number|string} x coordinate
   * @param y {number|string} y coordinate
   * @param face {String} Face direction, can be upper or lower case ('NORTH', 'SOUTH', 'EAST', 'WEST')
   * @returns {{faceDirection: string, placeY: number, placeX: number}}
   * @private
   */
  _validatePlaceInputs(x, y, face) {
    const placeX = parseInt(x);
    const placeY = parseInt(y);

    if (isNaN(x) || isNaN(y)) {
      throw new TypeError('Invalid coordinates');
    }
    if (placeX < 0 || placeY < 0) {
      throw new TypeError('Negative coordinates not allowed');
    }

    if (!face) {
      throw new Error('Face direction not provided');
    }
    if (typeof face !== 'string') {
      throw new TypeError('Face direction should be a string');
    }

    const faceDirection = face.toUpperCase();

    if (!this.config.directions.find(direction => direction === faceDirection)) {
      throw new TypeError(`Incorrect Face direction, please provide one from: ${this.config.directions}`);
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
    this.currentPosition.face = this.config.directions.indexOf(face);
  }

}

module.exports = Robot;

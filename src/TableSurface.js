class TableSurface {
  constructor(config) {
    this.config = config;
  }
  /**
   *
   * @param x - coordinate x
   * @param y - coordinate y
   * @returns {boolean}
   */
  isOutOfBounds(x, y) {
    return (
      x > this.config.start.X + (this.config.dimension.X - 1) ||
      x < this.config.start.X ||
      y > this.config.start.Y + (this.config.dimension.Y - 1) ||
      y < this.config.start.X
    );
  }
  get dimension() {
    return {
      x: this.config.dimension.X,
      y: this.config.dimension.Y
    };
  }
}

module.exports = TableSurface;

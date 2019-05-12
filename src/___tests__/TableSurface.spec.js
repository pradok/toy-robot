const config = require('../config');
const TableSurface = require('../TableSurface');

describe('TableSurface', () => {
  let tableSurface;
  beforeEach(() => {
    tableSurface = new TableSurface(config.tableSurface);
  });
  it('should return isOutofBounds() to true for y less than the tableSurface minimum Y dimension', () => {
    expect(tableSurface.isOutOfBounds(3, -1)).toEqual(true);
  });
  it('should return isOutofBounds() to true for y more than the tableSurface maximum Y dimension', () => {
    expect(tableSurface.isOutOfBounds(3, 5)).toEqual(true);
  });
  it('should return isOutofBounds() to true for x less than the tableSurface minimum X dimension', () => {
    expect(tableSurface.isOutOfBounds(-1, 4)).toEqual(true);
  });
  it('should return isOutofBounds() to true for y more than the tableSurface maximum X dimension', () => {
    expect(tableSurface.isOutOfBounds(5, 4)).toEqual(true);
  });
  it('should return isOutofBounds() to false for x and y within the tableSurface dimensions', () => {
    expect(tableSurface.isOutOfBounds(3, 2)).toEqual(false);
  });
  it('should return isOutofBounds() to true for x and y beyond the tableSurface dimensions', () => {
    expect(tableSurface.isOutOfBounds(5, 5)).toEqual(true);
  });
  it('should return isOutofBounds() to true for x and y in negative', () => {
    expect(tableSurface.isOutOfBounds(-1, -1)).toEqual(true);
  });
});

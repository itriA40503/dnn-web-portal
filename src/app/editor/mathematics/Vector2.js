
export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toList() {
    return [x, y];
  }

  static divideByScalar(vector, scalar) {
    return new Vector2(vector.x / scalar, vector.y / scalar);
  }

  static multiplyByScalar(vector, scalar) {
    return new Vector2(vector.x * scalar, vector.y * scalar);
  }

  static plusByScalar(vector) {
    return new Vector2(vector.x + scalar, vector.y + scalar);
  }

  static minusByScalar(vector) {
    return new Vector2(vector.x - scalar, vector.y - scalar);
  }

  static plus(vectorA, vectorB) {
    return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
  }

  static minus(vectorA, vectorB) {
    return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
  }

  static dot(vectorA, vectorB) {
    return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
  }

  static euclidean(vectorA, vectorB) {
    return Math.sqrt(Math.pow(vectorB.x - vectorA.x, 2) + Math.pow(vectorB.y - vectorA.y, 2));
  }

  static equal(vectorA, vectorB) {
    return (vectorA.x === vectorB.x && vectorA.y === vectorB.y);
  }
}
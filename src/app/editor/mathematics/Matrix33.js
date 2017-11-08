
import { Vector3 } from './Vector3';

export class Matrix33 {
  constructor() {
    this.data = [
      new Vector3(1, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 0, 1)];
  }

  rows() {
    return 3;
  }

  cols() {
    return 3;
  }

  atRow(rdx) {
    return this.data[rdx];
  }

  atCol(cdx) {
    return this.transpose().atRow(cdx);
  }

  transpose() {
    let tdata = [];

    for(let cr in [0, 1, 2]) {
      tdata.push(new Vector3(this.data[0][cr], this.data[1][cr], this.data[2][cr]));
    }

    let tmat = new Matrix33();
    tmat.data = tdata;

    return tmat;
  }

  clone() {

  }

  static plus(matrixA, matrixB) {

    let matrixC = matrixA.clone();

    for (let cr in [0, 1, 2]) {
      matrixC[cr] = matrixC[cr] + matrixB[cr];
    }

    return matrixC;
  }

  static minus(matrixA, matrixB) {

  }

  static multiply(matrixA, matrixB) {

  }

  static rotation(xdeg, ydeg) {

  }

  static translation(xtrs, ytrs) {

  }
  
  static scaling(xscl, yscl) {

  }
}
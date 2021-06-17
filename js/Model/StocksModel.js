class StocksModel {
  constructor(name, total, value, lastChange, distribution) {
    this._stockName = name;
    this._stockTotal = total;
    this._stockValue = value;
    this._stockChange = lastChange;
    this._stockDist = distribution;
  }

  get stockName() {
    return this._stockName;
  }
  get stockTotal() {
    return this._stockTotal;
  }
  get stockValue() {
    return this._stockValue;
  }
  get stockChange() {
    return this._stockChange;
  }
  get stockDist() {
    return this._stockDist;
  }
}

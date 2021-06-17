// import { GoogleChartComponent } from "./ChartComponent.js";

class GraficoController {
  constructor() {
    this._stocks = document.querySelectorAll(".acoes-item");
    this._model = new StocksModel();
    this._totalStock = 0;
    this._pizza = document.getElementById("grafico-pizza");
  }

  getInfos() {
    let stocks = [];
    let totalStocks = 0;
    this._stocks.forEach((stock) => {
      let model = new StocksModel(
        stock.childNodes.item(1).textContent,
        parseFloat(stock.childNodes.item(3).textContent),
        stock.childNodes.item(5).textContent,
        stock.childNodes.item(7).textContent,
        stock.childNodes.item(9).textContent
      );
      totalStocks += model.stockTotal;
      stocks.push(model);
    });
    this._totalStock = totalStocks;
    this.setPercentage();
    return stocks;
  }

  setPercentage() {
    this._stocks.forEach((stock) => {
      stock.childNodes.item(9).textContent = this.calcPercentage(
        parseFloat(stock.childNodes.item(3).textContent),
        this._totalStock
      ).toFixed(2);
    });
  }

  calcPercentage(valor1, valor2) {
    return (valor1 * 100) / valor2;
  }

  async buscaArqTrataDados(input) {
    const fileUrl = `./arq/${input}.txt`;
    let array1 = [];
    let array2 = [];
    const f = await fetch(fileUrl);
    const t = await f.text();
    t.split("\n").forEach((item) => {
      array1.push(item);
    });
    array1.forEach((dado) => {
      let a = dado.split(",");
      array2.push([a[0], parseFloat(a[4])]);
    });
    return array2;
  }

  async setAlteração() {
    for (let i = 0; this._stocks.length >= i; i++) {
      if (this._stocks[i] !== undefined) {
        let a = await this.buscaArqTrataDados(
          this._stocks[i].childNodes.item(1).textContent
        );
        this._stocks[i].childNodes.item(7).textContent = (
          this.calcPercentage(
            a[0][1],
            this._stocks[i].childNodes.item(5).textContent
          ) - 100
        ).toFixed(2);
        this.setNegativeColor(this._stocks[i].childNodes.item(7));
      }
    }
  }

  setNegativeColor(item) {
    if (Math.sign(parseFloat(item.textContent)) < 0) {
      item.classList.add("negative");
    } else {
      item.classList.add("positive");
    }
  }
}

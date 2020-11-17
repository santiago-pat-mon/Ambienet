import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  ls: SecureLS
  rol: string
  rgba = []

  barData = [
    {
      num: 2,
      nam: "dos",
    },
    {
      num: 5,
      nam: "hola",
    },
    {
      num: 3,
      nam: "mundo",
    },
    {
      num: 6,
      nam: "hi",
    },
    {
      num: 3,
      nam: "for",
    },
  ]

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
          weight: "bold"
        },
        color: "black",
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {
      data: [12, 14, 14],
      label: "TOTAL",
      backgroundColor: [],
      borderColor: [],
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.startVariables()
    this.loadData()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  loadData() {
    /* me llegan los datos */
    this.barData.forEach(element => {
      this.barChartData[0].data.push(element.num)
      this.barChartLabels.push(element.nam)
      this.rgba.push(this.rgbaColor())
    });

    this.barChartData[0].backgroundColor = this.rgba

  }

  rgbaColor() {
    let color =
      "(" +
      this.generarNumero(255) +
      "," +
      this.generarNumero(255) +
      "," +
      this.generarNumero(255) +
      "," +
      "0.8" +
      ")"
    return "rgba" + color
  }
  generarNumero(numero) {
    return (Math.random() * numero).toFixed(0)
  }

}

import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ViewpostService } from 'src/app/service/viewpost.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  rgba = []
  graphicsData = []
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
      data: [],
      label: "TOTAL",
      backgroundColor: [],
      borderColor: [],
    },
  ];

  /* Component constructor */
  constructor(
    private viewPostService: ViewpostService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.loadData()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  /* Method in charge of loading the posts */
  loadData() {
    this.viewPostService.getPosts().subscribe(
      p => {
        console.log(p.results)
        this.graphicsData = p.results !== undefined ? p.results : []
      },
      e => { console.log(e) },
      () => {
        this.graphicsData.forEach(element => {
          this.barChartData[0].data.push(element.validator_number)
          this.barChartLabels.push(element.title)
          this.rgba.push(this.rgbaColor())
        });

        this.barChartData[0].backgroundColor = this.rgba
        console.log("Gráfica mostrada")
      }
    )
  }

  /* Method in charge of generating random rbg */
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

  /* Method responsible for generating random number */
  generarNumero(numero) {
    return (Math.random() * numero).toFixed(0)
  }

}

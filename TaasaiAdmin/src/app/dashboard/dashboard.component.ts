import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  doughnutChartLabels = ['Completed', "Cancelled",'Driver Unavailable'];
  doughnutChartData = [0,0,0];
  doughnutChartType = 'doughnut';

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Completed' },
    { data: [], label: 'Cancelled' },
    { data: [], label: 'Driver Unavailable' }
  ];

  constructor(private dataService:DataService) { }
  countData:any
  ngOnInit() {
    this.dataService.getDataCount().subscribe((result:any)=>{
      this.countData = result
      var data =[]
      data.push(result.RideStatusCount.CompletedCount)
      data.push(result.RideStatusCount.CancelledCount)
      data.push(result.RideStatusCount.DriverUnavailableCount)

      this.doughnutChartData = data
      var labels = []
      var completedData = []
      var noDriverData = []
      var cancelledData = []
      result.WeeklyReport.forEach(item => {
        if(!labels.includes(item.Date)){
          labels.push(item.Date)
        }
      });
      var count = 0;
      labels.forEach(item => {
        var completed = 0;
        var noDriver = 0;
        var cancelled = 0;
        result.WeeklyReport.forEach(element => {
          if(element.Date == item){
              if(element.RideStatus==4){
                completed = element.Count
              } else if (element.RideStatus == 5) {
                noDriver = element.Count
              } else if (element.RideStatus == 6) {
                cancelled = element.Count
              }
          }
          
        });
        completedData.push(completed)
        noDriverData.push(noDriver)
        cancelledData.push(cancelled)
      });
      
      this.barChartLabels = labels
      this.barChartData[0].data = completedData
      this.barChartData[2].data = noDriverData
      this.barChartData[1].data = cancelledData
      console.log(this.barChartData)
    })
  }

}

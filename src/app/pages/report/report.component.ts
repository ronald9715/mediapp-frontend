import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Chart, ChartType } from 'chart.js/auto';
import { ConsultService } from 'src/app/service/consult.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  chart: Chart
  type: ChartType = 'line'
  barType: ChartType = 'bar'
  doughnutType: ChartType = 'doughnut'
  radarType: ChartType = 'radar'
  pieType: ChartType = 'pie'
  pdfSrc:string
  filename: string
  selectedFile: FileList
  imageData:any

  constructor(
    private consultService: ConsultService,
    private sanitizer: DomSanitizer
  ){}
  ngOnInit(): void {
    this.draw();

    this.consultService.readFile(1).subscribe(data=>{
      //this.imageData = window.URL.createObjectURL(data);

      //Base 64
      this.convertToBase64(data);
    })
  }
  convertToBase64(data: any){
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () =>{
      const base64 = reader.result;
      //console.log(base64)
      //this.imageData = base64;
      this.applySanitizer(base64);
    }
  }

  applySanitizer(data: any){
    this.imageData = this.sanitizer.bypassSecurityTrustResourceUrl(data)
  }
  change(type:string){
    switch(type){
      case 'bar':
            this.type = this.barType;
            break;
      case 'doughnut':
            this.type = this.doughnutType
            break;
      case 'radar':
            this.type = this.radarType;
            break;
      case 'pie':
            this.type = this.pieType;
            break;
      default:
            this.type = 'line';
            break;

    }

    if(this.change != null){
      this.chart.destroy();
    }
    this.draw();
  }

  draw(){
    this.consultService.callProcedureOrFunction().subscribe(data=>{
      const dates = data.map(x=> x.consultDate);
      const quantities = data.map(x=> x.quantity);
      //console.log(dates);
      //console.log(quantities);

      this.chart = new Chart('canvas', {
        type: this.type,
        data: {
          labels: dates,
          datasets:[
            {
              label: 'Quantity',
              data: quantities,
              borderColor: '#3cba9f',
              fill: false,
              backgroundColor:[
                'rgba(255,99,132,0.2)',
                'rgba(54,162,235,0.2)',
                'rgba(255,206,86,0.2)',
                'rgba(75,192,192,0.2)',
                'rgba(153,102,0,0.2)',
                'rgba(255,159,64,0.2)'
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales:{
            x:{
              display: true
            },
            y:{
              display: true,
              beginAtZero: true
            }
          }
        }
      })
    })
  }
  viewReport(){
    this.consultService.generateReport2().subscribe(data=>{
      this.pdfSrc = window.URL.createObjectURL(data);
      window.open(this.pdfSrc, '_blank');
    })
  }

  downloadReport(){
    this.consultService.generateReport().subscribe(data=>
      {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        //a.setAttribute('style','display:none');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'report.pdf';
        a.click();
      })
  }

  selectFile(e:any){
    console.log(e);
    this.filename = e.target.files[0]?.name;
    this.selectedFile = e.target.files;
    console.log(e.target.files.item(0));
  }

  upload(){
    if (this.selectedFile.item(0)!= null) {
      this.consultService.saveFile(this.selectedFile.item(0)).subscribe();
    }
  }

}

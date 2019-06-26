import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  text: string;
  information: any[];
  automaticClose = false;
  money_tab = [
    'EUR',
    'BGN',
    'NZD',
    'ILS',
    'RUB',
    'CAD',
    'USD',
    'PHP',
    'CHF',
    'ZAR',
    'AUD',
    'JPY',
    'TRY',
    'HKD',
    'MYR',
    'THB',
    'HRK',
    'NOK',
    'IDR',
    'DKK',
    'CZK',
    'HUF',
    'GBP',
    'MXN',
    'KRW',
    'ISK',
    'SGD',
    'BRL',
    'PLN',
    'INR',
    'RON',
    'CNY',
    'SEK'];
    Money_first = 'EUR';
    Money_second = 'USD';
    hideMe = true;
    hideMe_1 = false;
    hideMe_2 = false;
    

  constructor(private http: HttpClient){

      this.http.get('https://api.exchangeratesapi.io/latest').subscribe(res =>{
      this.information = res['rates'];
      //console.log(this.information["BGN"]);
      // for(var i = 0;i<3;i++)
      // {
      //   console.log(this.information['BGN']);
      // }
      //console.log(res);
      for (let entry of this.money_tab) {
        console.log(this.information[entry]); // 1, "string", false
      }
      this.course = this.information[this.Money_second];
      //this.information[0].open = true;
      //console.log(this.information[0]);
      });


      //console.log(this.http.get('https://api.exchangeratesapi.io/latest'));

      // for (let i = 0; i < 1000; i++) {
      //   this.data1.push(this.randomData());
      // }


  }
//
  oldvalue: number = 0;
  course = 2.44;
  resolts = 0;
  toggleSection_1(index)
  {
    
    this.http.get('https://api.exchangeratesapi.io/latest?base='+index).subscribe(res =>{
      this.information = res['rates'];
      console.log(res);
      this.Money_first = index;
      this.course = this.information[this.Money_second];  
    });
    this.hideMe_1 = !this.hideMe_1;
    
   // console.log(index);
  }

  toggleSection_2(index)
  {
    this.Money_second = index;
    this.course = this.information[this.Money_second];
    this.hideMe_2 = !this.hideMe_2;
  }

  toggleItem(index, childIndex)
  {
    //this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;

  }



  onChangeText() {
    this.text = 'Changed!';

  }
  hide_1() {
    this.hideMe_1 = !this.hideMe_1;
  }
  hide_2() {
    this.hideMe_2 = !this.hideMe_2;
  }
  Getvalue() {
    this.resolts = this.oldvalue * this.course;
  }

// charts
private static oneDay = 24 * 3600 * 1000;

  data1: any = [];
  updateOptions1: any;
  options1 = {
    title: {
      text: 'Wykres'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        const date = new Date(params.name);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: 'Sumulation Data',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: this.data1
    }]
  };
  private now = new Date(2017, 9, 3);
  private value = Math.random() * 1000;
  private randomDataInterval;

//
  ionViewWillEnter() {


    // this.randomDataInterval = setInterval(() => {
    //   for (let i = 0; i < 5; i++) {
    //     this.data1.shift();
    //     this.data1.push(this.randomData());
    //   }

    //   this.updateOptions1 = {
    //     series: [{
    //       data: this.data1
    //     }]
    //   };
    // }, 1000);
  }
//
  ionViewWillLeave() {
    clearInterval(this.randomDataInterval);
  }

  rates1 = []
  rates2 = []

  private randomData(): object {

    this.now = new Date(+this.now + Tab1Page.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }


}

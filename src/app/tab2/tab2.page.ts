import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  url = 'https://api.exchangeratesapi.io/history?start_at=2019-05-15&end_at=2019-05-22&base=';
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
    hideMe_3 = false;
    rates: any [] ;
 
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
 
      this.http.get('https://api.exchangeratesapi.io/history?start_at=2019-05-15&end_at=2019-05-22&base=USD&symbols=PLN').subscribe(res =>{
        this.rates = res['rates'];
         //console.log("TUTAJ!!!!!")
         // console.log(res);
         console.log(this.rates);
 
         //console.log("Tutaj0");
 
         let p = new Map<string, string>();
         let parameters = Object.keys(this.rates);
        //  parameters.sort(function(key)=>{
        //      ordered[key] = unordered[key];
        //    });
        let lista = [];
         
         parameters.forEach(key=>{
         lista.push(key);
 
         });
 
 
lista.sort();
 
  //  p.forEach(key => {
  //    //console.log("Tutaj1");
  //    let k = new Date(key);
  //    let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
  //    //let k = JSON.stringify(key);
  //    //console.log("Tutaj2");
  //    let v = this.rates[key].PLN;
 
  //    this.data1.push(this.dosome(k,k2,v));
         
  //      });
 
 
       lista.forEach(key =>{
        let k = new Date(key);
        let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
        //let k = JSON.stringify(key);
        //console.log("Tutaj2");
        let v = this.rates[key].PLN;
   
        this.data1.push(this.dosome(k,k2,v));
       })
});
 
      // for (let i = 0; i < 1000; i++) {
      //   this.data1.push(this.dosome("date"+i,i));
     
 
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
  

  toggleSection_3(index)
  {
    this.Money_second = index;
    this.hideMe_3 = !this.hideMe_3;
    this.http.get(this.url+this.Money_second+'&symbols=PLN').subscribe(res =>{
      this.rates = res['rates'];
       console.log("przeladowuje")
       // console.log(res);
       console.log(this.rates);
       this.data1 = [];
       //console.log("Tutaj0");

       let p = new Map<string, string>();
       let parameters = Object.keys(this.rates);
      //  parameters.sort(function(key)=>{
      //      ordered[key] = unordered[key];
      //    });
      let lista = [];
       
       parameters.forEach(key=>{
       lista.push(key);

       });

       lista.sort();

       lista.forEach(key =>{
        let k = new Date(key);
        let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
        //let k = JSON.stringify(key);
        //console.log("Tutaj2");
       // let v = this.rates[key].PLN;
        let v2 = Object.keys(this.rates[key])[0];
        let v3 = this.rates[key][v2];
        this.data1.push(this.dosome(k,k2,v3));
       })
});
this.ionViewWillEnter();
  }
  toggleItem(index, childIndex)
  {
    //this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
 
  }
 
 
 
  hide_1() {
    this.hideMe_1 = !this.hideMe_1;
  }
  hide_2() {
    this.hideMe_2 = !this.hideMe_2;
  }
  hide_3() {
    this.hideMe_3 = !this.hideMe_3;

  }
  show_1() {
    this.url = 'https://api.exchangeratesapi.io/history?start_at=2019-05-15&end_at=2019-05-22&base=';
    this.http.get(this.url+this.Money_second+'&symbols=PLN').subscribe(res =>{
      this.rates = res['rates'];
       console.log("przeladowuje")
       // console.log(res);
       console.log(this.rates);
       this.data1 = [];
       //console.log("Tutaj0");

       let p = new Map<string, string>();
       let parameters = Object.keys(this.rates);
      //  parameters.sort(function(key)=>{
      //      ordered[key] = unordered[key];
      //    });
      let lista = [];
       
       parameters.forEach(key=>{
       lista.push(key);

       });

       lista.sort();

       lista.forEach(key =>{
        let k = new Date(key);
        let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
        //let k = JSON.stringify(key);
        //console.log("Tutaj2");
       // let v = this.rates[key].PLN;
        let v2 = Object.keys(this.rates[key])[0];
        let v3 = this.rates[key][v2];
        this.data1.push(this.dosome(k,k2,v3));
       })
});
this.ionViewWillEnter();
  }
  show_2() {
    this.url = 'https://api.exchangeratesapi.io/history?start_at=2019-04-22&end_at=2019-05-22&base=';
    this.http.get(this.url+this.Money_second+'&symbols=PLN').subscribe(res =>{
      this.rates = res['rates'];
       console.log("przeladowuje")
       // console.log(res);
       console.log(this.rates);
       this.data1 = [];
       //console.log("Tutaj0");

       let p = new Map<string, string>();
       let parameters = Object.keys(this.rates);
      //  parameters.sort(function(key)=>{
      //      ordered[key] = unordered[key];
      //    });
      let lista = [];
       
       parameters.forEach(key=>{
       lista.push(key);

       });

       lista.sort();

       lista.forEach(key =>{
        let k = new Date(key);
        let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
        //let k = JSON.stringify(key);
        //console.log("Tutaj2");
       // let v = this.rates[key].PLN;
        let v2 = Object.keys(this.rates[key])[0];
        let v3 = this.rates[key][v2];
        this.data1.push(this.dosome(k,k2,v3));
       })
});
this.ionViewWillEnter();
  }
  show_3() {
    this.url = 'https://api.exchangeratesapi.io/history?start_at=2018-05-15&end_at=2019-05-22&base=';
    this.http.get(this.url+this.Money_second+'&symbols=PLN').subscribe(res =>{
      this.rates = res['rates'];
       console.log("przeladowuje")
       // console.log(res);
       console.log(this.rates);
       this.data1 = [];
       //console.log("Tutaj0");

       let p = new Map<string, string>();
       let parameters = Object.keys(this.rates);
      //  parameters.sort(function(key)=>{
      //      ordered[key] = unordered[key];
      //    });
      let lista = [];
       
       parameters.forEach(key=>{
       lista.push(key);

       });

       lista.sort();

       lista.forEach(key =>{
        let k = new Date(key);
        let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
        //let k = JSON.stringify(key);
        //console.log("Tutaj2");
       // let v = this.rates[key].PLN;
        let v2 = Object.keys(this.rates[key])[0];
        let v3 = this.rates[key][v2];
        this.data1.push(this.dosome(k,k2,v3));
       })
});
this.ionViewWillEnter();
  }
  Getvalue() {
    this.resolts = this.oldvalue * this.course;
  }
 
 
 
// events
public chartClicked(e:any):void {
  console.log(e);
}
 
public chartHovered(e:any):void {
  console.log(e);
}
 
// charts
private static oneDay = 24 * 3600 * 1000;
 
  data1: any = [];
  updateOptions1: any;
  options1 = {
    title: {
      text: 'Wykres ' + this.Money_second
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
 
      this.updateOptions1 = {
        title: {
          text: 'Wykres ' + this.Money_second
        },
        series: [{
          data: this.data1
        }]
      };
    // }, 1000);
  }
//
  ionViewWillLeave() {
    clearInterval(this.randomDataInterval);
  }
 
  rates1 = []
  rates2 = []
private dosome(k: Date ,d: string, v: number): object{
 
  //let k2 = [k.getFullYear(), k.getMonth() + 1, k.getDate()].join('/');
  // let parameters = new Map<string, string>();
  // Object.keys(this.rates).forEach(key => {
  //   console.log(key);
  //   console.log(this.rates[key].PLN);
  //   // this.data1.push(key,rates[key].PLN);
  //   // this.data1.push({
  //   //   name: key,
  //   //   value: [rates[key].PLN]
  //   // })
  //   this.now = new Date(+this.now + Tab2Page.oneDay);
  //   this.value = this.value + Math.random() * 21 - 10;
  //   this.data1.push( {
  //     name: this.now.toString(),
  //     value: [
  //       [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
  //       Math.round(this.value)
  //     ]
  //   });
  //   console.log(this.data1[0]);
// });
        // for (let i = 0; i < 1000; i++) {
        // this.data1.push(this.randomData());
 
        this.now = new Date(+this.now + Tab2Page.oneDay);
        this.value = this.value + Math.random() * 21 - 10;


        return {
          name: k.toString(),
          value: [
            k,
            v
          ]
        };
        //this.data1.push( x);
      }
 
 
 
 
 
  private randomData(): object {
 
    this.now = new Date(+this.now + Tab2Page.oneDay);
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
//
//
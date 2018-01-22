import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  date:any;
  daysInThisMonth:any;
  daysInPrevMonth:any;
  daysInNextMonth:any;
  monthNames: string[];

  currentDay:any;
  currentMonth:any;
  currentYear:any;

  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
  }

  getDaysOfMonth(){
    this.daysInThisMonth = new Array();
    this.daysInPrevMonth = new Array();
    this.daysInNextMonth = new Array();

    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()){
      this.currentDay = new Date().getDate();
    } else {
      this.currentDay = 999;
    }
    var firstDateThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
      
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDateThisMonth - 1); i <= prevNumOfDays; i++){
      this.daysInPrevMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++){
      this.daysInThisMonth.push(i+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for(var i = 0; i < (6-lastDayThisMonth); i++){
      this.daysInNextMonth.push(i+1);
    }

    var totalDays = this.daysInNextMonth.length + this.daysInPrevMonth.length + this.daysInThisMonth.length;
    if (totalDays < 36){
      for(var i = (7-lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++){
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToPrevMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

}

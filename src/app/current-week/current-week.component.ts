import { Component, OnInit } from '@angular/core';
import { DaeService } from '../dae.service';
import { LocalStorageService } from '../local-storage.service';
import { ActiveUserService } from '../active-user.service';
import { User } from '../_models/user.model';
import { Timesheet } from '../_models/timesheet.model';
import { Timetrack } from '../_models/timetrack.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-week',
  templateUrl: './current-week.component.html',
  styleUrls: ['./current-week.component.css']
})
export class CurrentWeekComponent implements OnInit {



  constructor(public date: DaeService, public currUser: ActiveUserService, public datePipe: DatePipe) {
    
  }
  public monday = getMonday();
  public day = this.monday.getDate();
  public month = this.monday.getMonth() + 1;
  public months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  public year = this.monday.getFullYear();

  public curr: User = this.currUser.getActiveStorage();
  public timesheets: Timesheet[] = this.curr.timesheets;
  public currentTS: Timesheet = this.curr.timesheets[this.curr.timesheets.length - 1];

  getWeekTS(day: number, month: number, year: number, ts: Timesheet[]): Timesheet[] {
    var temp: Timesheet[] = [];
    for(let x = 0; x < ts.length; x++) {
      let tot = ts.length;
      let currTS = ts[tot - x - 1];
      if (currTS.year >= year) {
        console.log(currTS.year);
        console.log(year);
        if (currTS.month >= month) {
          console.log(currTS.month);
          console.log(month);
          if (currTS.day >= day) {
            console.log(currTS.day);
            console.log(day);
            temp.push(currTS);
          }
        }
      }
    }

    return temp;
  }
  
  public weekTS: Timesheet[] = this.getWeekTS(this.day, this.month, this.year, this.timesheets);

  ngOnInit(): void {
  }

  precision(x: number) {
    return precise(x);
  }

}

function precise(x: number) {
  return x.toPrecision(4);
}

function getMonday() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;

  const monday = new Date(today.setDate(first));
  return monday;
}
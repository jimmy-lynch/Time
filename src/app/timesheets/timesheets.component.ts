import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Timesheet } from '../_models/timesheet.model';
import { User } from '../_models/user.model';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {

  constructor(private currUser: ActiveUserService) { }
  selectedLevel!: Timesheet;
  public curr: User = this.currUser.getActiveStorage();

  public timesheets: Timesheet[] = this.curr.timesheets;


  total_day(y: Timesheet): string {
    if (y == null) {
      return "";
    } else {
      var i = 0;
        for(let x = 0; x < y.time.length; x++) {
          i += y.time[x].hours;
        }
        return precise(i); 
    }
  }

  daysselect = new FormControl<Timesheet | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  public months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  ngOnInit(): void {
  }

}

function precise(x: number) {
  return x.toPrecision(4);
}

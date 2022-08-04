import { Component, OnInit } from '@angular/core';
import { DaeService } from '../dae.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActiveUserService } from '../active-user.service';
import { UserService } from '../user.service';
import { User } from '../_models/user.model';
import { Timesheet } from '../_models/timesheet.model';
import { Timetrack } from '../_models/timetrack.model';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public welcome_msg: String[] = [
    "It's about time!",
    "Work is stressful, putting in your hours to get $$, isn't.",
    "Time = Money, Money = Food, Food = <3",
    "Don't annoy the clock, it might tick off...",
    "What do you call a smart clock?",
    "Your boss told me to remind you to submit your hours!",
    "Remember, potty breaks count towards your hours!",
    "Haven't seen you in a while...",
    "Working hard... or hardly working?"
  ];
  public i = Math.floor(this.welcome_msg.length * Math.random()); 
  public msg = this.welcome_msg[this.i];

  constructor(private date: DaeService, public dialog: MatDialog, private currUser: ActiveUserService) {
  }

  public today = this.date.getDate();

  addTime(): void {
    const dialogRef = this.dialog.open(addTimeModal, {
      width: '450px',
      height: '280px'
    });
  }
  
  public curr: User = this.currUser.getActiveStorage();
  public currentTS: Timesheet = this.curr.timesheets[this.curr.timesheets.length - 1];
  public currTsTt: Timetrack[] = this.currentTS.time;
  

  total(): number {
    if(this.currentTS.day != this.date.getDay() || this.currentTS.month != this.date.getMonth() || this.currentTS.year != this.date.getYear()) {
      return 0;
    } else {
      var i = 0;
      for(let x = 0; x < this.currentTS.time.length; x++) {
        i += this.currentTS.time[x].hours;
      }
      return i; 
    }
  }


  public tot: string = precise(this.total());
  public timesheets: Timesheet[] = this.curr.timesheets;

  ngOnInit(): void {
  }

  precision(x: number) {
    return precise(x);
  }

}

function precise(x: number) {
  return x.toPrecision(4);
}


@Component({
  selector: 'addTime',
  templateUrl: 'addTime.html',
  styleUrls: ['addTime.css'],
})

export class addTimeModal {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<addTimeModal>, private date: DaeService, private currUser: ActiveUserService) {}

  public today = this.date.getDate();

  timeSub = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required, validTime(), Validators.required]) //make only submittable in 00:00
    //get date when adding from the dae service
  })

  get subject() {
    return this.timeSub.get('subject');
  }

  get time() {
    return this.timeSub.get('time');
  }
  subTime() {
    const subject: string = this.timeSub.get('subject')?.value ?? '';
    var time: string =  this.timeSub.get('time')?.value ?? '';

    var hours: number = +time.substring(0, 2);
    var minutes: number = +time.substring(3,5);
    minutes = minutes / 60;
    hours += minutes;
    
    var timesheet: Timesheet = new Timesheet(this.date.getMonth(), this.date.getDay(), this.date.getYear());
    var times: Timetrack = new Timetrack(subject, hours);


    var active: User = this.currUser.getActiveStorage();
    if (active.timesheets.length == 0) {
      active.timesheets.push(timesheet);
      active.timesheets[0].time.push(times);
      this.currUser.updateActive(active);
    } else {
      //finding the correct date to add the timetrack too
      var found = false;
        for(let x = 0; x < active.timesheets.length; x++) {
            if (active.timesheets[x].year == this.date.getYear() && active.timesheets[x].month == this.date.getMonth() && active.timesheets[x].day == this.date.getDay()) {
              active.timesheets[x].time.push(times)
              this.currUser.updateActive(active);
              var found = true;
              break;
            }
        }
      if (found == false) {
        active.timesheets.push(timesheet);
        active.timesheets[active.timesheets.length - 1].time.push(times);
        this.currUser.updateActive(active);
      }
    }
    this.dialogRef.close();
    const dialogRef = this.dialog.open(success, {
      width: '200px',
      height: '150px'
    });

  }
}

export function validTime(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);

    return !validTime ? {validTime:true}: null;
  }
}



@Component({
  selector: 'success',
  templateUrl: 'success.html',
  styleUrls: ['success.css'],
})

export class success {
  constructor(public dialogRef: MatDialogRef<addTimeModal>) {} 

}
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DaeService {

  currentDate;
  month: number;
  year: number;
  day: number;
  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform((new Date), 'yyyy-MM-dd');
    var months = this.datePipe.transform((new Date), 'MM');
    if (months == null) {
      this.month = 0;
    } else {
      this.month = +months;
    }

    var years = this.datePipe.transform((new Date), 'yyyy');
    if (years == null) {
      this.year = 0;
    } else {
      this.year = +years;
    }

    var days = this.datePipe.transform((new Date), 'dd');
    if (days == null) {
      this.day = 0;
    } else {
      this.day = +days;
    }
  }

  getDate() {
    return this.currentDate;
  }

  getMonth() {
    return this.month;
  }

  getYear() {
    return this.year;
  }

  getDay() {
    return this.day;
  }
}

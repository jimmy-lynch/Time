import { Timetrack } from "./timetrack.model";

export class Timesheet {
    month: number = 0;
    day: number = 0;
    year: number = 0;
    time: Timetrack[] = [];

    constructor (month: number, day: number, year: number) {
        this.month = month;
        this.day = day; 
        this.year = year;
        this.time = [];
    }

    addTime(tim: Timetrack) {
        this.time.push(tim);
    }
}

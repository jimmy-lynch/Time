import { Deserializable } from "./deserializable.model";
import { Timesheet } from "./timesheet.model";

export class User{
    username: string = "";
    email: string = "";
    password: string = "";
    public timesheets: Timesheet[] = [];
    //Timesheet has the timetracked for each day with each day labeled, so each User has an array of timesheets

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.timesheets = [];
    }

    addTimesheet(tim: Timesheet) {
        this.timesheets.push(tim)
    }
}




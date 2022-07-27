export class Timetrack {
    subject: string = "";
    hours: number = 0;

    constructor(subject: string, hours: number) {
        this.subject = subject;
        this.hours = hours;
    }
}

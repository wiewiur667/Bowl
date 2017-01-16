/**
 * Time Helper class form time operations
 */
export class Time {
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;

    constructor(time?: number) {
        if (time != null) {

            var t: Time;
            t = Time.fromNumber(time);
            this.hours = t.hours || 0;
            this.minutes = t.minutes || 0;
            this.seconds = t.seconds || 0;
        }
    }


    private addZero(data: number) {
        if (data < 10) return ("0" + data).slice(-2);
        return data.toString();
    }



    toMinutes() : number {
        return (this.hours * 60) + this.minutes;
    }

    static fromMinutes(minutesInput: number): Time {

        var result = new Time();
        result.hours = (minutesInput - minutesInput % 60) / 60;
        result.minutes = (minutesInput - result.hours * 60);
        return result;
    }

    static fromNumber(time: number) : Time {
        var stringTime: string[] = [];
        stringTime = time.toString().split(':');
        if (stringTime.length != 3) throw new SyntaxError("Time not in right format!");

        var result:Time = new Time()
        result.hours = +stringTime[0];
        result.minutes = +stringTime[1];
        result.seconds = +stringTime[2];
        return result;
    }

    static fromString(time: string): Time {
        var stringTime: string[] = [];
        stringTime = time.toString().split(':');
        if (stringTime.length == 2) {
            stringTime.push("00");
        }
        if (stringTime.length != 3) throw new SyntaxError("Time not in right format!");

        var result: Time = new Time()
        result.hours = +stringTime[0];
        result.minutes = +stringTime[1];
        result.seconds = +stringTime[2];
        return result;
    }

    static Add(a: Time, b: Time): Time {
        var result = new Time();
        result.hours = a.hours + b.hours;
        result.minutes = a.minutes + b.minutes;
        result.seconds = a.seconds + b.seconds;

        if (result.hours > 24 || result.minutes > 60 || result.seconds > 60) {
            throw new RangeError("bad Time");
        }

        return result;
    }

    static Substract(a: Time, b: Time) {
        var result = new Time();
        result.hours = a.hours - b.hours;
        if (result.hours < 0) throw new RangeError("hours can't be negative ");
        result.minutes = a.minutes - b.minutes;
        if (result.minutes < 0) throw new RangeError("minutes can't be negative ");
        result.seconds = a.seconds - b.seconds;
        if (result.seconds < 0) throw new RangeError("seconds can't be negative ");

        return result;
    }


    toString(precision?: number): string {

        switch (precision) {
            case 1:
                return this.addZero(this.hours);
            case 2:
                return this.addZero(this.hours) + ":" + this.addZero(this.minutes);
            case 3:
                return this.addZero(this.hours) + ":" + this.addZero(this.minutes) + ":" + this.addZero(this.minutes);
            default:
                return this.addZero(this.hours) + ":" + this.addZero(this.minutes);
        }
    }


}
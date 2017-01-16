import { Time } from './time';

export class TimeSlider {
    openTime: Time = new Time();
    closeTime: Time = new Time();

    constructor(
        oTime?: number,
        cTime?: number
    ){
        if (oTime != null && oTime > 0 && oTime < 1440) {
            this.openTime = Time.fromMinutes(oTime) || null;
        }
        if (cTime != null && cTime > 0 && cTime < 1440) {
            this.closeTime = Time.fromMinutes(cTime) || null;
        }
    }
}
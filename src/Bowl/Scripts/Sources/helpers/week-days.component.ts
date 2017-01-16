import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const WEEKDAYS_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeekdaysComponent),
    multi: true
}

@Component({
    selector: 'week-days',
    templateUrl: './week-days.component.html',
    providers: [WEEKDAYS_VALUE_ACCESSOR]
})

export class WeekdaysComponent implements OnInit, ControlValueAccessor {

    @Input()
    _daysCode: number = 0;

    @Input()
    public disabled: boolean;

    get value() {
        return this._daysCode;
    }
    set value(val) {
        this._daysCode = val;
        this.decodeDays(val);
        this.propagateChange(this.value);
    }

    public result: string[] = [];

    public daysEnum = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 4,
        Thursday: 8,
        Friday: 16,
        Saturday: 32,
        Sunday: 64
    }

    ngOnInit() {
        this.decodeDays(this.value);
    }

    private parseValue(val: number, event) {

        if (event.target.checked == true) {
            this.value |= val;
        } else
        if (event.target.checked == false)
        {
            this.value ^= val;
            }
        this.propagateChange(this.value);
    }

    private selected: boolean[] = [];
    private decodeDays(weekDay: number) {

        if (weekDay & this.daysEnum.Monday) {
            this.selected[0] = true;
        }
        if (weekDay & this.daysEnum.Tuesday) {
            this.selected[1] = true;
        }
        if (weekDay & this.daysEnum.Wednesday) {
            this.selected[2] = true;
        }
        if (weekDay & this.daysEnum.Thursday) {
            this.selected[3] = true;
        }
        if (weekDay & this.daysEnum.Friday) {
            this.selected[4] = true;
        }

        if (weekDay & this.daysEnum.Saturday) {
            this.selected[5] = true;
        }

        if (weekDay & this.daysEnum.Sunday) {
            this.selected[6] = true;
        }

        if (weekDay & 0) {
            for (var sel of this.selected) {
                sel = false;
            }
        }

        return this.result;
    }

    propagateChange = (_: any) => { };

    writeValue(value: number) {
        if (value !== undefined) {
            this.value = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {

    }

}
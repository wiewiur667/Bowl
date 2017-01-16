import { Component, OnInit, ElementRef, Inject, Input, Output, forwardRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Time } from './time';
import { TimeSlider } from './time-slider';

declare var $: JQueryStatic;

export const TIME_SLIDER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeSliderComponent),
    multi: true
};

@Component({
    selector: 'time-slider',
    templateUrl: './time-slider.component.html',
    providers: [TIME_SLIDER_VALUE_ACCESSOR]
})

export class TimeSliderComponent implements OnInit, ControlValueAccessor {
    elementRef: ElementRef;
    //Input, output value
    @Input()
    timeSlider: TimeSlider = new TimeSlider();
    constructor( @Inject(ElementRef) elementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        this.timeSlider = new TimeSlider();
        $(this.elementRef.nativeElement).find("#slider").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 1440,
            value: 0,
            step: 15,
            slide: (event, ui) => {
                this.timeSlider.openTime = Time.fromMinutes(+ui.values[0]);
                this.timeSlider.closeTime = Time.fromMinutes(+ui.values[1]);
                this.propagateChange(this.timeSlider);
            }
        });
    }


    get openTime() {
        return this.timeSlider.openTime;
    }
    set openTime(val) {
        this.timeSlider.openTime = val;
        this.propagateChange(this.openTime);
    }

    get closeTime() {
        return this.timeSlider.closeTime;
    }
    set closeTime(val) {
        this.timeSlider.closeTime = val;
        this.propagateChange(this.closeTime);
    }


    propagateChange = (_: any) => { };
    writeValue(value: TimeSlider) {
        if (value !== undefined && value !== null) {
            this.timeSlider.openTime = value.openTime;
            this.timeSlider.closeTime = value.closeTime;
            if (this.timeSlider !== undefined && this.timeSlider !== null) {
                $(this.elementRef.nativeElement).find("#slider").slider("values", 0, this.timeSlider.openTime.toMinutes());
                $(this.elementRef.nativeElement).find("#slider").slider("values", 1, this.timeSlider.closeTime.toMinutes());
            }

        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {

    }


}
import { Component, forwardRef } from '@angular/core';
import { Input, Output, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { Observable } from 'rxjs/Rx';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditableLabelComponent),
    multi: true
};

@Component({
    selector: 'editable-label',
    templateUrl: './editable-label.component.html',
    styleUrls: ['./editable-label.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class EditableLabelComponent implements ControlValueAccessor, OnInit
{
    @Input()
    public disabled: boolean;
    @Input()
    public maxLength: number = 0;
    @Input()
    public size: number = 0;
    @Input()
    public type: string = "text";
    @Input()
    public pattern: string = "";

    @Input()
    public prefixLabel: string = "";
    @Input()
    public suffixLabel: string = "";

    @Input()
    public step: number;

    @Input()
    public icon: string = "";

    @Input()
    _value: string = "";

    ngOnInit() {
        this.tempValue = this.value;

    }

    propagateChange = (_: any) => { };

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        if (this.tempValue == "") {
            this.tempValue = this.value;
        }
        this.propagateChange(this.value);
    }

    private tempValue = "";

    onChange(event) {
        this.value = event.target.value;

        if (event.code == "Escape") {
            this.value = this.tempValue;
            console.log("Editable label value", this.value);
            event.target.blur();
        } else if (event.code == "Enter") {
            event.target.blur();
        }
    }

    onBlur(event) {
        this.propagateChange(this.value);
    }

    writeValue(value: any) {
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
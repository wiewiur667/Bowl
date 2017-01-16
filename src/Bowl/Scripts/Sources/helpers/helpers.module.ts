import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';

import { WeekdaysComponent } from './week-days.component';
import { EditableLabelComponent } from './editable-label.component';

import { TimeSliderComponent } from '../helpers/time-slider.component';


@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
    ],
    declarations:
    [
        WeekdaysComponent,
        EditableLabelComponent,
        TimeSliderComponent
    ],
    exports:
    [
        WeekdaysComponent,
        EditableLabelComponent,
        TimeSliderComponent
    ]
})
export class HelpersModule{}
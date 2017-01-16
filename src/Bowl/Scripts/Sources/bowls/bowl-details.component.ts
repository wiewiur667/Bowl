import {
    Component,
    Input,
    OnInit,
    ContentChild,
    ViewChild,
    AfterViewInit,
    ElementRef,
    ViewEncapsulation,
    OnDestroy
} from "@angular/core";
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, } from '@angular/router';

import { Bowl } from "./bowl";


import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { EditableLabelComponent } from "../helpers/editable-label.component";
import { BowlsService } from "./bowls.service";

export class BowlDetailsData extends BSModalContext {
    constructor(public id: number) {
        super();
    }
}


@Component({
    selector: "modal-content",
    templateUrl: "./bowl-details.component.html",
    styleUrls: ["./bowl-details.component.css"],
    providers: [BowlsService],
    encapsulation: ViewEncapsulation.None
})
export class BowlDetailsComponent implements OnInit, ModalComponent<BowlDetailsData> {
    context: BowlDetailsData;

    @ViewChild('foodSlider') foodSlider: ElementRef;
    @ViewChild('alertModal') alertModal: ElementRef;


    private bowl: Bowl = null
    private events: any[] = [];
    private id: number;
    private active: boolean = true;

    public bowlDetailsForm: FormGroup;
    @Input()
    public distributing: boolean = false;

    @Input()
    public open: boolean = false;

    public notFound: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private bowlsService: BowlsService,
        public dialog: DialogRef<BowlDetailsData>
    )
    {
        this.context = dialog.context;
        this.id = this.context.id;
        dialog.setCloseGuard(this);
    }

    ngOnInit() {
        this.bowlDetailsForm = this.formBuilder.group({
            id: [0, [Validators.required]],
            name: ["", [Validators.required, Validators.minLength(3)]],
            location: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]],
            foodName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(128)]],
            foodAlert: ["", [Validators.required, Validators.pattern("[0-9]*[.]?[0-9]*")]],
            open: [false,[]]
        });
    }

    ngOnDestroy() {
        this.active = false;
    }

    ngAfterViewInit() {
        this.getBowl(this.id);

        var slider = this.foodSlider.nativeElement;

        var updateSliderValue = function (event, ui) {
            var customHandle = $(".ui-slider-handle");
            var value = ui.value;
            var tooltip = '<div class="tooltip-kg">' + value + 'kg' + '</div>';
            customHandle.html(tooltip);
            if ($(document).width() < 992) {
                $(slider).slider("option", "orientation", "horizontal");

            } else { $(slider).slider("option", "orientation", "vertical"); }
        }

        var refreshSlider = function () {
            $(slider).slider("value", $(slider).slider("option", "value"));
        }

        $(window).bind("resize", function () {
            var resizeTimer;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(refreshSlider, 100);

            console.log("Resize");
        });

        $(slider).slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 5.00,
            step: 0.1,
            value: 2.5,
            slide: updateSliderValue,
            change: (event, ui) => {
                updateSliderValue(event, ui);
                if (this.bowlDetailsForm != null) this.bowlDetailsForm.controls["foodAlert"].setValue(ui.value);
                if (this.bowl.foodAmount < this.bowlDetailsForm.controls["foodAlert"].value) {
                    (<any>$(this.alertModal.nativeElement)).modal("show");
                }
            },
            create: updateSliderValue
        });

    }

    private subscribeToFormChanges() {
        const bowlDetailsFormValueChanges = this.bowlDetailsForm.valueChanges;
        bowlDetailsFormValueChanges.debounceTime(500)
            .takeWhile((x) => this.active)
            .subscribe(x => {
            this.events.push(x);
            this.Submit(null, this.bowlDetailsForm);
        });
    }

    private getCheckbox(event) {
        this.bowlDetailsForm.controls["open"].setValue(event.target.checked);
    }

    Submit(event, form: FormGroup) {
        if (event != null) {
            event.preventDefault();
        }
        if (form.valid) {
            this.bowl.name = form.value["name"];
            this.bowl.location = form.value["location"];
            this.bowl.foodName = form.value["foodName"];
            this.bowl.foodAlert = +form.value["foodAlert"];
            this.bowl.open = form.value["open"];

            this.bowlsService.saveBowl(this.bowl)
                .takeWhile(() => this.active)
                .subscribe(
                bowl => {
                },
                error => console.log(error)
                );
        }
    }

    getBowl(id: number) {
        this.bowlsService.getBowl(id)
            .takeWhile(() => this.active)
            .subscribe(
            x => {
                console.log("getBowl", x);
                this.bowl = x;

            }, error => { console.log(error); this.notFound = true; },
            () => {

                this.bowlDetailsForm.controls["id"].setValue(this.bowl.id);
                this.bowlDetailsForm.controls["name"].setValue(this.bowl.name);
                this.bowlDetailsForm.controls["location"].setValue(this.bowl.location);
                this.bowlDetailsForm.controls["foodName"].setValue(this.bowl.foodName);
                this.bowlDetailsForm.controls["foodAlert"].setValue(this.bowl.foodAlert);
                this.bowlDetailsForm.controls["open"].setValue(this.bowl.open);
                $(this.foodSlider.nativeElement).slider("value", this.bowl.foodAlert);
                this.subscribeToFormChanges();
            });
    }

    close() {
        this.dialog.close();
    }
}
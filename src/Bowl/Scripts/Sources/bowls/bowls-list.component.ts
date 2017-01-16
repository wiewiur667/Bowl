import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { Bowl } from "./bowl";
import { BowlsService } from './bowls.service';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { BowlDetailsComponent, BowlDetailsData } from './bowl-details.component';

@Component({
    selector: "bowls-list",
    templateUrl: "./bowls-list.component.html",
    styleUrls: ["./bowls-list.component.css"],
    providers: [BowlsService, Modal]

})
export class BowlsListComponent {

    public loading = false;

    bowls: Bowl[] = [];
    chartData: number[] = [5.0, 3.2];
    chartLabels: string[] = ["alert", "amount"];
    public chartOptions:any = {
        responsive: true,
        animation: false,
        legend: {
            display:false
        },
        tooltips: {
            enabled: false
        }
    }

    constructor(
        private router: Router,
        private bowlsService: BowlsService,
        private overlay: Overlay,
        private vcRef: ViewContainerRef,
        public modal: Modal)
    {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit()
    {
        this.getBowls();
        console.log("35");
    }

    getBowls() {
        this.loading = true;

        this.bowlsService.getBowls()
            .subscribe(
            (result) => this.bowls = result,
            (error) => {
                this.loading = false;
                console.log(error)
            },
            () => {
                this.loading = false;
                console.log(this.bowls);
            }
        );
    }

    addBowl() {
        var bowl = new Bowl();
        console.log("Bowl", bowl);
        this.bowlsService.saveBowl(bowl).subscribe(
            response => {
                console.log(response);
                let respBody = (<Response>response).json();
                bowl.id = respBody["id"];
                bowl.name = respBody["name"];
                bowl.location = respBody["location"];
                bowl.foodName = respBody["foodName"];
                bowl.foodAmount = respBody["foodAmount"];
                bowl.foodAlert = respBody["foodAlert"];
                bowl.distributing = false;
                bowl.open = false;
                this.bowls.push(bowl);
            },
            error => console.log(error)
        );
    }

    removeBowl(id: number) {
        var tempBowl = this.bowls.find(a => a.id == id);
        var remove = false;
        this.modal.confirm()
            .title('Remove bowl ' + tempBowl.name)
            .body(`<label>Do you want to remove this bowl?</label>`
            )
            .okBtn('Remove')
            .cancelBtn('Cancel')
            .open()
            .catch(err => alert("ERROR")) // catch error not related to the result (modal open...)
            .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result.
            .then(result => {

                this.bowlsService.removeBowl(id).subscribe(
                    response => {
                        console.log("removeBowl", response);
                    },
                    error => console.log(error),
                    () => {
                        for (var i = 0; i < this.bowls.length; i++) {
                            if (this.bowls[i].id === id) {
                                console.log("remove " + id);
                                this.bowls.splice(i, 1);
                            }
                        }
                    }
                );

            })// if were here ok was clicked.
            .catch(err => alert("CANCELED"))

        if (remove) {

        }

    }

    viewDetails(id: number) {

        var modal = this.modal.open(BowlDetailsComponent, overlayConfigFactory({ id: id }, BowlDetailsData));
        modal.then(a => {
            var onDestroy = a.onDestroy;
            onDestroy.subscribe(b => {
                this.getBowls();
            });
        });
        this.bowls = this.bowls;

    }
}
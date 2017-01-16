import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BowlsRoutingModule } from "./bowls-routing.module";
import { BowlsListComponent } from "./bowls-list.component";
import { BowlDetailsComponent } from "./bowl-details.component";
import { HelpersModule } from "../helpers/helpers.module";

import { ChartsModule } from "ng2-charts/ng2-charts";

import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BowlsRoutingModule,
        HelpersModule,
        ChartsModule,
        ModalModule.forRoot(),
        BootstrapModalModule

    ],
    declarations:
    [
        BowlsListComponent,
        BowlDetailsComponent
    ],
    providers:
    [
    ],
    entryComponents:[BowlDetailsComponent]
})

export class BowlsModule {}
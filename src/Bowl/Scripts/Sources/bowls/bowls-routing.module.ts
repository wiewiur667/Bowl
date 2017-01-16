import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BowlsListComponent } from "./bowls-list.component";
import { BowlDetailsComponent } from "./bowl-details.component";

@NgModule({
    imports:
    [
        RouterModule.forChild([
            { path: "bowls", component: BowlsListComponent }
        ])
    ],
    exports:
    [
        RouterModule
    ]
})
export class BowlsRoutingModule { }
﻿import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { BowlsModule } from "./bowls/bowls.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        BowlsModule

    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

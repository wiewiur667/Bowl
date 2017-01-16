import { Component, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { enableProdMode } from '@angular/core';


import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None

})



export class AppComponent {


    @ViewChild("menuToggle") menuToggle: ElementRef;

    ngAfterViewInit() {
        var toggleBtn = this.menuToggle.nativeElement;
        $(toggleBtn).click(
            function (e) {
                console.log("clicked");
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });

        $(window).bind("resize", function () {
            if ($(window).width() > 768) {
                $("#wrapper").removeClass("toggled");
            }


        })
    }
}
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AccordionModule} from "../accordion/accordion.module";
import {PipesModule} from "../pipes/pipes.module";
import {SpinnerComponent} from "../spinner/spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    PipesModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

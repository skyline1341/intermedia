import {NgModule} from "@angular/core";
import {AccordionComponent} from "./accordion.component";
import {PipesModule} from "../pipes/pipes.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AccordionComponent],
  exports: [AccordionComponent],
  imports: [
    PipesModule,
    CommonModule,
  ]
})
export class AccordionModule {

}

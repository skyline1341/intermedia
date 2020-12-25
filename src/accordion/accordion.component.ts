import {Component, Input} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {BASIC_ICONS} from "../basic_icons";

@Component({
  selector: 'app-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
})
export class AccordionComponent {
  @Input() name = '';
  iconUp = BASIC_ICONS["chevron-up-16"];
  iconDown = BASIC_ICONS["chevron-down-16"];

  isVisible$ = new BehaviorSubject(false);

  toggle(): void {
    this.isVisible$.next(!this.isVisible$.value);
  }
}

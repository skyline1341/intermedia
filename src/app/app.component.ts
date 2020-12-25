import {Component} from '@angular/core';
import {BASIC_ICONS} from "../basic_icons";
import {BehaviorSubject, Observable, of, pairs, zip} from "rxjs";
import {filter, groupBy, map, mergeMap, startWith, switchMap, toArray} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {IconInterface} from "../interfaces/icon.interface";
import {IconsGroupInterface} from "../interfaces/icons-group.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  iconsGroups: Observable<any>;
  filterForm = new FormGroup({
    label: new FormControl(''),
  });
  filter$ = this.filterForm.valueChanges.pipe(
    map(filterValue => filterValue.label),
    startWith(''),
  );
  currentIconsColorClass$ = new BehaviorSubject<string>('icon--default');
  colorsSelector = ['default', 'blue', 'green', 'red', 'orange'];

  constructor() {
    this.iconsGroups = this.filter$.pipe(
      switchMap(filterLabel => pairs(BASIC_ICONS).pipe(
        filter(icon => icon[0].indexOf(filterLabel) > -1),
        map(icon => {
            // в некоторых иконках не указана ширина, но в viewBox часто ширина совпадает, поэтому решил смотреть и туда
            // можно было напилить через domparser, но показалось, что регуляркой лучше будет
            const widthSearch = (icon[1] as string).match(/<svg.+?(?:(?:width="|viewbox="\d+\s+\d+\s+)(\d+)).+?<\/svg>/is);
            const size = !!widthSearch ? widthSearch[1] : 0;
            const code = (icon[1] as string).replace(/ fill="(.*?)"/, '');
            return {label: icon[0], code, size} as IconInterface;
          }
        ),
        groupBy(i => i.size),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(g => {
          return {size: g[0], icons: g[1].sort(this.sortIconsByName)} as IconsGroupInterface;
        }),
        toArray(),
      )),
    )
  }

  private sortIconsByName(a, b): number {
    if (a.label > b.label) {
      return 1;
    }
    if (a.label < b.label) {
      return -1;
    }
    return 0;
  }

  setIconsColor(color: string): void {
    this.currentIconsColorClass$.next(`icon--${color}`);
  }
}

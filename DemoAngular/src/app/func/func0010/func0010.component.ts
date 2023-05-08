import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import Sortable, { SortableEvent } from 'sortablejs';
import { SharedModule } from 'src/app/shared/shared.module';
import { moveItem } from 'src/app/common/util';

@Component({
  selector: 'app-func0010',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './func0010.component.html',
  styleUrls: ['./func0010.component.scss']
})
export class Func0010Component implements OnInit {

  @ViewChild('grid', { static: true }) gridRef: ElementRef<HTMLDivElement>;

  itemList = Array.from({ length: 6 }, (x, i) => i + 1);

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const sortable = new Sortable(this.gridRef.nativeElement, {
        animation: 300,
        easing: 'cubic-bezier(1, 0, 0, 1)',
        onSort: this.execSort,
      });
    });
  }

  private execSort = (event: SortableEvent) => {
    const oldIndex = event.oldIndex;
    const newIndex = event.newIndex;
    moveItem(this.itemList, oldIndex, newIndex);
    this.cd.detectChanges();
  }
}

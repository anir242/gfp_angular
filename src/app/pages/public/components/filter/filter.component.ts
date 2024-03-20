import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FilterService} from '../../../../_services/public/local/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() items: [];
  @Input() label: string;
  @Output() eventEmitter = new EventEmitter<string>();
  @Input() selected: string;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  itemChanged(): void{
    this.eventEmitter.emit(this.selected);
  }
}

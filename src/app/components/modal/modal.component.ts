import {Component, OnInit, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalType} from '../../_models/components/modal-types';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalWidth: string;
  showButton: boolean;
  modalTypes = {
    small: ModalType.small,
    medium: ModalType.medium,
    large: ModalType.large
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    this.modalWidth = this.data.size;
    this.showButton = this.data.showAction;
  }
}

import {SweetAlertIcon} from 'sweetalert2';

export interface SweetAlertInterface {
  title: string | any;
  text?: string | any;
  type: string;
  icon?: SweetAlertIcon;
  cancelButtonText?: string;
  confirmButtonText?: string;
  timer?: number;
}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  success(msg: any) {
    this.toastr.success(msg, 'Success');
  }
  info(msg: any) {
    this.toastr.info(msg, 'Info');
  }
  error(msg: any) {
    this.toastr.error(msg, 'Error');
  }
  warning(msg: any) {
    this.toastr.warning(msg, 'Warning');
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isUserloggedIn: any;
  userDetails: any;

  get name() {
    let userName = '';
    const data = this.userDetails.name.split(' ');
    console.log(data.length);
    if (data.length >= 2) {
      userName = data[0] + ' ' + data[1];
    } else {
      userName = data[0];
    }
    return userName;
  }

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    this.authService.userDetails.subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.isUserloggedIn = true;
        this.userDetails = res.response;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      if (res.statusCode === 200) {
        this.authService.userDetails.next({});
        this.authService.isUserLoggedIn.next(false);
        this.isUserloggedIn = false;
        this.router.navigate(['/login']);
        this.toasterService.success(res.message);
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
}

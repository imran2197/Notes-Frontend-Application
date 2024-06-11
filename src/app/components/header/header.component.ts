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
        this.router.navigate(['/login']);
        this.toasterService.success('Logout successful.');
      } else {
        this.toasterService.error('Failed to logout.');
      }
    });
  }
}

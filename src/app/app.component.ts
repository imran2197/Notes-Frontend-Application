import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './_helper/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.getUserInfo().subscribe((res) => {
      if (res.statusCode === 200) {
        this.authService.userDetails.next(res);
        this.authService.isUserLoggedIn.next(true);
        this.router.navigate(['/notes']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}

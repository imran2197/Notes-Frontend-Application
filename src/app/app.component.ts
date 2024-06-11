import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'testing';
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(async (res) => {
      if (res.statusCode === 200) {
        this.getUserDetails();
        this.toasterService.success(res.message);
        this.router.navigate(['/notes']);
      } else {
        this.toasterService.error(res.message);
      }
    });
  }

  redirectToSignup() {
    this.router.navigate([`/signup`]);
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

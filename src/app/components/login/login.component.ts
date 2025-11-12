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
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    if (this.loginForm.invalid) {
      this.toasterService.error('Please enter valid credentials.');
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(
        switchMap((res) => {
          if (res?.statusCode === 200) {
            // successful login -> fetch user info
            return this.authService.getUserInfo().pipe(
              tap((userRes) => {
                if (userRes?.statusCode === 200) {
                  this.authService.userDetails.next(userRes);
                  this.authService.isUserLoggedIn.next(true);
                } else {
                  throw userRes;
                }
              })
            );
          } else {
            throw res;
          }
        }),
        catchError((err) => {
          const msg = err?.message || 'Authentication failed. Check network.';
          this.toasterService.error(msg);
          return of(null);
        })
      )
      .subscribe((userFetchResult) => {
        if (userFetchResult) {
          this.toasterService.success('Logged in successfully.');
          // single navigation after success
          this.router.navigate(['/notes']);
        }
        // errors already shown in catchError
      });
  }

  redirectToSignup() {
    this.router.navigate([`/signup`]);
  }

  getUserDetails() {
    return this.authService.getUserInfo().pipe(
      tap((res) => {
        if (res?.statusCode === 200) {
          this.authService.userDetails.next(res);
          this.authService.isUserLoggedIn.next(true);
        }
      })
    );
  }
}

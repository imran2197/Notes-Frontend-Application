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
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
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

  onSignup() {
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      if (res.statusCode === 201) {
        this.toasterService.success(res.message);
        this.router.navigate(['login']);
      } else {
        this.toasterService.error(res.message);
      }
    });
  }

  redirectToLogin() {
    this.router.navigate([`/login`]);
  }
}

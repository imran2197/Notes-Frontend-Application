import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  isLoading: Observable<any> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('Loading Data');
    this.isLoading = this.authService.loader;
  }
}

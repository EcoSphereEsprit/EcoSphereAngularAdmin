import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../../layout/service/app.layout.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public layoutService: LayoutService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:9090/user/login', this.loginForm.value).subscribe(
        response => {
          if (response.token && response.user_id) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user_id);
            localStorage.setItem('role', response.role);
            console.log('Token:', localStorage.getItem('token'));
            console.log('User ID:', localStorage.getItem('userId'));
            console.log('Role:', localStorage.getItem('role'));
            this.router.navigate(['/']);
          }
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }
}

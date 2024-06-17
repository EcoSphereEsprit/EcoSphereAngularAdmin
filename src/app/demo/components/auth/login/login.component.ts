import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import { MessageService, Message } from 'primeng/api';

@Component({
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent {
  rememberMe: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    public layoutService: LayoutService,
    private userService: UserServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  msgs: Message[] = [];
  onLogin() {
    if (!this.username || !this.password) {
      return;
    }
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
  
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.userId);
  
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Login successful' });
        this.router.navigate(['/landing']);
      },
      error => {
        console.error('Login failed', error);
  
        const errorMessage = error.error?.message || 'Login failed';
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'LogIn failed', detail: errorMessage });
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'LogIn failed', detail: errorMessage });
      }
    );
  }
  

  goToSignup(){
    this.router.navigate(['/auth/register']);
  }
}

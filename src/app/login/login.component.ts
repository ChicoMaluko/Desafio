import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatLabel,
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatCardContent,
    MatCardTitle,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  token: string = '';
  constructor(private loginService: LoginService, private router: Router) {}
  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public onLogin() {
    console.log('oi');
    this.loginService
      .postLoginForm(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      )
      .subscribe((ok) => {
        localStorage.setItem('token', ok.token);
        this.router.navigate(['inicio']);
      });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {NgOptimizedImage} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    NgOptimizedImage,
    InputText,
    Password,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public formGroupRegister: FormGroup = new FormGroup({});
  public formGroupLogin: FormGroup = new FormGroup({});
  public register: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initFormLogin();
    this.initFormRegister();
  }

  public initFormLogin(): void {
    this.formGroupLogin = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
      });
  }

  public initFormRegister(): void {
    this.formGroupRegister = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        perfil: ['',Validators.required],
        instituicao: ['',Validators.required]
      });
  }

  public onRegister(): void {
    this.register = true;
  }

  public onLogin(): void {
    this.register = false;
  }

  public registrar(): void {

  }

  public login(): void {

  }
}

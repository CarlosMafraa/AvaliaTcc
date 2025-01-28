import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {NgOptimizedImage} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {RadioButton} from 'primeng/radiobutton';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {Observable} from 'rxjs';
import {AuthResponse} from '@supabase/supabase-js';
import {Select} from 'primeng/select';
import {LoginService} from '../../services/supabase/login/login.service';
import {RegisterService} from '../../services/supabase/register/register.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    NgOptimizedImage,
    InputText,
    Password,
    Button,
    RadioButton,
    Select
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public formGroupRegister: FormGroup = new FormGroup({});
  public formGroupLogin: FormGroup = new FormGroup({});
  public register: boolean = false;
  public instituicao: any[] = [];

  private formBuilder: FormBuilder = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);
  private registerService: RegisterService = inject(RegisterService);
  private router: Router = inject(Router);



  ngOnInit() {
    this.initFormLogin();
    this.initFormRegister();
    this.getInstituicao();
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
        perfil: ['', Validators.required],
        instituicao: ['', Validators.required]
      });
  }

  public onRegister(): void {
    this.register = true;
  }

  public onLogin(): void {
    this.register = false;
  }

  public registrar(): void {
    if (this.formGroupRegister.invalid) {
      return;
    }

    const register = this.formGroupRegister.getRawValue();
    this.registerService
      .register(
        register.email,
        register.senha,
        register.nome,
        register.sobrenome,
        register.perfil,
        register.instituicao
      )
      .then((res: void) => {
        console.log('Usuário registrado com sucesso!', res);
        this.formGroupRegister.reset();
        this.register = false;
      }).catch((error) => {
      console.error('Erro ao registrar usuário:', error);

    }).finally(() => {
      console.log('Processo de registro concluído.');

    })
  }

  public login(): void {
    if (this.formGroupLogin.invalid) {
      return;
    }

    const login = this.formGroupLogin.getRawValue();
    this.loginService.login(login.email, login.senha).then((res: AuthResponse) => {
      console.log('Login bem-sucedido!', res);
      this.router.navigate(['/home']).then();
    }).catch((error) => {
      console.log('Erro inesperado no login:',error)
    }).finally(() => {

    })
  }

  public getInstituicao(): void {
    this.registerService.getInstituicao().then((res) => {
      if (res.data) {
        this.instituicao = res.data
      }
    });
  }

}

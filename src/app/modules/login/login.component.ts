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
    RadioButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public formGroupRegister: FormGroup = new FormGroup({});
  public formGroupLogin: FormGroup = new FormGroup({});
  public register: boolean = false;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private supabaseService: SupabaseService = inject(SupabaseService);
  private router: Router = inject(Router);


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

  public async registrar(): Promise<void> {
    if (this.formGroupRegister.invalid) {
      return;
    }

    const register = this.formGroupRegister.getRawValue();

    try {
      const user: Observable<AuthResponse> = await this.supabaseService.register(register.email, register.senha, register.nome, register.sobrenome, register.perfil, register.instituicao);
      if (user) {
        console.log('Usuário registrado com sucesso!');
        this.formGroupRegister.reset();
        this.register = false;
        this.formGroupRegister.reset();
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  }

  public async login(): Promise<void> {
    if (this.formGroupLogin.invalid) {
      return;
    }

    const login = this.formGroupLogin.getRawValue();

    try {
      const user: Observable<AuthResponse> = await this.supabaseService.login(login.email, login.senha);
      if (user) {
        console.log('Login bem-sucedido!', user);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }
}

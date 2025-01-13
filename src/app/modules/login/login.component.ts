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
  private formBuilder: FormBuilder = inject(FormBuilder);
  private supabaseService: SupabaseService = inject(SupabaseService);
  private router: Router = inject(Router);
  public professores: any[] = [];


  ngOnInit() {
    this.initFormLogin();
    this.initFormRegister();
    this.getProfessores();
    this.getUsers();
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

    this.supabaseService
      .register(
        register.email,
        register.senha,
        register.nome,
        register.sobrenome,
        register.perfil,
        register.instituicao
      )
      .subscribe({
        next: (authResponse: AuthResponse): void => {
          console.log('Usuário registrado com sucesso!', authResponse);
          this.formGroupRegister.reset();
          this.register = false;
        },
        error: (error): void => {
          console.error('Erro ao registrar usuário:', error);
        },
        complete: (): void => {
          console.log('Processo de registro concluído.');
        }
      });
  }


  public login(): void {
    if (this.formGroupLogin.invalid) {
      return;
    }

    const login = this.formGroupLogin.getRawValue();

    this.supabaseService.login(login.email, login.senha).subscribe({
      next: (result: AuthResponse): void => {
        if (result.error) {
          console.error('Erro no login:', result.error.message);
        } else {
          console.log('Login bem-sucedido!', result);
          this.router.navigate(['/home']).then();
        }
      },
      error: (err): void => {
        console.error('Erro inesperado no login:', err);
      },
      complete: (): void => {
        console.log('Processo de login concluído.');
      }
    });
  }

  public getProfessores(): void {
    this.supabaseService.getInstituicao().then((res) => {
      if (res.data) {
        this.professores = res.data
      }
    });
  }


  public getUsers() {
    this.supabaseService.getUsers().then((res) => {
      console.log(res)
    })
  }
}

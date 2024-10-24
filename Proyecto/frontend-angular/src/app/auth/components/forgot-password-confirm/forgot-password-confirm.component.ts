import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-forgot-password-confirm',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './forgot-password-confirm.component.html',
  styleUrl: './forgot-password-confirm.component.scss'
})
export class ForgotPasswordConfirmComponent implements OnInit {

  private uuid: string = "";
  private token: string = "";

  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  private readonly _builder = inject(FormBuilder);
  private readonly _alertService = inject(AlertService);

  public formForgotPasswordConfirm: FormGroup = this._builder.group({
    newPassword: this._builder.control("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    newRePassword: this._builder.control("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)])
  });

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(params => {

      this.uuid = params["uuid"];
      this.token = params["token"];
    })
  }

  public forgotPasswordConfirm(): void {

    if(this.formForgotPasswordConfirm.invalid){

      this.formForgotPasswordConfirm.markAllAsTouched();
      return;
    }

    this._authService.forgotPasswordConfirm({
      uuid: this.uuid,
      token: this.token,
      ...this.formForgotPasswordConfirm.value
    }).subscribe(
      () => {

        this._alertService.success("Recuperación de contraseña", "Contraseña cambiada con exito");
        this._router.navigate(["auth/login"]);
      },
      () => {
        this._alertService.error("Recuperación de contraseña", "Ocurrio un error al cambiar la contraseña");
      }
    )
  }

  get newPassword(){
    return this.formForgotPasswordConfirm.controls["newPassword"];
  }

  get newRePassword(){
    return this.formForgotPasswordConfirm.controls["newRePassword"];
  }
}

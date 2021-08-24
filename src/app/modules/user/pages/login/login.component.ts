import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export interface Login{
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public hidden: boolean = true;
  public form: FormGroup;
  public isChecked: boolean = false;

  constructor(
      private fb: FormBuilder,
      private _service: UserService,
      private _snackBar: MatSnackBar,
      private router: Router,
      ){
      this.form = this.fb.group({
          userName: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  onSubmit({userName, password}: Login): void {

      this.isChecked = true;
      
      if(this._service.login(userName, password)){
        this.isChecked = false;
        this._snackBar.open('Bienvenido...', 'Cerrar');
        this.form.reset();
        this.router.navigate(['/']);
      }else{
        this.isChecked = false;
        this._snackBar.open('Usuario o contraseña invalidos', 'Cerrar');
      }
         
  }

  getInvalid(): boolean{

      if(this.form.invalid){
          return true;
      }else if(this.isChecked){
          return true;
      }

      return false;
  }

}

// core
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validEqualsPasswords, validNotEquealQuestions } from 'src/app/validators/app.validator';

// materials
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { UserService } from '../../services/user.service';

// models
import { UserI } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public formUser!: FormGroup;
  public formSecurity!: FormGroup;
  public userName: string = '';
  public isEditable: boolean = true;
  public isErr: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _service: UserService,
    private _snackBar: MatSnackBar,
  ) {
    this.BuildForms();
  }

  BuildForms() {
    this.formUser = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(16)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(16)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      repeatPassword: ['', Validators.required],
    }, {
      validator: [validEqualsPasswords]
    })
    this.formSecurity = this.fb.group({
      question1: ['', Validators.required],
      reply1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      question2: ['', Validators.required],
      reply2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    }, {
      validator: [validNotEquealQuestions]
    })
  }

  onSubmit(stepper: MatStepper) {

    let data: UserI = this.getData();

    if (this._service.saveRecord(data)) {
      this.userName = `${data.firstName} ${data.lastName}`;
      this.isEditable = false;
      console.log(this._service.users);
      stepper.next();
    } else {
      this.isEditable = true;
      this.isErr = true;
      this.formUser.controls.userName.setErrors({
        notAviable: true
      })
      stepper.previous();
    }
  }

  getData(): UserI {
    return {
      firstName: this.formUser.controls.firstName.value,
      lastName: this.formUser.controls.lastName.value,
      userName: this.formUser.controls.userName.value,
      password: this.formUser.controls.password.value,
      role: 1,
      isActive: false,
      questions: [
        parseInt(this.formSecurity.controls.question1.value),
        parseInt(this.formSecurity.controls.question2.value)
      ],
      replies: [
        this.formSecurity.controls.reply1.value,
        this.formSecurity.controls.reply2.value
      ],
      creationDate: new Date(),
      updateDate: new Date()
    }
  }

  showError(control: AbstractControl): string {

    if (control.hasError('required')) {
      return 'El campo es requerido.';
    } else if (control.hasError('notAviable')) {
      return 'El usuario se encuentra en uso.';
    } else if (control.hasError('notEqual')) {
      return 'La clave no coincide.';
    } else if (control.hasError('equal')) {
      return 'Las preguntas son iguales.';
    } else if (control.hasError('minlength')) {
      let min = control.errors!.minlength.requiredLength;
      return `Mínimo ${min} caracteres.`;
    } else if (control.hasError('maxlength')) {
      let max = control.errors!.maxlength.requiredLength;
      return `Máximo ${max} caracteres.`;
    } else if (control.hasError('pattern')) {
      return `Sólo se permiten letras.`;
    }

    return '';
  }

}

import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validEqualsPasswords: ValidatorFn = 
  (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('repeatPassword');

  if(confirmarPassword?.value != null && confirmarPassword?.value.toString().length > 0){
    if(password!.value !== confirmarPassword!.value){
      confirmarPassword?.setErrors({
        notEqual: true
      })
      return { 'notEqual': true };
    }
  
    confirmarPassword?.setErrors(null)
  }
  return null;
};

export const validNotEquealQuestions: ValidatorFn = 
    (control: AbstractControl): ValidationErrors | null => {
  const question1 = control.get('question1');
  const question2 = control.get('question2');

  if(question1!.value === question2!.value){
    question2?.setErrors({
      equal: true
    })
    return { 'equal': true };
  }

  question2?.setErrors(null);
  return null;

};
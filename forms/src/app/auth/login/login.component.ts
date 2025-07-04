import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {

  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(()=>{
      const sub = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value)=> window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.userEmail}))
      });

      this.destroyRef.onDestroy(()=> {
        sub?.unsubscribe();
      });
    });
  }


  onSubmit(formData: NgForm){

    console.log(formData);

    if(formData.form.invalid){
      return;
    }
    const enteredEmail = formData.form.value.userEmail;
    const enteredPassword = formData.form.value.userPassword;

    console.log(enteredEmail, enteredPassword);

    formData.form.reset();
  }
}

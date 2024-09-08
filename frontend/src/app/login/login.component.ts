import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup
  hide = true
  isValidEmail = new FormControl('', [Validators.email])

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log('Submit')
    console.log('isValid: ', this.loginForm.valid)
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      console.log('Login Successful!', this.loginForm.value)
      // Perform login action here, like calling an API
    }
  }
  
  getErrorMessage() {
    if (this.isValidEmail.hasError('required')) {
      return 'You must enter a value'
    }

    return this.isValidEmail.hasError('email') ? 'Not a valid email' : ''
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private router: Router
  ) {
    this.form=new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
  }

  get loginForm() { return this.form.controls }

  login(){
    console.log('Alert');
    if(this.form.valid){
      this.router.navigate(['/admin/dashboard']) 
    }
  }

}

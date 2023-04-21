import { AccountsService } from './../../accounts.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private __router: Router,
    private __accountService: AccountsService,
    private __toast: ToastrService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  get loginForm() { return this.form.controls }

  login() {
    if (this.form.valid) {
      this.__accountService.login(this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('loggedInUser', JSON.stringify(res.data));
          this.__toast.success('Login success!');
          this.__router.navigate(['/admin/members']);
        },
        error:(err)=>{
          this.__toast.error(err.error.message);
        }
      });
    }
  }

}

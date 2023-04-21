import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from '../Services/members.service';
import { CommonService } from '../../../common/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent implements OnInit {

  form: FormGroup;
  memberDetails: any;
  date: any;
  allMembers: any = [];
  volunteers: any = [];

  constructor(
    private $service: MembersService,
    private __toast: ToastrService,
    private $router: Router,
  ) { 
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl({value: '', disabled: true}),
      mobile_number: new FormControl('', [Validators.required]),
      whatsapp_number: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      reference: new FormControl(''),
      joining_date: new FormControl('', [Validators.required]),
      monthly_amount: new FormControl('', [Validators.required]),
      user_type: new FormControl('MEMBER'),
      added_by : new FormControl(''),
      status : new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getAllMembers();
    this.setFormData();
  }

  setFormData() {
    this.memberDetails = this.$service.getMemberDetails();
    this.form.patchValue(this.memberDetails);
  }

  get myForm() { return this.form.controls }

  getAllMembers() {
    this.allMembers = [];
    this.$service.getAllMembers().subscribe({
      next: (res: any) => {
        this.allMembers = res.data;
        if (this.volunteers.length == 0) {
          this.getVolunteers();
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getVolunteers() {
    this.volunteers = [];
    this.allMembers.find((res:any)=>{
      if(res.user_type == 'ADMIN' || res.user_type == 'VOLUNTEER'){
        this.volunteers.push(res);
      }
    })
  }

  save(){
    if(this.form.valid){
      let loggedInUser:any = localStorage.getItem('loggedInUser');
      loggedInUser = JSON.parse(loggedInUser);
      const obj = {
        ...this.form.value,
        modified_by: loggedInUser.id
      }
      this.$service.updateUser(obj, this.memberDetails.id).subscribe({
        next:(res: any)=>{
          this.__toast.success('User updated successfully!')
          this.$router.navigate(['/admin/members']);
        },
        error:(err)=>{
          this.__toast.error(err.error.message);
        }
      });
    }
  }

}

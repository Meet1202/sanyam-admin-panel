import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from '../Services/members.service';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent implements OnInit {

  form: FormGroup;
  memberDetails: any;

  constructor(
    private $service: MembersService,
  ) { 
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      middle_name: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      mobile_number: new FormControl('', [Validators.required]),
      whatsapp_number: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      monthly_amount: new FormControl('', [Validators.required]),
      user_type: new FormControl('member'),
      added_by : new FormControl(''),
      status : new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.setFormData();
  }

  setFormData() {
    this.memberDetails = this.$service.getMemberDetails();
    this.form.patchValue(this.memberDetails);
  }

  get myForm() { return this.form.controls }

  save(){
    if(this.form.valid){
      console.log(this.form.value);
    }
  }

}

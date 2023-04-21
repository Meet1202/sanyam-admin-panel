import { Component, OnInit } from '@angular/core';
import { MembersService } from '../Services/members.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent implements OnInit {

  membersMoneyArr: any;
  date: any;
  
  constructor(
    private $service: MembersService,
    private __toast: ToastrService,
    private $router: Router,
  ) { }

  ngOnInit(): void {
    this.membersMoneyArr = this.$service.getMembersMoneyArray();
  }

  getModifiedData() {
    const tempArr:any = [];
    let loggedInUser:any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    this.membersMoneyArr.map((res: any)=>{
      tempArr.push({
        member_id: res.id,
        amount: parseInt(res.monthly_amount) || undefined, 
        volunteer_id: loggedInUser.id,
        payment_date: res.payment_date
      });
    });
    return tempArr;
  }

  addMoney() {
    const data = this.getModifiedData();
    const hasEmptyKey = data.some((obj:any) => {
      return Object.values(obj).some(val => !val);
    });
     
    if(!hasEmptyKey){
      this.$service.addMoney({amount: data}).subscribe({
        next:(res:any)=>{
          this.__toast.success('Amount added successfully!');
          this.$router.navigate(['/admin/members']);
        },
        error:(err: any)=>{
          this.__toast.error(err.error.message);
        }
      });
    }else{
      this.__toast.error('Please fill all the fields.');
    }
  }

}

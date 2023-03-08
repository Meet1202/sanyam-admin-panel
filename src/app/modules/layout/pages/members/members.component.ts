import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembersService } from './Services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members:any = [];
  memberStatus:any = '';
  constructor(
    private $service: MembersService,
    private $router: Router
  ) { }

  ngOnInit(): void {
    this.members = [
      {
        member_id: 'SG12',
        first_name: 'Meet',
        last_name: 'Shah',
        middle_name: 'R',
        mobile_number: '1234567890',
        whatsapp_number: '1234567890',
        dob: '12-2-1998',
        address: 'Ahmedabad',
        monthly_amount: '100',
        user_type: 'volunteer',
        added_by: '1',
        image: '',
        status: 'active',
        email: 'abc@gmail.com',
        created_at : '12/2/2020'
      }
    ]
  }


  onChangeStatus(event:any){
    console.log(event.target.value);
  }

  navigateToDetailPage(member:any){
    this.$service.setMemberDetails(member);
    this.$router.navigate(['/admin/members/manage']);
  }

  navigateToAddMoney(member: any) {
    this.$service.setMembersMoneyArray([member]);
    this.$router.navigate(['/admin/members/add-money']);
  }

  onChecked(event: any){
    console.log(event.target.value);
  }
}

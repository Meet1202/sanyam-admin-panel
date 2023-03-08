import { Component, OnInit } from '@angular/core';
import { MembersService } from '../Services/members.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent implements OnInit {

  membersMoneyArr: any;
  
  constructor(
    private $service: MembersService,
  ) { }

  ngOnInit(): void {
    this.membersMoneyArr = this.$service.getMembersMoneyArray();
  }

}

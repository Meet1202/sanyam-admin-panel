import { Injectable } from '@angular/core';
import { MembersService } from '../pages/members/Services/members.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  __allMembers: any = [];
  __volunteers: any = [];

  constructor(private $service: MembersService) { }

  getAllMembers() {
    this.__allMembers = [];
    this.$service.getAllMembers().subscribe({
      next: (res: any) => {
        this.__allMembers = res.data;
        if (this.__volunteers.length == 0) {
          this.getVolunteers();
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getVolunteers() {
    this.__volunteers = [];
    this.__allMembers.find((res:any)=>{
      if(res.user_type == 'ADMIN' || res.user_type == 'VOLUNTEER'){
        this.__volunteers.push(res);
      }
    })
  }
}

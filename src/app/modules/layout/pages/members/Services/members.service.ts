import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  __membersDetail: any;
  __membersMoneyArr: any;
  constructor() { }

  getMemberDetails() {
    return this.__membersDetail;
  }

  setMemberDetails(data: any) {
    this.__membersDetail = data;
  }

  setMembersMoneyArray(arr: any) {
    this.__membersMoneyArr = arr;
  }

  getMembersMoneyArray() {
    return this.__membersMoneyArr;
  }
}

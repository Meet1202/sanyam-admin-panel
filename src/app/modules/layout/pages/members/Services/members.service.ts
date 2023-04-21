import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  __membersDetail: any;
  __membersMoneyArr: any = [];

  constructor(
    private __http: HttpClient 
  ) { }

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

  getAllMembers() {
    return this.__http.get(environment.api + 'users');
  }

  updateStatus(obj: any, userId: any) {
    return this.__http.put(`${environment.api}users/${userId}/updateStatus`, obj)
  }

  updateUser(obj: any, userId: any) {
    return this.__http.put(`${environment.api}users/${userId}/update`, obj)
  }

  addMoney(paymentArr: any) {
    return this.__http.post(`${environment.api}amount`, paymentArr)
  }

  searchUser(body: any) {
    return this.__http.post(`${environment.api}users/search`, body);
  }
}

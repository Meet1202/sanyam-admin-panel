import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembersService } from './Services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: any = [];
  memberStatus: any = '';
  checkedMembers: any = [];
  allChecked: any;
  allMembersChecked: any;
  searchBy:any;
  searchTerm:any = ''
  constructor(
    public $service: MembersService,
    private $router: Router,
    private __toast: ToastrService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.$service.getAllMembers().subscribe({
      next: (res: any) => {
        this.members = res.data;
      }
    });
  }

  onChangeStatus(event: any, memberId: any) {
    let loggedInUser:any = localStorage.getItem('loggedInUser');
    loggedInUser = JSON.parse(loggedInUser);
    const obj = {
      status: event.target.value,
      modified_by: loggedInUser.id
    }
    this.$service.updateStatus(obj, memberId).subscribe({
      next:(res: any)=>{
        this.__toast.success('Status updated.');
      },
      error: (err)=> {
        this.__toast.error(err.error.message);
      }
    });
  }

  navigateToDetailPage(member: any) {
    this.$service.setMemberDetails(member);
    this.$router.navigate(['/admin/members/manage']);
  }

  navigateToAddMoney(member: any) {
    this.$service.setMembersMoneyArray([member]);
    this.$router.navigate(['/admin/members/add-money']);
  }

  navigateToBulkAddMoney() {
    this.$router.navigate(['/admin/members/add-money']);
  }

  onChecked(event: any, member: any) {
    if (event) {
      this.checkedMembers.push(member);
      this.$service.setMembersMoneyArray(this.checkedMembers);
      if(this.checkedMembers.length == this.members.length){
        this.allMembersChecked = true;
      }
      this.changeRef.detectChanges();
    } else {
      this.checkedMembers = this.checkedMembers.filter((object: any) => {
        return object.id !== member.id;
      });
      this.$service.setMembersMoneyArray(this.checkedMembers);
      if(this.checkedMembers.length < this.members.length){
        this.allMembersChecked = false;
      }
    }
    this.changeRef.detectChanges();
  }

  allCheckBox(event: any) {
    if(event){
      this.checkedMembers = JSON.parse(JSON.stringify(this.members));
      this.$service.setMembersMoneyArray(this.checkedMembers);
      this.allChecked = true;
      this.changeRef.detectChanges();
    }else{
      this.checkedMembers = [];
      this.$service.setMembersMoneyArray(this.checkedMembers);
      this.allChecked = false;
      this.changeRef.detectChanges();
    }
  }

  onSearch() {
    if(this.searchBy && this.searchTerm) {
      const postData = {
        searchBy: this.searchBy,
        searchTerm: this.searchTerm
      };
      this.$service.searchUser(postData).subscribe({
        next:(res:any)=>{
          this.members = res.data;
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
  }
}

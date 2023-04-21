import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MembersService } from '../members/Services/members.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: any = [];
  allMembers:any = [];
  filterBy:any = 'ALL';
  volunteers:any= [];

  constructor(
    private http: HttpClient,
    private __toast: ToastrService,
    private $service: MembersService,
    private $commonService: CommonService
    ) {}

  ngOnInit(): void {
    this.getAllLogs();
  }

  getAllLogs() {
    this.http.get(environment.api + 'amount').subscribe({
      next:(res: any)=>{
        this.logs = res.data;
        if(this.allMembers.length == 0){
          this.getAllMembers();
        }
      },
      error:(err: any)=>{
        this.__toast.error(err.error.message);
      }
    });
  }

  getAllMembers() {
    this.allMembers = [];
    this.$service.getAllMembers().subscribe({
      next:(res:any)=>{
        this.allMembers = res.data;
        this.modifyLogArray();
        if(this.volunteers.length == 0){
          this.getVolunteers();
        }
      },
      error:(err:any)=>{
        this.__toast.error(err.error.message);
      }
    })
  }

  modifyLogArray() {
    this.allMembers.map((res:any)=>{
      this.logs.find((log:any)=>{
        if(res.id == log.volunteer_id){
          log['volunteer_name'] = res.first_name + ' ' + res.surname;
        }
        if (res.id == log.member_id){
          log['member_name'] = res.first_name + ' ' + res.surname;
        }
      })
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

  onChange(event: any) {
    this.http.post(environment.api + 'amount/listByVolunteers', {id: event.target.value}).subscribe({
      next:(res: any)=>{
        this.logs = res.data;
        this.modifyLogArray();
      },
      error:(err: any)=>{
        this.__toast.error(err.error.message);
      }
    });
  }
}

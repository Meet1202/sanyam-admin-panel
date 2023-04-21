import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
declare const require: (path: string) => any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@Output() toggleSidebar = new EventEmitter<any>();
APP_VERSION = require('./../../../../../../package.json').version;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleSidebar.emit();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/account']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'app';

    columnDefs = [
        {headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
        {headerName: 'Model', field: 'model' },
        {headerName: 'Price', field: 'price'}
    ];

    rowData : any;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

  onLoadServer(id: number) {
    // complex calculation
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.showSuccess();
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService, private router: Router,
     private toastr: ToastrService) { }

  ngOnInit(): void 
  {  }

  login()
  {

    this.accountService.login(this.model).subscribe(response => {
      console.log("Account Service Login");
      this.router.navigateByUrl('/members'); // Sends the user to the members list
      console.log(response);
    }, error =>
    {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); // Sends them back to the main page (Reference to app-routing module)
  }
}

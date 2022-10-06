import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/authentification/shared/models/user';
import { AuthService } from 'src/app/authentification/shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (response : IUser[]) => {
        console.log(response);
        
      }
    )
  }

}

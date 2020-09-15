import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string
  public password:string
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }
  onLogin(){
    this.auth.login(this.email,this.password).subscribe(data =>{
        if(data.Status)
        {
          alert(data.Message);
          if(data.IsAdmin){
              this.router.navigate(["admin/dashboard"])

          }else{
              this.router.navigate(["admin/locations"])

          }

        } else{
          alert(data.Message)
        }
    });
  }

}

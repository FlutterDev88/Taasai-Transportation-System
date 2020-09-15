import { Component, OnInit } from '@angular/core';
import { longStackSupport } from 'q';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isAdmin = false;

  constructor(private auth:AuthService,private authenticationService: AuthService,private router:Router,private translate: TranslateService) {
    translate.setDefaultLang('en');
    const currentUser = this.authenticationService.currentUserValue;

    if(currentUser!=null) this.isAdmin = currentUser.IsAdmin;
  }

  ngOnInit() {

  }

  switchLanguage(language) {
    console.log(language)
    this.translate.use(language);
  }

  onLogout(){
    this.auth.logout();
}
}

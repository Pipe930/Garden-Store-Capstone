import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
  
  form = new FormGroup( {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    })

  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log(this.form.value);
  }

}

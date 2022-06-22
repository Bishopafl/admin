import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const user = Auth.user;

    this.getFormInfo(user);
    this.getPasswordFormInfo(user);
  }

  getFormInfo(user: any){
    this.infoForm = this.formBuilder.group({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }

  getPasswordFormInfo(user: any){
    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: '',
    });
  }

  infoSubmit() {
    const data = this.infoForm.getRawValue();

    this.authService.updateInfo(data).subscribe(
      (user: any) => {
        Auth.user = user;
      }
    );

  }

  passwordSubmit() {
    const data = this.passwordForm.getRawValue();

    this.authService.updatePassword(data).subscribe(
      res => {
        console.log(res);
      }
    )
  }

}

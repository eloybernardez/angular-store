import { Component, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private user!: User;
  @Output() loggedUser = new EventEmitter<User>();

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    const { email, password }: { email: string; password: string } = form.value;
    this.authService.loginAndProfile(email, password).subscribe({
      next: (user) => {
        this.user = user;
        this.loggedUser.emit(user);
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          title: error.type,
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
}

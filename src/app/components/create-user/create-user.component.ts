import { Component } from '@angular/core';
import { CreateUserDTO } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  private user!: CreateUserDTO;

  constructor(private usersService: UsersService) {}

  createUser(dto: CreateUserDTO) {
    this.usersService.create(dto).subscribe((user) =>
      Swal.fire({
        title: 'User created',
        text: `User ${user.email} created successfully`,
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    );
  }

  onSubmit(form: NgForm) {
    this.user = {
      ...form.value,
      role: 'customer',
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
    };
    this.createUser(this.user);
  }
}

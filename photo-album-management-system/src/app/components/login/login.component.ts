import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AlbumService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public users: User[] = [];
  public emailPattern: string =
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
  public errorMessage: string = '';

  constructor(private router: Router, private albumService: AlbumService) {}

  ngOnInit() {
    this.fetchUsers();
    localStorage.clear();
  }

  private fetchUsers(): void {
    this.albumService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  public onSubmit(form: NgForm): void {
    localStorage.clear();

    const { username, email } = form.value;
    const user = this.users.find(
      (u) => u.username === username && u.email === email
    );

    if (user) {
      this.router.navigateByUrl('/albums');
      localStorage.setItem('user', JSON.stringify({ username, email }));
      alert('Login successful');
    } else {
      this.errorMessage =
        'Incorrect username or email (not found in the database)';
    }
  }
}

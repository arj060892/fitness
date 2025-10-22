import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { WorkoutPlan } from '../core/models/workout.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.html',
  styleUrls: ['./user-selection.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UserSelectionComponent implements OnInit {
  users: WorkoutPlan[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  selectUser(userId: string): void {
    this.userService.setSelectedUser(userId);
    this.router.navigate(['/dashboard']);
  }
}

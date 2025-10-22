import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { WorkoutPlan, Day } from '../core/models/workout.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-dashboard',
  templateUrl: './workout-dashboard.html',
  styleUrls: ['./workout-dashboard.css'],
  standalone: true,
  imports: [CommonModule]
})
export class WorkoutDashboardComponent implements OnInit {
  user$: Observable<WorkoutPlan | null>;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = this.userService.selectedUser$;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }

  changeUser(): void {
    this.router.navigate(['/']);
  }

  toggleDayCompletion(day: Day): void {
    day.completed = !day.completed;
    this.userService.updateDay(day);
  }

  updateStartDate(event: any): void {
    const newDate = event.target.value;
    this.userService.updateStartDate(newDate);
  }
}

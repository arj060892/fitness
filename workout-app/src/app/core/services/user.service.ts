import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkoutPlan } from '../models/workout.model';
import { DataService } from './data.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: WorkoutPlan[] = [];
  private selectedUserSubject = new BehaviorSubject<WorkoutPlan | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor(private dataService: DataService) {
    this.dataService.getWorkoutPlans().subscribe(plans => {
      this.users = plans;
      const savedUserId = localStorage.getItem('selectedUserId');
      if (savedUserId) {
        this.setSelectedUser(savedUserId);
      }
    });
  }

  getUsers(): WorkoutPlan[] {
    return this.users;
  }

  setSelectedUser(userId: string): void {
    const user = this.users.find(u => u.userId === userId);
    if (user) {
      this.selectedUserSubject.next(user);
      localStorage.setItem('selectedUserId', userId);
    }
  }

  updateDay(day: any): void {
    const currentUser = this.selectedUserSubject.getValue();
    if (currentUser) {
      const updatedPlan = { ...currentUser };
      const weekIndex = updatedPlan.plan.findIndex(w => w.days.some(d => d.day === day.day));
      if (weekIndex > -1) {
        const dayIndex = updatedPlan.plan[weekIndex].days.findIndex(d => d.day === day.day);
        if (dayIndex > -1) {
          updatedPlan.plan[weekIndex].days[dayIndex] = day;
          this.dataService.saveWorkoutPlan(updatedPlan);
          this.selectedUserSubject.next(updatedPlan);
        }
      }
    }
  }

  updateStartDate(date: string): void {
    const currentUser = this.selectedUserSubject.getValue();
    if (currentUser) {
      const updatedPlan = { ...currentUser, startDate: date };
      this.dataService.saveWorkoutPlan(updatedPlan);
      this.selectedUserSubject.next(updatedPlan);
    }
  }
}

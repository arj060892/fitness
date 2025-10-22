import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WorkoutPlan } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data/workout-data.json';
  private workoutPlans: WorkoutPlan[] = [];

  constructor(private http: HttpClient) { }

  getWorkoutPlans(): Observable<WorkoutPlan[]> {
    if (this.workoutPlans.length) {
      return of(this.workoutPlans);
    }
    return this.http.get<WorkoutPlan[]>(this.dataUrl).pipe(
      tap(plans => {
        this.workoutPlans = plans.map(plan => {
          const savedPlan = localStorage.getItem(plan.userId);
          return savedPlan ? JSON.parse(savedPlan) : plan;
        });
      })
    );
  }

  getWorkoutPlan(userId: string): Observable<WorkoutPlan | undefined> {
    return this.getWorkoutPlans().pipe(
      map(plans => plans.find(p => p.userId === userId))
    );
  }

  saveWorkoutPlan(plan: WorkoutPlan): void {
    localStorage.setItem(plan.userId, JSON.stringify(plan));
    const index = this.workoutPlans.findIndex(p => p.userId === plan.userId);
    if (index > -1) {
      this.workoutPlans[index] = plan;
    }
  }
}

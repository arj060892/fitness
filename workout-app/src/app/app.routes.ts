import { Routes } from '@angular/router';
import { UserSelectionComponent } from './features/user-selection';
import { WorkoutDashboardComponent } from './features/workout-dashboard';

export const routes: Routes = [
  { path: '', component: UserSelectionComponent },
  { path: 'dashboard', component: WorkoutDashboardComponent },
  { path: '**', redirectTo: '' }
];

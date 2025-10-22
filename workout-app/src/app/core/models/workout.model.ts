export interface WorkoutPlan {
  userId: string;
  name: string;
  startDate: string;
  plan: Week[];
}

export interface Week {
  week: number;
  days: Day[];
}

export interface Day {
  day: number;
  label: string;
  type: string;
  isWorkout: boolean;
  exercises: Exercise[];
  cardio?: Cardio;
  completed?: boolean;
}

export interface Exercise {
  name: string;
  sets: string;
  notes: string;
}

export interface Cardio {
  equipment: string;
  tip: string;
}

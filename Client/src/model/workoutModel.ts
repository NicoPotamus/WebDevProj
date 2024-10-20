import {type Exercise}  from './exercises'

export interface Workout {
    name: string;
    exercises:WorkObj[]
    sets: number;
}

export interface WorkObj {
    exercise: Exercise | null;
    reps: number;
}
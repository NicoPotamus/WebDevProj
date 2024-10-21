import type { Workout } from "./workoutModel";

export interface User {
    firstName: string;
    lastName: string;
    dob : string;
    email: string;
    password: string;
    biogrpahy: string;
    photo: string;
    workouts: Workout[];
    following: User[];
}
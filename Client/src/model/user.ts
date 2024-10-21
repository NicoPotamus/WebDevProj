import type { Workout } from "./workoutModel";

export interface User {
    firstName: string;
    lastName: string;
    dob : Date;
    email: string;
    password: string;
    biography?: string;
    photo: string;
    workouts?: Workout[];
    following?: User[];
    stats?: Stats;
    username: string;
}

interface Stats{
    //TODO: Add stats for workouts throughout time
    RandomAttributeToSaveErrors: null;
}